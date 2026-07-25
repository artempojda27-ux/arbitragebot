#!/usr/bin/env node
/* ============================================================================
   ARB-BOT v2 — companion bot for Arbitrage Terminal
   ----------------------------------------------------------------------------
   НОВОЕ В v2:
     • 8 бирж по умолчанию, включая мелкие (Gate, MEXC, BingX, Bitget, KuCoin)
     • Скрининг по bulk-тикерам + точечная проверка стакана перед входом
       (щадит rate-limit'ы, позволяет много бирж и монет одновременно)
     • FUNDING-стратегия: находит жирный funding, в PAPER симулирует
       spot-long + perp-short и начисляет выплаты на демо-баланс.
       В LIVE funding торгуется ПОЛНОСТЬЮ: spot-long + perp-short на одной
       бирже, с правилом "обе ноги или ни одной" и фильтром устойчивости
       ставки (FUND_CONFIRM_CYCLES).

   УСТАНОВКА:  npm install ccxt   затем   node arb-bot.js
   PAPER-режим работает БЕЗ API-ключей. LIVE: MODE:"live" + ARM_LIVE=yes.
   Аварийный стоп: создать файл STOP рядом с ботом.
   Ключи: только чтение+торговля, вывод ВЫКЛ, IP-whitelist ВКЛ.
   Не финансовый совет. Риск на пользователе.
============================================================================ */

const fs = require("fs");
let ccxt;
try { ccxt = require("ccxt"); }
catch(e){ console.error("ccxt не установлен. Выполни: npm install ccxt"); process.exit(1); }

/* ============================== КОНФИГ ==================================== */
const CFG = {
  MODE: "paper",                       // "paper" | "live"

  COINS: ["BTC","SOL","AVAX","DOGE","SUI","SEI","TIA","WIF","INJ","APT","PEPE","PAXG"],

  VENUES: {                            // пустые ключи = PAPER-only, этого достаточно
    binanceusdm:   { apiKey:"", secret:"" },
    bybit:         { apiKey:"", secret:"" },
    okx:           { apiKey:"", secret:"", password:"" },
    bitget:        { apiKey:"", secret:"", password:"" },
    gate:          { apiKey:"", secret:"" },
    mexc:          { apiKey:"", secret:"" },
    bingx:         { apiKey:"", secret:"" },
    kucoinfutures: { apiKey:"", secret:"", password:"" },
  },

  /* --- спред-стратегия --- */
  TAKER_FEE_PCT: 0.05,                 // тейкер за ногу, %
  MIN_NET_PCT: 0.15,                   // вход: чистыми ≥, %
  EXIT_NET_PCT: 0.03,                  // выход: остаток ≤, %
  MAX_HOLD_SEC: 1800,
  POSITION_USD: 50,
  MAX_CONCURRENT: 2,

  /* --- funding-стратегия (PAPER-симуляция, в LIVE — сигналы) --- */
  FUND_ENABLED: true,
  FUND_MIN_PCT: 0.03,                  // вход при funding ≥ % за интервал
  FUND_EXIT_PCT: 0.01,                 // выход при funding <
  FUND_POSITION_USD: 200,              // размер funding-позиции
  FUND_MAX_CONCURRENT: 2,
  FUND_CONFIRM_CYCLES: 3,              // ставка должна держаться ≥ MIN столько сканов подряд
  FUND_INTERVAL_SEC: 8 * 3600,         // период выплат

  PAPER_START_USD: 1000,
  POLL_MS: 3000,                       // цикл скрининга (8 бирж — не частить)
  DEPTH_LEVELS: 10,

  PAPER_LOG: "paper-log.json",
  LIVE_LOG:  "live-log.json",
};
/* ========================================================================== */

const armed = CFG.MODE === "live" && process.env.ARM_LIVE === "yes";
const MODE = armed ? "LIVE" : "PAPER";
const roundTrip = CFG.TAKER_FEE_PCT * 4;

const log = (...a) => console.log(new Date().toISOString().slice(11,19), ...a);
const readLog = f => { try { return JSON.parse(fs.readFileSync(f,"utf8")); }
  catch(e){ return {open:[], closed:[], fundOpen:[], fundClosed:[], stats:{}, balance:null, equity:[]}; } };
const writeLog = (f,d) => fs.writeFileSync(f, JSON.stringify(d,null,2));
const LOGF = MODE==="LIVE" ? CFG.LIVE_LOG : CFG.PAPER_LOG;
const state = readLog(LOGF);
if (state.balance == null) state.balance = CFG.PAPER_START_USD;
for (const k of ["open","closed","fundOpen","fundClosed","equity"]) if(!state[k]) state[k]=[];

/* ---------- биржи ---------- */
const EX = {};
for (const [id, keys] of Object.entries(CFG.VENUES)) {
  const cls = ccxt[id];
  if (!cls) { log(`! неизвестная биржа: ${id}`); continue; }
  EX[id] = new cls({ ...keys, enableRateLimit: true, options: { defaultType: "swap" } });
}
const venueIds = Object.keys(EX);
if (venueIds.length < 2) { console.error("Нужно минимум 2 биржи."); process.exit(1); }

/* спот-инстансы тех же бирж (для funding-стратегии) */
const SPOT_CLASS = { binanceusdm:"binance", kucoinfutures:"kucoin" };
const SPOT = {};
for (const [id, keys] of Object.entries(CFG.VENUES)) {
  const cid = SPOT_CLASS[id] || id;
  const cls = ccxt[cid];
  if (cls) SPOT[id] = new cls({ ...keys, enableRateLimit: true, options: { defaultType: "spot" } });
}
const spotSym = coin => `${coin}/USDT`;

const symFor = coin => `${coin}/USDT:USDT`;
const wantedSyms = new Set(CFG.COINS.map(symFor));

/* ---------- демо-баланс ---------- */
function credit(usd, why){
  state.balance = +(state.balance + usd).toFixed(2);
  state.equity.push({ t: Date.now(), bal: state.balance, why });
}

/* ---------- bulk-скрининг ---------- */
async function screen(){
  const quotes = {};                       // coin -> { venue: {bid, ask} }
  await Promise.all(venueIds.map(async id => {
    try{
      const tk = await EX[id].fetchTickers();
      for (const [sym, q] of Object.entries(tk)) {
        if (!wantedSyms.has(sym)) continue;
        const bid = q.bid, ask = q.ask;
        if (!isFinite(bid) || !isFinite(ask) || bid<=0 || ask<=0) continue;
        const coin = sym.split("/")[0];
        (quotes[coin] || (quotes[coin] = {}))[id] = { bid, ask };
      }
    }catch(e){ /* биржа молчит этот цикл */ }
  }));
  return quotes;
}

/* ---------- VWAP по стакану ---------- */
function vwapFill(levels, usd){
  let left = usd, cost = 0, qty = 0;
  for (const [p, q] of levels) {
    const take = Math.min(left, p * q);
    cost += take; qty += take / p; left -= take;
    if (left <= 0) break;
  }
  if (left > 0 || qty === 0) return null;
  return cost / qty;
}
async function verifyRoute(coin, buy, sell){
  try{
    const [ba, bb] = await Promise.all([
      EX[buy ].fetchOrderBook(symFor(coin), CFG.DEPTH_LEVELS),
      EX[sell].fetchOrderBook(symFor(coin), CFG.DEPTH_LEVELS),
    ]);
    const askV = vwapFill(ba.asks, CFG.POSITION_USD);
    const bidV = vwapFill(bb.bids, CFG.POSITION_USD);
    if (askV == null || bidV == null) return null;
    return { askV, bidV, spread: (bidV-askV)/askV*100 };
  }catch(e){ return null; }
}

/* ---------- LIVE: обе ноги или ни одной ---------- */
async function openLive(coin, buy, sell, askV){
  const qty = CFG.POSITION_USD / askV;
  let a=null, b=null;
  try{
    [a,b] = await Promise.all([
      EX[buy ].createOrder(symFor(coin), "market", "buy",  qty),
      EX[sell].createOrder(symFor(coin), "market", "sell", qty),
    ]);
    return qty;
  }catch(e){
    log(`!! ОШИБКА входа ${coin}: ${e.message} — закрываю исполнившуюся ногу`);
    try{ if(a) await EX[buy ].createOrder(symFor(coin),"market","sell",qty,undefined,{reduceOnly:true}); }catch(_){}
    try{ if(b) await EX[sell].createOrder(symFor(coin),"market","buy", qty,undefined,{reduceOnly:true}); }catch(_){}
    return null;
  }
}
async function closeLive(tr){
  const errs=[];
  try{ await EX[tr.buy ].createOrder(symFor(tr.coin),"market","sell",tr.qty,undefined,{reduceOnly:true}); }catch(e){ errs.push(e.message); }
  try{ await EX[tr.sell].createOrder(symFor(tr.coin),"market","buy", tr.qty,undefined,{reduceOnly:true}); }catch(e){ errs.push(e.message); }
  if(errs.length) log(`!! ОШИБКА закрытия ${tr.coin}: ${errs.join(" | ")} — ПРОВЕРЬ ПОЗИЦИИ РУКАМИ`);
  return errs.length===0;
}

/* ---------- FUNDING ---------- */
async function fundingRates(){
  const out = {};                          // venue -> { coin: ratePct }
  await Promise.all(venueIds.map(async id => {
    if (!EX[id].has || !EX[id].has.fetchFundingRates) return;
    try{
      const fr = await EX[id].fetchFundingRates();
      for (const [sym, r] of Object.entries(fr)) {
        if (!wantedSyms.has(sym)) continue;
        const rate = r.fundingRate;
        if (rate == null || !isFinite(rate)) continue;
        (out[id] || (out[id] = {}))[sym.split("/")[0]] = rate * 100;
      }
    }catch(e){}
  }));
  return out;
}
const nextBoundary = () => Math.ceil(Date.now()/1000/CFG.FUND_INTERVAL_SEC)*CFG.FUND_INTERVAL_SEC*1000;

/* LIVE funding: spot-long + perp-short на одной бирже, обе ноги или ни одной */
async function openFundLive(coin, venue, usd){
  const sx = SPOT[venue];
  if (!sx) return null;
  try{
    const tkr = await sx.fetchTicker(spotSym(coin));
    const px = tkr.ask || tkr.last;
    if (!isFinite(px) || px<=0) return null;
    const qty = usd / px;
    let spotOrd=null;
    try{
      spotOrd = await sx.createOrder(spotSym(coin), "market", "buy", qty);
      await EX[venue].createOrder(symFor(coin), "market", "sell", qty);
      return qty;
    }catch(e){
      log(`!! FUNDING ошибка входа ${coin}@${venue}: ${e.message} — откатываю spot-ногу`);
      try{ if(spotOrd) await sx.createOrder(spotSym(coin), "market", "sell", qty); }catch(_){}
      return null;
    }
  }catch(e){ return null; }
}
async function closeFundLive(fp){
  const errs=[];
  try{ await SPOT[fp.venue].createOrder(spotSym(fp.coin), "market", "sell", fp.qty); }catch(e){ errs.push("spot: "+e.message); }
  try{ await EX[fp.venue].createOrder(symFor(fp.coin), "market", "buy", fp.qty, undefined, {reduceOnly:true}); }catch(e){ errs.push("perp: "+e.message); }
  if(errs.length) log(`!! FUNDING ошибка закрытия ${fp.coin}@${fp.venue}: ${errs.join(" | ")} — ПРОВЕРЬ ПОЗИЦИИ РУКАМИ`);
  return errs.length===0;
}

const fundWatch = {};   /* key -> подряд циклов со ставкой ≥ MIN */

async function fundingStep(rates){
  for (const fp of [...state.fundOpen]) {
    const cur = rates[fp.venue]?.[fp.coin];
    if (cur != null) fp.rate = cur;
    if (Date.now() >= fp.nextPay) {
      const pay = fp.size * fp.rate / 100;
      fp.collected = +(fp.collected + pay).toFixed(4);
      if (fp.live) {
        log(`💰 FUNDING выплата ${fp.coin}@${fp.venue}: ~+$${pay.toFixed(3)} (ставка ${fp.rate.toFixed(3)}%) — реальная сумма зачислена биржей на счёт · учтено $${fp.collected.toFixed(2)}`);
      } else {
        credit(pay, `funding ${fp.coin}@${fp.venue}`);
        log(`💰 FUNDING выплата ${fp.coin}@${fp.venue}: +$${pay.toFixed(3)} (ставка ${fp.rate.toFixed(3)}%) · собрано $${fp.collected.toFixed(2)} · баланс $${state.balance.toFixed(2)}`);
      }
      fp.nextPay += CFG.FUND_INTERVAL_SEC*1000;
    }
    if (fp.rate < CFG.FUND_EXIT_PCT) {
      if (fp.live) { if (!(await closeFundLive(fp))) continue; }
      const fees = fp.size * roundTrip/100;
      if (!fp.live) credit(-fees, `funding-exit fees ${fp.coin}`);
      const pnl = +(fp.collected - fees).toFixed(4);
      state.fundOpen = state.fundOpen.filter(x=>x!==fp);
      state.fundClosed.push({ ...fp, t1: Date.now(), fees, pnlUsd: pnl });
      log(`⏹ FUNDING закрыл ${fp.coin}@${fp.venue}: собрано $${fp.collected.toFixed(2)} − комиссии $${fees.toFixed(2)} = $${pnl.toFixed(2)}${fp.live?"":" · баланс $"+state.balance.toFixed(2)}`);
    }
  }
  if (state.fundOpen.length >= CFG.FUND_MAX_CONCURRENT) return;
  for (const [venue, coins] of Object.entries(rates)) {
    for (const [coin, rate] of Object.entries(coins)) {
      if (state.fundOpen.length >= CFG.FUND_MAX_CONCURRENT) return;
      const key = coin+"@"+venue;
      if (rate < CFG.FUND_MIN_PCT) { fundWatch[key] = 0; continue; }
      if (state.fundOpen.some(f => f.coin===coin && f.venue===venue)) continue;
      /* фильтр устойчивости: ставка должна продержаться N сканов подряд */
      fundWatch[key] = (fundWatch[key]||0) + 1;
      if (fundWatch[key] < CFG.FUND_CONFIRM_CYCLES) {
        log(`· funding-кандидат ${key} ${rate.toFixed(3)}% (${fundWatch[key]}/${CFG.FUND_CONFIRM_CYCLES})`);
        continue;
      }
      let qty = null;
      if (MODE === "LIVE") {
        qty = await openFundLive(coin, venue, CFG.FUND_POSITION_USD);
        if (qty == null) { log(`· funding ${key}: вход не удался, пропускаю`); continue; }
      }
      fundWatch[key] = 0;
      state.fundOpen.push({ coin, venue, rate, size: CFG.FUND_POSITION_USD, qty,
                            live: MODE==="LIVE",
                            collected: 0, t0: Date.now(), nextPay: nextBoundary() });
      log(`▶ ${MODE} FUNDING вход ${coin}@${venue}: ставка ${rate.toFixed(3)}%/интервал · размер $${CFG.FUND_POSITION_USD}${qty?" · qty "+qty.toFixed(6):""} · выплата ~${new Date(nextBoundary()).toISOString().slice(11,16)} UTC`);
    }
  }
}

/* ---------- основной цикл ---------- */
let busy=false;
async function loop(){
  if(busy) return; busy=true;
  try{
    if (fs.existsSync("STOP")) return await shutdown("STOP-файл");

    const quotes = await screen();

    /* 1) сопровождение спред-позиций */
    for (const tr of [...state.open]) {
      const q = quotes[tr.coin];
      if (!q || !q[tr.buy] || !q[tr.sell]) continue;
      const spread = (q[tr.sell].bid - q[tr.buy].ask) / q[tr.buy].ask * 100;
      tr.last = spread;
      const holdSec = (Date.now()-tr.t0)/1000;
      if (spread - roundTrip <= CFG.EXIT_NET_PCT || holdSec > CFG.MAX_HOLD_SEC) {
        const pnlPct = tr.entrySpread - spread - roundTrip;
        const pnlUsd = CFG.POSITION_USD * pnlPct/100;
        if (MODE==="LIVE") { if (!(await closeLive(tr))) continue; }
        credit(pnlUsd, `spread ${tr.coin}`);
        state.open = state.open.filter(x=>x!==tr);
        state.closed.push({ ...tr, exitSpread: spread, pnlPct, pnlUsd, t1: Date.now(),
                            balanceAfter: state.balance,
                            reason: holdSec>CFG.MAX_HOLD_SEC ? "time-stop" : "converged" });
        log(`⏹ ${MODE} закрыл ${tr.coin} ${tr.buy}→${tr.sell}: ${tr.entrySpread.toFixed(3)}%→${spread.toFixed(3)}% · PnL ${pnlPct>=0?"+":""}${pnlPct.toFixed(3)}% ($${pnlUsd.toFixed(2)}) · баланс $${state.balance.toFixed(2)}`);
      }
    }

    /* 2) поиск новых спредов: скрининг → стакан → вход */
    if (state.open.length < CFG.MAX_CONCURRENT) {
      const cands = [];
      for (const [coin, vq] of Object.entries(quotes)) {
        if (state.open.some(t=>t.coin===coin)) continue;
        const ids = Object.keys(vq);
        if (ids.length < 2) continue;
        let lo=ids[0], hi=ids[0];
        for (const id of ids){ if(vq[id].ask<vq[lo].ask) lo=id; if(vq[id].bid>vq[hi].bid) hi=id; }
        if (lo===hi) continue;
        const s = (vq[hi].bid - vq[lo].ask)/vq[lo].ask*100;
        if (s - roundTrip >= CFG.MIN_NET_PCT) cands.push({coin, buy:lo, sell:hi, s});
      }
      cands.sort((a,b)=>b.s-a.s);
      for (const c of cands.slice(0, CFG.MAX_CONCURRENT - state.open.length)) {
        const v = await verifyRoute(c.coin, c.buy, c.sell);
        if (!v || v.spread - roundTrip < CFG.MIN_NET_PCT) {
          log(`· кандидат ${c.coin} ${c.buy}→${c.sell} ${c.s.toFixed(3)}% не прошёл стакан (${v?v.spread.toFixed(3)+"%":"тонко"})`);
          continue;
        }
        let qty = CFG.POSITION_USD / v.askV;
        if (MODE==="LIVE") { qty = await openLive(c.coin, c.buy, c.sell, v.askV); if(!qty) continue; }
        state.open.push({ coin:c.coin, buy:c.buy, sell:c.sell, qty,
                          entrySpread: v.spread, last: v.spread, t0: Date.now() });
        log(`▶ ${MODE} вход ${c.coin}: buy ${c.buy} @${v.askV.toFixed(6)} / sell ${c.sell} @${v.bidV.toFixed(6)} · спред ${v.spread.toFixed(3)}% · чистыми ${(v.spread-roundTrip).toFixed(3)}%`);
      }
    }

    /* 3) funding */
    if (CFG.FUND_ENABLED) await fundingStep(await fundingRates());

    saveStats();
  }catch(e){ log("! loop:", e.message); }
  finally{ busy=false; }
}

function saveStats(){
  const c = state.closed, fc = state.fundClosed;
  const fCollected = state.fundOpen.reduce((a,x)=>a+x.collected,0) + fc.reduce((a,x)=>a+x.pnlUsd,0);
  state.stats = {
    spreadTrades: c.length,
    spreadWins: c.filter(x=>x.pnlPct>0).length,
    spreadUsd: +c.reduce((a,x)=>a+x.pnlUsd,0).toFixed(2),
    fundingPositions: state.fundOpen.length,
    fundingClosed: fc.length,
    fundingUsd: +fCollected.toFixed(2),
    balance: state.balance,
    startBalance: CFG.PAPER_START_USD,
    returnPct: +((state.balance/CFG.PAPER_START_USD - 1)*100).toFixed(3),
  };
  writeLog(LOGF, state);
}

async function shutdown(reason){
  log(`Остановка (${reason}).`);
  if (MODE==="LIVE" && (state.open.length || state.fundOpen.some(f=>f.live))){
    log("Закрываю открытые позиции…");
    for (const tr of [...state.open]) await closeLive(tr);
    for (const fp of [...state.fundOpen]) if (fp.live) await closeFundLive(fp);
  }
  saveStats();
  process.exit(0);
}
process.on("SIGINT", ()=>shutdown("Ctrl+C"));

/* ---------- старт ---------- */
(async () => {
  log(`ARB-BOT v2 · режим: ${MODE}${MODE==="PAPER" ? " (демо-счёт, сделки симулируются)" : " ⚠ РЕАЛЬНЫЕ ОРДЕРА"}`);
  log(`Биржи (${venueIds.length}): ${venueIds.join(", ")}`);
  log(`Монеты (${CFG.COINS.length}): ${CFG.COINS.join(", ")}`);
  log(`Спред: вход ≥ ${CFG.MIN_NET_PCT}% чистыми (комиссии ${roundTrip}%) · Funding: вход ≥ ${CFG.FUND_MIN_PCT}%/интервал × ${CFG.FUND_CONFIRM_CYCLES} сканов подряд`);
  log(`Демо-счёт: $${state.balance.toFixed(2)} · спред-сделок закрыто: ${state.closed.length} · funding закрыто: ${state.fundClosed.length}`);
  if (CFG.MODE==="live" && !armed) log(`⚠ MODE:"live", но ARM_LIVE=yes не задан — работаю в PAPER.`);
  for (const id of venueIds){ try{ await EX[id].loadMarkets(); }catch(e){ log(`! ${id}: ${String(e.message).slice(0,80)}`); } }
  setInterval(loop, CFG.POLL_MS);
  setInterval(()=>log(`♥ баланс $${state.balance.toFixed(2)} · спред откр ${state.open.length} · funding откр ${state.fundOpen.length} (собрано $${state.fundOpen.reduce((a,x)=>a+x.collected,0).toFixed(2)}) · закрыто ${state.closed.length}+${state.fundClosed.length}`), 600000);
  loop();
})();
