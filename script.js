// ---------- shared image assets: each embedded exactly once, reused by reference ----------
  const ASSETS = {
    hero: 'assets/images/hero.webp',
    dawn: 'assets/images/mobile-dawn.webp',
    day:  'assets/images/mobile-day.jpg',
    dusk: 'assets/images/mobile-dusk.webp',
    night: 'assets/images/mobile-night.webp',
    logo: 'assets/images/logo.webp',
    ch1bg: 'assets/images/ch1-bg.webp',
    bar: 'assets/images/ch2-bar.webp',
    dining: 'assets/images/ch2-dining.webp',
    spa: 'assets/images/ch2-spa.webp',
    massage: 'assets/images/ch2-massage.webp',
    poolNight: 'assets/images/ch2-poolnight.webp',
    infinity: 'assets/images/ch2-infinity.webp',
    beach: 'assets/images/ch2-beach.webp',
    lounge: 'assets/images/ch2-lounge.webp',
    gym: 'assets/images/ch2-gym.webp',
    ch4deluxe: 'assets/images/ch4-deluxe.webp',
    ch4junior: 'assets/images/ch4-junior.webp',
    ch4villa: 'assets/images/ch4-villa.webp',
    ch4twobed: 'assets/images/ch4-twobed.webp',
    amSpa1: 'assets/images/amenity-spa-1.webp', amSpa2: 'assets/images/amenity-spa-2.webp', amSpa3: 'assets/images/amenity-spa-3.webp',
    amGym1: 'assets/images/amenity-gym-1.webp', amGym2: 'assets/images/amenity-gym-2.webp', amGym3: 'assets/images/amenity-gym-3.webp',
    amWater1: 'assets/images/amenity-water-1.webp', amWater2: 'assets/images/amenity-water-2.webp', amWater3: 'assets/images/amenity-water-3.webp',
    amBil1: 'assets/images/amenity-billiards-1.webp', amBil2: 'assets/images/amenity-billiards-2.webp', amBil3: 'assets/images/amenity-billiards-3.webp',
    amKids1: 'assets/images/amenity-kids-1.webp', amKids2: 'assets/images/amenity-kids-2.webp', amKids3: 'assets/images/amenity-kids-3.webp',
    amWine1: 'assets/images/amenity-wine-1.webp', amWine2: 'assets/images/amenity-wine-2.webp', amWine3: 'assets/images/amenity-wine-3.webp',
    amCon1: 'assets/images/amenity-concierge-1.webp', amCon2: 'assets/images/amenity-concierge-2.webp', amCon3: 'assets/images/amenity-concierge-3.webp',
    amRoom1: 'assets/images/amenity-roomservice-1.webp', amRoom2: 'assets/images/amenity-roomservice-2.webp', amRoom3: 'assets/images/amenity-roomservice-3.webp',
    dEggs: 'assets/images/dish-eggs.webp',
    dAvocado: 'assets/images/dish-avocado.webp',
    dCroissant: 'assets/images/dish-croissant.webp',
    dYogurt: 'assets/images/dish-yogurt.webp',
    dBurrata: 'assets/images/dish-burrata.jpg',
    dLinguine: 'assets/images/dish-linguine.jpg',
    dSeabass: 'assets/images/dish-seabass.jpg',
    dRisotto: 'assets/images/dish-risotto.jpg',
    dBeef: 'assets/images/dish-beef.jpg',
    dLobster: 'assets/images/dish-lobster.jpg',
    dLamb: 'assets/images/dish-lamb.jpg',
    dFondant: 'assets/images/dish-fondant.jpg',
    ch3sunrise: 'assets/images/ch3-sunrise.webp',
    ch3midday: 'assets/images/ch3-midday.webp',
    ch3lunch: 'assets/images/ch3-lunch.webp',
    ch3goldenhour: 'assets/images/ch3-goldenhour.webp',
    ch3nightfall: 'assets/images/ch3-nightfall.webp'
  };
  [
    ['photoBg', ASSETS.hero], ['photo', ASSETS.hero],
    ['photoDawn', ASSETS.dawn], ['photoDay', ASSETS.day], ['photoDusk', ASSETS.dusk], ['photoNight', ASSETS.night],
    ['logoImg', ASSETS.logo], ['footerLogo', ASSETS.logo],
    ['ch2ImgBar', ASSETS.bar], ['ch2ImgDining', ASSETS.dining],
    ['ch2ImgSpa', ASSETS.spa], ['ch2ImgMassage', ASSETS.massage],
    ['ch2ImgPoolNight', ASSETS.poolNight], ['ch2ImgInfinity', ASSETS.infinity],
    ['ch2ImgBeach', ASSETS.beach], ['ch2ImgLounge', ASSETS.lounge], ['ch2ImgGym', ASSETS.gym],
    ['ch4HeroImg', ASSETS.ch4deluxe],
    ['ch4Room0', ASSETS.ch4deluxe], ['ch4Room1', ASSETS.ch4junior],
    ['ch4Room2', ASSETS.ch4villa], ['ch4Room3', ASSETS.ch4twobed],
    ['restEggs', ASSETS.dEggs], ['restAvocado', ASSETS.dAvocado],
    ['restCroissant', ASSETS.dCroissant], ['restYogurt', ASSETS.dYogurt],
    ['restBurrata', ASSETS.dBurrata], ['restLinguine', ASSETS.dLinguine],
    ['restSeabass', ASSETS.dSeabass], ['restRisotto', ASSETS.dRisotto],
    ['restBeef', ASSETS.dBeef], ['restLobster', ASSETS.dLobster],
    ['restLamb', ASSETS.dLamb], ['restFondant', ASSETS.dFondant],
    ['ctaPhoto', ASSETS.ch4villa],
    ['footerBg', ASSETS.night],
    ['ch3Img0', ASSETS.ch3sunrise], ['ch3Img1', ASSETS.ch3midday], ['ch3Img2', ASSETS.ch3lunch],
    ['ch3Img3', ASSETS.ch3goldenhour], ['ch3Img4', ASSETS.ch3nightfall],
    ['ch3ImgBreakfast', ASSETS.dCroissant], ['ch3ImgDinner', ASSETS.dining]
  ].forEach(([id, src]) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });

  function getDeviceTier(){
    const mem = navigator.deviceMemory ?? 4;
    const cpu = navigator.hardwareConcurrency ?? 4;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData ?? false;
    if (reduced || saveData) return 'low';
    if (mem >= 4 && cpu >= 4) return 'high';
    if (mem >= 2 && cpu >= 2) return 'mid';
    return 'low';
  }

  const tier = getDeviceTier();
  document.documentElement.setAttribute('data-tier', tier);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 720px)').matches;

  // ---------- live local clock ----------
  function pad(n){ return n.toString().padStart(2, '0'); }
  function updateClock(){
    const d = new Date();
    const t = pad(d.getHours()) + ':' + pad(d.getMinutes());
    document.getElementById('liveTime').textContent = t;
    const navTime = document.getElementById('navClockTime');
    if (navTime) navTime.textContent = t;
  }
  updateClock();
  setInterval(updateClock, 15000);

  // ---------- real weather + sea temperature at the hotel's actual coordinates ----------
  // 36°29'N 28°13'E — from the TDD subtitle
  const LAT = 36.4833, LON = 28.2167;

  async function fetchSeaTemp(){
    const el = document.getElementById('liveSea');
    try {
      const res = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&current=sea_surface_temperature&timezone=auto`
      );
      if (!res.ok) throw new Error('marine request failed: ' + res.status);
      const data = await res.json();
      const sea = data?.current?.sea_surface_temperature;
      if (sea == null) return;
      el.textContent = `Sea ${Math.round(sea)}°C`;
      el.classList.add('is-ready');
    } catch (e) {
      console.warn('LITORAL sea temp fetch failed:', e);
      // sea data is a bonus detail — stays silent/empty on failure, unlike air temp
    }
  }

  fetchSeaTemp();
  setInterval(fetchSeaTemp, 15 * 60 * 1000);

  // ---------- real-time sky (mobile: dawn / day / dusk-night anchors) ----------
  // Hours are shifted so dawn = 0 for simple linear interpolation across midnight.
  const SHIFT = 6.5; // dawn anchor, in real hours
  const points = [
    { sh: 0,    img: 'dawn',  b: 0.85, s: 1.05 },
    { sh: 6.5,  img: 'day',   b: 1.00, s: 1.00 },
    { sh: 13.5, img: 'dusk',  b: 0.72, s: 0.92 },
    { sh: 17,   img: 'night', b: 0.55, s: 0.85 }, // a real night photo, not just a dimmed dusk shot
    { sh: 24,   img: 'dawn',  b: 0.85, s: 1.05 }  // wraps to next dawn
  ];

  function lerp(a, b, t){ return a + (b - a) * t; }

  // steepens a 0-1 progress value so the crossfade between two *different*
  // photographs (not just a brightness change) is concentrated in a short
  // window around the midpoint — long, slow blends of two different photos
  // read as a distracting "double exposure" rather than a clean transition
  function sharpenMix(t){
    const k = 7;
    const s = 1 / (1 + Math.exp(-k * (t - 0.5)));
    const s0 = 1 / (1 + Math.exp(k * 0.5));
    const s1 = 1 / (1 + Math.exp(-k * 0.5));
    return (s - s0) / (s1 - s0);
  }

  function currentSky(){
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const sh = ((hour - SHIFT) % 24 + 24) % 24;

    let i = 0;
    while (i < points.length - 2 && sh >= points[i + 1].sh) i++;
    const a = points[i], b = points[i + 1];
    const span = b.sh - a.sh;
    const t = span > 0 ? (sh - a.sh) / span : 0;

    return {
      brightness: lerp(a.b, b.b, t),
      saturate: lerp(a.s, b.s, t),
      fromImg: a.img,
      toImg: b.img,
      mix: a.img === b.img ? 1 : sharpenMix(t) // weight toward "toImg", steepened
    };
  }

  const mobileLayers = { dawn: '#photoDawn', day: '#photoDay', dusk: '#photoDusk', night: '#photoNight' };

  // ---------- explore mode: lets the person override the live time-of-day ----------
  let manualMode = null; // null = live/auto; otherwise 'dawn' | 'day' | 'dusk' | 'night'
  const peakSky = {
    dawn: { b: 0.85, s: 1.05 },
    day:  { b: 1.00, s: 1.00 },
    dusk: { b: 0.72, s: 0.92 },
    night:{ b: 0.6,  s: 0.85 }
  };

  function getSkyState(){
    if (manualMode){
      const p = peakSky[manualMode];
      return { brightness: p.b, saturate: p.s, fromImg: manualMode, toImg: manualMode, mix: 1 };
    }
    return currentSky();
  }

  function updateNavTint(){
    const sky = getSkyState();
    // brighter scene (day ≈1.0) needs a darker panel for contrast;
    // darker scene (deep night ≈0.4) can stay nearly transparent
    const t = Math.min(0.58, Math.max(0.14,
      0.14 + (sky.brightness - 0.4) / 0.6 * 0.44
    ));
    const menu = document.getElementById('navMenu');
    if (menu) menu.style.setProperty('--nav-tint', t.toFixed(2));
  }

  const SKY_TINTS = {
    dawn:  [255, 205, 160],
    day:   [255, 255, 255],
    dusk:  [255, 150, 90],
    night: [50, 70, 120]
  };

  function updateGlobalGrade(sky){
    const grade = document.querySelector('.global-grade');
    if (!grade) return;
    const a = SKY_TINTS[sky.fromImg] || SKY_TINTS.day;
    const b = SKY_TINTS[sky.toImg] || SKY_TINTS.day;
    const mix = sky.fromImg === sky.toImg ? 1 : sky.mix;
    const r = Math.round(a[0] + (b[0] - a[0]) * mix);
    const g = Math.round(a[1] + (b[1] - a[1]) * mix);
    const bl = Math.round(a[2] + (b[2] - a[2]) * mix);
    // darker/dimmer moments (night) get a stronger tint; bright midday stays nearly untouched
    const strength = Math.min(0.16, Math.max(0.03, (1 - sky.brightness) * 0.22 + 0.03));
    grade.style.background = `linear-gradient(180deg, rgba(${r},${g},${bl},${strength}), rgba(${r},${g},${bl},${strength * 1.3}))`;
  }

  function applySky(animate){
    const sky = getSkyState();
    const filterStr = `brightness(${sky.brightness.toFixed(2)}) saturate(${sky.saturate.toFixed(2)})`;
    updateNavTint();
    updateGlobalGrade(sky);

    Object.entries(mobileLayers).forEach(([key, sel]) => {
      let target = 0;
      if (sky.fromImg === sky.toImg){
        target = key === sky.fromImg ? 1 : 0;
      } else {
        if (key === sky.fromImg) target = 1 - sky.mix;
        if (key === sky.toImg) target = sky.mix;
      }
      const el = document.querySelector(sel);
      if (!el) return;
      if (animate && window.gsap){
        gsap.to(el, { opacity: target, filter: filterStr, duration: 2, ease: 'sine.inOut' });
      } else {
        el.style.opacity = target;
        el.style.filter = filterStr;
      }
    });
  }

  function initExplore(){
    const toggle = document.getElementById('exploreToggle');
    const options = document.getElementById('exploreOptions');
    if (!toggle || !options) return;

    toggle.addEventListener('click', () => {
      options.classList.toggle('is-open');
    });

    options.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        manualMode = mode === 'live' ? null : mode;
        options.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applySky(true);
      });
    });
  }
  initExplore();

  // ---------- Sunset Time widget: countdown to the site's own dusk anchor (20:00) ----------
  function updateSunsetWidget(){
    const textEl = document.getElementById('sunsetText');
    const widget = document.getElementById('sunsetWidget');
    if (!textEl || !widget) return;

    const now = new Date();
    const sunset = new Date(now);
    sunset.setHours(20, 0, 0, 0); // matches the site's own dusk anchor, see SHIFT/points above
    if (now >= sunset) sunset.setDate(sunset.getDate() + 1);

    const diffMs = sunset - now;
    const diffMin = Math.round(diffMs / 60000);
    const hrs = Math.floor(diffMin / 60);
    const mins = diffMin % 60;

    let label;
    if (hrs <= 0){
      label = `Sunset in ${mins} minute${mins === 1 ? '' : 's'}`;
    } else {
      label = `Sunset in ${hrs}h ${mins}m`;
    }
    textEl.textContent = label;
    widget.classList.add('is-ready');
  }
  updateSunsetWidget();
  setInterval(updateSunsetWidget, 30000);

  const sunsetBtn = document.getElementById('sunsetBtn');
  if (sunsetBtn){
    sunsetBtn.addEventListener('click', () => {
      manualMode = 'dusk';
      const options = document.getElementById('exploreOptions');
      if (options){
        options.querySelectorAll('button').forEach(b => {
          b.classList.toggle('is-active', b.dataset.mode === 'dusk');
        });
      }
      applySky(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- procedural sound: a wave whoosh + a distant gull, no audio files ----------
  // ---------- global mute switch — respected by every sound on the site ----------
  let isMuted = false;

  // ---------- one shared AudioContext for the whole site — more reliable on
  // iOS than creating a separate context per sound feature ----------
  let sharedAudioCtx = null;
  function getSharedAudioCtx(){
    if (sharedAudioCtx) return sharedAudioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    sharedAudioCtx = new Ctx();
    return sharedAudioCtx;
  }

  function playTideSound(){
    if (isMuted) return;
    try {
      const ctx = getSharedAudioCtx();
      if (!ctx) return;

      function smoothCurve(len, shape){
        const arr = new Float32Array(len);
        for (let i = 0; i < len; i++){
          const t = i / (len - 1);
          arr[i] = Math.pow(Math.sin(Math.PI * t), shape);
        }
        return arr;
      }

      function makeNoiseBuffer(dur){
        const size = Math.floor(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, size, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < size; i++) d[i] = Math.random() * 2 - 1;
        return buf;
      }

      function start(){
        const now = ctx.currentTime;
        const dur = 7;
        const master = ctx.createGain();
        master.gain.value = 0.85;
        const masterLP = ctx.createBiquadFilter();
        masterLP.type = 'lowpass';
        masterLP.frequency.value = 1200;
        master.connect(masterLP);
        masterLP.connect(ctx.destination);

        // layer 1: the body of the wave — low rumble, slow swell
        const body = ctx.createBufferSource();
        body.buffer = makeNoiseBuffer(dur);
        const bodyFilter = ctx.createBiquadFilter();
        bodyFilter.type = 'lowpass';
        bodyFilter.frequency.value = 260;
        const bodyGain = ctx.createGain();
        bodyGain.gain.setValueCurveAtTime(smoothCurve(96, 0.7).map(v => v * 0.22), now, dur);
        body.connect(bodyFilter); bodyFilter.connect(bodyGain); bodyGain.connect(master);

        // layer 2: mid wash — the main "shhh" body of water
        const wash = ctx.createBufferSource();
        wash.buffer = makeNoiseBuffer(dur);
        const washFilter = ctx.createBiquadFilter();
        washFilter.type = 'bandpass';
        washFilter.frequency.setValueAtTime(500, now);
        washFilter.frequency.linearRampToValueAtTime(750, now + dur * 0.5);
        washFilter.frequency.linearRampToValueAtTime(400, now + dur);
        washFilter.Q.value = 0.5;
        const washGain = ctx.createGain();
        washGain.gain.setValueCurveAtTime(smoothCurve(96, 0.7).map(v => v * 0.12), now, dur);
        wash.connect(washFilter); washFilter.connect(washGain); washGain.connect(master);

        // layer 3: foam — brighter, thinner, peaks slightly after the main swell (water breaking)
        const foamDur = dur * 0.7;
        const foam = ctx.createBufferSource();
        foam.buffer = makeNoiseBuffer(foamDur);
        const foamFilter = ctx.createBiquadFilter();
        foamFilter.type = 'highpass';
        foamFilter.frequency.value = 2000;
        const foamGain = ctx.createGain();
        const foamStart = now + dur * 0.28;
        foamGain.gain.setValueCurveAtTime(smoothCurve(64, 2).map(v => v * 0.02), foamStart, foamDur);
        foam.connect(foamFilter); foamFilter.connect(foamGain); foamGain.connect(master);

        body.start(now); body.stop(now + dur);
        wash.start(now); wash.stop(now + dur);
        foam.start(foamStart); foam.stop(foamStart + foamDur);
        console.log('LITORAL tide sound: started, ctx.state =', ctx.state);
      }

      console.log('LITORAL tide sound: AudioContext created, initial state =', ctx.state);

      // don't schedule anything until the context is confirmed actually running —
      // starting nodes while still 'suspended' is likely why this went silent
      if (ctx.state === 'suspended'){
        ctx.resume().then(() => {
          console.log('LITORAL tide sound: resumed, state =', ctx.state);
          start();
        }).catch(err => console.warn('LITORAL tide sound: resume() rejected —', err));
      } else {
        start();
      }
    } catch (e) {
      console.warn('LITORAL tide sound: blocked or unavailable —', e);
    }
  }

  // ---------- navigation: plain CSS-transition toggle, no GSAP dependency ----------
  function initNav(){
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function openMenu(){
      menu.classList.add('is-open');
      document.getElementById('navBackdrop')?.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      playTideSound();
    }
    function closeMenu(){
      menu.classList.remove('is-open');
      document.getElementById('navBackdrop')?.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-active');
      document.body.style.overflow = 'auto';
    }

    toggle.addEventListener('click', () => {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    document.getElementById('navBackdrop')?.addEventListener('click', closeMenu);

    menu.querySelectorAll('a[data-scroll]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        const target = a.dataset.scroll;
        const el = target === 'contact' ? document.getElementById('contact')
                 : target === 'booking' ? document.getElementById('booking')
                 : document.querySelector(`[data-chapter="${target}"]`);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 350);
      });
    });

    const muteBtn = document.getElementById('navMute');
    if (muteBtn){
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.setAttribute('aria-pressed', String(isMuted));
        document.getElementById('muteIconOn').style.display = isMuted ? 'none' : 'block';
        document.getElementById('muteIconOff').style.display = isMuted ? 'block' : 'none';
        document.getElementById('navMuteLabel').textContent = isMuted ? 'Sound Off' : 'Sound On';
      });
    }
  }
  initNav();

  // ---------- entrance + grain (skipped entirely on low tier) ----------
  if (tier !== 'low' && !reduceMotion){
    const canvas = document.getElementById('grain');
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = innerWidth * 0.5; canvas.height = innerHeight * 0.5; }
    resize();
    window.addEventListener('resize', resize);
    function drawGrain(){
      const w = canvas.width, h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++){
        const shade = (Math.random() * 255) | 0;
        buffer[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    drawGrain();
    setInterval(drawGrain, 160);
  }

  function unlockScroll(){
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    // ScrollTrigger may have measured its triggers while the page was still
    // locked/mid-layout — force it to remeasure now that scrolling is real.
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function revealStatic(){
    // used when GSAP can't run (blocked network, offline, low tier) —
    // show everything immediately instead of leaving the intro cover stuck on screen
    const cover = document.getElementById('cover');
    if (cover) cover.style.display = 'none';

    ['logoHalo', 'logo', 'line1', 'sub', 'liveClock', 'explore', 'scrollCue'].forEach(id => {
      const el = document.getElementById(id);
      if (el){ el.style.opacity = 1; el.style.filter = 'none'; }
    });

    applySky(false);

    if (isMobile){
      document.querySelectorAll('.photo-mobile').forEach(el => { el.style.transform = 'scale(1)'; });
    } else {
      const bg = document.getElementById('photoBg');
      const photo = document.getElementById('photo');
      if (bg) bg.style.opacity = 1;
      if (photo){
        photo.style.opacity = 1;
        photo.style.filter = 'brightness(0.78) saturate(1)';
        photo.style.transform = 'scale(1)';
      }
    }

    unlockScroll();
  }

  if (tier === 'low' || reduceMotion){
    revealStatic();
  } else if (window.gsap){
    // CSS now defaults everything to visible (so a no-JS/blocked-JS page never
    // shows a stuck black screen). Since GSAP is actually available here, we
    // opt INTO the hidden starting state ourselves, then animate it in.
    const cover = document.getElementById('cover');
    cover.style.display = 'block';
    cover.style.opacity = 1;

    ['logoHalo', 'logo', 'sub', 'liveClock', 'explore', 'scrollCue'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.opacity = 0;
    });
    const line1 = document.getElementById('line1');
    line1.style.opacity = 0;
    line1.style.filter = 'blur(10px)';

    if (!isMobile){
      const bg = document.getElementById('photoBg');
      const photo = document.getElementById('photo');
      bg.style.opacity = 0;
      photo.style.opacity = 0;
      photo.style.filter = 'brightness(0.55) saturate(0.95)';
      photo.style.transform = 'scale(1.03)';
    }

    applySky(false); // compute correct mobile anchor weights before revealing
    document.querySelectorAll('.photo-mobile').forEach(el => { el.style.opacity = 0; });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to('#cover', { opacity: 0, duration: 1.2, ease: 'power1.inOut' }, 0)
      .set('#cover', { display: 'none' })
      .to('#logoHalo', { opacity: 1, duration: 1.3 }, 0.3)
      .to('#logo', { opacity: 1, duration: 1.1 }, 0.4)
      .to('#line1', { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 0.5)
      .to('#sub', { opacity: 1, duration: 1.1 }, 1.5)
      .to('#liveClock', { opacity: 1, duration: 1.2 }, 2.6)
      .to('#scrollCue', { opacity: 1, duration: 1, ease: 'power1.out' }, 4.2)
      .to('#explore', { opacity: 1, duration: 1.2, ease: 'power1.out' }, 5.4);

    if (isMobile){
      const sky = currentSky();
      const filterStr = `brightness(${sky.brightness.toFixed(2)}) saturate(${sky.saturate.toFixed(2)})`;
      Object.entries(mobileLayers).forEach(([key, sel]) => {
        let target = 0;
        if (sky.fromImg === sky.toImg){ target = key === sky.fromImg ? 1 : 0; }
        else { if (key === sky.fromImg) target = 1 - sky.mix; if (key === sky.toImg) target = sky.mix; }
        if (target > 0){
          tl.to(sel, { opacity: target, filter: filterStr, scale: 1.0, duration: 3.2, ease: 'power2.out' }, 1.4);
        }
      });

      document.querySelectorAll('.photo-mobile').forEach(el => {
        gsap.to(el, { scale: 1.03, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 4.6 });
      });
    } else {
      tl.to('#photoBg', { opacity: 1, duration: 3, ease: 'power2.out' }, 1.3)
        .to('#photo', { opacity: 1, filter: 'brightness(0.78) saturate(1)', scale: 1.0, duration: 3.2, ease: 'power2.out' }, 1.4);

      gsap.to('#photo', { scale: 1.15, duration: 10, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 4.6 });
      gsap.to('#photoBg', { scale: 1.2, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 4.6 });
    }

    setTimeout(unlockScroll, 3200);

    gsap.to('#scrollCue', { y: 8, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 5 });
  } else {
    // GSAP script failed to load (blocked network, offline, ad-block, etc.) —
    // this is the branch that was missing before: without it the black
    // intro cover stayed on screen forever with no way forward.
    revealStatic();
  }

  // watchdog: if for any other reason the cover is still blocking the screen
  // a few seconds in, force a static reveal rather than leave a black screen
  setTimeout(() => {
    const cover = document.getElementById('cover');
    if (cover && getComputedStyle(cover).display !== 'none'){
      revealStatic();
    }
  }, 4000);

  // recheck the sky every few minutes so it drifts as real time passes while the tab stays open
  setInterval(() => { if (isMobile) applySky(true); }, 3 * 60 * 1000);

  // ========== CHAPTER I — question gallery (same technique as Chapter II: horizontal scroll-snap + IntersectionObserver, no vertical pin/scroll-jack) ==========
  function initChapterOne(){
    const panels = Array.from(document.querySelectorAll('.ch1-panel'));
    if (panels.length === 0) return;

    // assign the shared background photo + logo watermark to every panel
    panels.forEach((p, i) => {
      const img = document.getElementById('ch1Img' + i);
      if (img) img.src = ASSETS.ch1bg;
      const logo = document.getElementById('ch1Logo' + i);
      if (logo) logo.src = ASSETS.logo;
    });

    // build the dot indicator (no numbers — just a simple gallery-style row)
    const dotsWrap = document.getElementById('ch1Dots');
    let dots = [];
    if (dotsWrap){
      dotsWrap.innerHTML = '';
      dots = panels.map(() => {
        const d = document.createElement('span');
        d.className = 'ch1-dot';
        dotsWrap.appendChild(d);
        return d;
      });
      dots[0]?.classList.add('is-active');
    }

    const skipBtn = document.getElementById('ch1Skip');
    const ch2 = document.querySelector('.ch2-wrapper');
    if (skipBtn && ch2){
      skipBtn.addEventListener('click', () => {
        ch2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (reduceMotion){
      panels.forEach(p => p.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)){
      panels.forEach(p => p.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6){
          entry.target.classList.add('is-visible');
          const idx = panels.indexOf(entry.target);
          if (idx >= 0 && dots.length){
            dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
          }
        }
      });
    }, { threshold: [0, 0.6, 1] });

    panels.forEach(p => observer.observe(p));
  }
  initChapterOne();


  // ========== CHAPTER II — reveal captions as each panel snaps into view ==========
  function initChapterTwo(){
    const panels = Array.from(document.querySelectorAll('.ch2-panel'));
    if (panels.length === 0) return;

    if (reduceMotion){
      panels.forEach(p => p.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)){
      panels.forEach(p => p.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6){
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: [0, 0.6, 1] });

    panels.forEach(p => observer.observe(p));
  }
  initChapterTwo();

  // ========== CHAPTER III — every moment has its place ==========
  function initChapterThree(){
    const cards = Array.from(document.querySelectorAll('.ch3-card'));
    if (cards.length === 0) return;

    if (reduceMotion){
      cards.forEach(c => c.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)){
      cards.forEach(c => c.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      // reveal text/photo for every card that crosses the threshold —
      // once seen, it stays visible (no fading back out on scroll-past)
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.55){
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: [0, 0.15, 0.55, 0.75, 1] });

    cards.forEach(c => observer.observe(c));
  }
  initChapterThree();

  // ========== CHAPTER IV — Stay: room cards reveal ==========
  function initChapterFour(){
    const cards = Array.from(document.querySelectorAll('.ch4-card'));
    if (cards.length === 0) return;

    if (reduceMotion || !('IntersectionObserver' in window)){
      cards.forEach(c => c.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.3){
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: [0, 0.3, 1] });

    cards.forEach(c => observer.observe(c));
  }
  initChapterFour();

  // ========== THE RESTAURANT — See Menu toggle ==========
  function initRestaurant(){
    document.querySelectorAll('.rest-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gallery = document.getElementById(btn.dataset.target);
        if (!gallery) return;
        const opening = !gallery.classList.contains('is-open');
        gallery.classList.toggle('is-open', opening);
        btn.classList.toggle('is-open', opening);
        btn.textContent = opening ? 'Close Menu' : 'See Menu';
      });
    });
  }
  initRestaurant();

  // ========== ROOM PANORAMA — drag-to-look-around lightbox ==========
  function initRoomPanorama(){
    const pano = document.getElementById('ch4Pano');
    const viewport = document.getElementById('ch4PanoViewport');
    const img = document.getElementById('ch4PanoImg');
    const nameEl = document.getElementById('ch4PanoName');
    const closeBtn = document.getElementById('ch4PanoClose');
    if (!pano || !img) return;

    function openPano(sourceImgId, name){
      const src = document.getElementById(sourceImgId);
      if (!src || !src.src) return;
      img.src = src.src;
      nameEl.textContent = name || '';
      img.style.transform = 'translateX(0px)';
      pano.classList.add('is-open');
      pano.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closePano(){
      pano.classList.remove('is-open');
      pano.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.ch4-card-photo[data-pano]').forEach(el => {
      el.addEventListener('click', () => {
        openPano(el.dataset.pano, el.dataset.name);
      });
    });
    document.querySelectorAll('.ch4-card-btn').forEach(btn => {
      const photoEl = btn.closest('.ch4-card')?.querySelector('.ch4-card-photo[data-pano]');
      if (!photoEl) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPano(photoEl.dataset.pano, photoEl.dataset.name);
      });
    });

    closeBtn.addEventListener('click', closePano);
    pano.addEventListener('click', (e) => { if (e.target === pano) closePano(); });

    // drag-to-pan: image is rendered wider than the viewport (height:100%,
    // width:auto keeps its natural aspect, which usually overflows on a
    // portrait phone screen) — dragging shifts it left/right within bounds
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let baseX = 0;

    function clampX(x){
      const maxOffset = Math.max(0, img.offsetWidth - viewport.offsetWidth);
      return Math.min(0, Math.max(-maxOffset, x));
    }

    function onPointerDown(e){
      isDragging = true;
      img.classList.add('is-dragging');
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      baseX = currentX;
    }
    function onPointerMove(e){
      if (!isDragging) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      currentX = clampX(baseX + (x - startX));
      img.style.transform = 'translateX(' + currentX + 'px)';
    }
    function onPointerUp(){
      isDragging = false;
      img.classList.remove('is-dragging');
    }

    viewport.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    viewport.addEventListener('touchstart', onPointerDown, { passive: true });
    viewport.addEventListener('touchmove', onPointerMove, { passive: true });
    viewport.addEventListener('touchend', onPointerUp);
  }
  initRoomPanorama();

  // ========== AMENITIES — tap to preview ==========
  const AMENITY_GALLERIES = {
    spa: [
      ['amSpa1', 'Indoor Pool', 'Heated & Relaxing'],
      ['amSpa2', 'Massage Room', 'Rebalance Your Body'],
      ['amSpa3', 'Sauna Experience', 'Detox & Refresh']
    ],
    gym: [
      ['amGym1', 'Cardio Zone', 'Sweat with a View'],
      ['amGym2', 'Strength Zone', 'Elevate Your Performance'],
      ['amGym3', 'Functional Training', 'Move. Focus. Grow.']
    ],
    water: [
      ['amWater1', 'Jet Ski', 'Feel the Adrenaline'],
      ['amWater2', 'Paddle Boarding', 'Peace in Motion'],
      ['amWater3', 'Parasailing', 'Fly Above the Sea']
    ],
    billiards: [
      ['amBil1', 'Pool Tables', 'Classic Games'],
      ['amBil2', 'Lounge Atmosphere', 'Relax & Unwind'],
      ['amBil3', 'Play & Enjoy', 'Good Time, Anytime']
    ],
    kids: [
      ['amKids1', 'Play Area', 'Fun & Safe'],
      ['amKids2', 'Activities', 'Learn & Explore'],
      ['amKids3', 'Creative Space', 'Imagine More']
    ],
    wine: [
      ['amWine1', 'Fine Selection', 'The Best Wines'],
      ['amWine2', 'Exclusive Labels', 'For Connoisseurs'],
      ['amWine3', 'Tasting Experience', 'Savor Every Note']
    ],
    concierge: [
      ['amCon1', 'Guest Services', "We're Here for You"],
      ['amCon2', 'Personal Assistance', 'Anytime, Anywhere'],
      ['amCon3', 'Attention to Detail', 'Perfect in Every Way']
    ],
    roomservice: [
      ['amRoom1', 'Day or Night', 'We Deliver'],
      ['amRoom2', 'In-Room Dining', 'Delicious & Private'],
      ['amRoom3', 'Always Available', 'Just a Call Away']
    ]
  };

  function initAmenities(){
    const lightbox = document.getElementById('amenLightbox');
    const nameEl = document.getElementById('amenLbName');
    const track = document.getElementById('amenLbTrack');
    const closeBtn = document.getElementById('amenLightboxClose');
    if (!lightbox) return;

    function open(groupKey, name){
      nameEl.textContent = name;
      const slides = AMENITY_GALLERIES[groupKey];
      if (slides){
        track.innerHTML = slides.map(([assetKey, title, sub]) => `
          <div class="amen-lb-slide">
            <img src="${ASSETS[assetKey] || ''}" alt="${title}">
            <div class="amen-lb-slide-grade"></div>
            <div class="amen-lb-slide-text">
              <p class="amen-lb-slide-title">${title}</p>
              <p class="amen-lb-slide-sub">${sub}</p>
            </div>
          </div>`).join('');
        track.scrollLeft = 0;
        lightbox.classList.remove('is-soon');
      } else {
        track.innerHTML = '';
        lightbox.classList.add('is-soon');
      }
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
    function close(){
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('.amen-item').forEach(item => {
      item.addEventListener('click', () => {
        open(item.dataset.amenPhoto, item.dataset.amenName);
      });
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  }
  initAmenities();

  // ========== SILENCE MODE ==========
  // ========== DESKTOP MOUSE-DRAG for horizontal galleries ==========
  // Touch swipe already works on mobile; mouse users on desktop have no
  // equivalent gesture unless we add click-and-drag scrolling ourselves.
  // ========== CHAPTER II LIGHTBOX — click a grid card to see it larger (desktop only) ==========
  function initCh2Lightbox(){
    const lightbox = document.getElementById('ch2Lightbox');
    const lightboxImg = document.getElementById('ch2LightboxImg');
    const lightboxCaption = document.getElementById('ch2LightboxCaption');
    const closeBtn = document.getElementById('ch2LightboxClose');
    if (!lightbox) return;

    document.querySelectorAll('.ch2-panel').forEach(panel => {
      panel.addEventListener('click', () => {
        if (window.innerWidth < 900) return; // desktop-only feature
        const img = panel.querySelector('.ch2-image');
        const caption = panel.querySelector('.ch2-caption');
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('is-open');
      });
    });

    function close(){ lightbox.classList.remove('is-open'); }
    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
  initCh2Lightbox();

  function initDragScroll(){
    const selectors = ['#ch1Track', '#ch2Track', '#ch3Track', '.rest-gallery-track', '.amen-lb-track'];
    const tracks = document.querySelectorAll(selectors.join(','));
    tracks.forEach(track => {
      let isDown = false, startX = 0, startScroll = 0, moved = false;
      track.style.cursor = 'grab';
      track.addEventListener('mousedown', (e) => {
        isDown = true; moved = false;
        startX = e.pageX; startScroll = track.scrollLeft;
        track.style.cursor = 'grabbing';
      });
      window.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 5) moved = true;
        track.scrollLeft = startScroll - dx;
      });
      // prevent accidental link/button clicks right after a drag
      track.addEventListener('click', (e) => {
        if (moved) { e.preventDefault(); e.stopPropagation(); }
      }, true);
    });
  }
  initDragScroll();

  // ========== GALLERY ARROWS — desktop click-to-advance ==========
  function initGalleryArrows(){
    document.querySelectorAll('.gallery-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        const track = document.getElementById(btn.dataset.track);
        if (!track) return;
        const panelWidth = track.clientWidth;
        const dir = btn.classList.contains('gallery-arrow-next') ? 1 : -1;
        track.scrollBy({ left: dir * panelWidth, behavior: 'smooth' });
      });
    });
  }
  initGalleryArrows();

  // ========== PAUSE OFF-SCREEN ANIMATIONS ==========
  // Several chapters keep a slow Ken Burns drift running via CSS `animation`
  // once their panel has been marked is-visible — and that class is never
  // removed (by design, so a re-scroll doesn't replay the reveal). Left alone,
  // every one of those animations keeps running in the background for the
  // rest of the session, even scrolled far out of view. This pauses them via
  // animation-play-state whenever their container leaves the viewport.
  function initAnimationPause(){
    const selectors = [
      '.ch2-panel', '.ch4-card', '.ch3-card', '.footer-wrapper', '.ch4-wrapper'
    ];
    const targets = document.querySelectorAll(selectors.join(','));
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const animated = entry.target.querySelectorAll('.ch2-image, .ch4-card-photo img, .ch3-card-photo, .ch4-hero-photo');
        animated.forEach(el => {
          el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      });
    }, { rootMargin: '200px 0px' });

    targets.forEach(t => observer.observe(t));
  }
  initAnimationPause();

  function initSilenceMode(){
    const btn = document.getElementById('silenceBtn');
    if (!btn) return;
    function enable(){ document.documentElement.classList.add('silence-on'); }
    function disable(){ document.documentElement.classList.remove('silence-on'); }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.documentElement.classList.contains('silence-on') ? disable() : enable();
    });
    document.addEventListener('click', (e) => {
      if (document.documentElement.classList.contains('silence-on') && e.target !== btn){
        disable();
      }
    });
  }
  initSilenceMode();

  // ========== HERO SHIMMER — canvas-drawn light glinting on the water ==========
  function initHeroShimmer(){
    const canvas = document.getElementById('heroShimmer');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    const scene = document.querySelector('.scene');
    if (!ctx || !scene) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize(){
      w = scene.offsetWidth; h = scene.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // a handful of soft horizontal glints, each with its own drift speed,
    // vertical position (lower half = water) and a slow brightness pulse
    const glints = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * w,
      y: h * (0.6 + Math.random() * 0.35),
      len: 40 + Math.random() * 90,
      speed: 6 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.4 + Math.random() * 0.5
    }));

    let raf = null;
    let start = performance.now();

    function draw(now){
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      glints.forEach(g => {
        const x = (g.x + t * g.speed) % (w + g.len) - g.len / 2;
        const brightness = 0.35 + 0.35 * Math.sin(t * g.pulseSpeed + g.phase);
        const grad = ctx.createLinearGradient(x - g.len / 2, 0, x + g.len / 2, 0);
        grad.addColorStop(0, 'rgba(255,240,210,0)');
        grad.addColorStop(0.5, `rgba(255,244,220,${Math.max(0, brightness)})`);
        grad.addColorStop(1, 'rgba(255,240,210,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x - g.len / 2, g.y - 1, g.len, 2.2);
      });
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    // pause while the tab is hidden — no point animating something nobody can see
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = null; }
      else if (!document.hidden && !raf) { start = performance.now(); raf = requestAnimationFrame(draw); }
    });

    // also pause once the Hero has been scrolled out of view — this canvas
    // keeps drawing every frame otherwise, for the rest of the session
    if ('IntersectionObserver' in window){
      new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
          else if (entry.isIntersecting && !raf && !document.hidden) {
            start = performance.now(); raf = requestAnimationFrame(draw);
          }
        });
      }, { threshold: 0 }).observe(scene);
    }
  }
  initHeroShimmer();

  // ========== SECRET GRATITUDE — only for those who actually stay ==========
  function initGratitude(){
    const note = document.getElementById('gratitudeNote');
    if (!note) return;
    const arrivedAt = Date.now();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (Date.now() - arrivedAt) > 25000){
          note.classList.add('is-visible');
        }
      });
    }, { threshold: 0.5 });
    observer.observe(note);
  }
  initGratitude();

  // ========== AMBIENT ROOM TONE — continuous, very soft, respects mute ==========
  let ambientCtx = null;
  let ambientStarted = false;
  function startAmbient(){
    if (ambientStarted) return;
    ambientStarted = true;
    try {
      ambientCtx = getSharedAudioCtx();
      if (!ambientCtx) { console.warn('LITORAL ambient: no AudioContext available'); return; }
      console.log('LITORAL ambient: using shared AudioContext, state =', ambientCtx.state);

      function run(){
        const ctx = ambientCtx;
        const master = ctx.createGain();
        master.gain.value = 0.11;
        const muteGain = ctx.createGain();
        muteGain.gain.value = (typeof isMuted !== 'undefined' && isMuted) ? 0 : 1;
        master.connect(muteGain);
        muteGain.connect(ctx.destination);

        // a very soft, slow-breathing low pad — room tone, not melody
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine'; osc1.frequency.value = 82.4; // low E
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine'; osc2.frequency.value = 110.0; // A, soft interval
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 300;
        osc1.connect(lp); osc2.connect(lp); lp.connect(master);
        osc1.start(); osc2.start();

        // continuous slow breathing swell via an LFO modulating gain directly —
        // loops forever, not a one-shot curve
        const lfo = ctx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = 1 / 9; // ~9s breathing cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.03; // swings master.gain around the new base
        lfo.connect(lfoGain);
        lfoGain.connect(master.gain);
        lfo.start();

        window.__ambientMuteCheck = setInterval(() => {
          if (typeof isMuted !== 'undefined'){
            muteGain.gain.value = isMuted ? 0 : 1;
          }
        }, 400);
        console.log('LITORAL ambient: started, ctx.state =', ctx.state);
      }

      if (ambientCtx.state === 'suspended'){
        ambientCtx.resume().then(() => {
          console.log('LITORAL ambient: resumed, state =', ambientCtx.state);
          run();
        }).catch(err => console.warn('LITORAL ambient: resume() rejected —', err));
      } else {
        run();
      }
    } catch (e) {
      console.warn('LITORAL ambient: blocked or unavailable —', e);
    }
  }
  // starts on first real interaction, same unlock pattern as the tide sound
  ['click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, startAmbient, { once: true, passive: true, capture: true });
  });

  const spendDayLink = document.getElementById('ch4SpendDay');
  if (spendDayLink){
    spendDayLink.addEventListener('click', (e) => {
      e.preventDefault();
      const ch3 = document.querySelector('[data-chapter="3"]');
      if (ch3) ch3.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ========== BOOKING FORM ==========
  function initBookingForm(){
    const checkinEl = document.getElementById('bkCheckin');
    const checkoutEl = document.getElementById('bkCheckout');
    const roomEl = document.getElementById('bkRoom');
    const summaryRoom = document.getElementById('bkSummaryRoom');
    const summaryNights = document.getElementById('bkSummaryNights');
    const summaryTotal = document.getElementById('bkSummaryTotal');
    const steps = Array.from(document.querySelectorAll('.wiz-step'));
    const dots = Array.from(document.querySelectorAll('.wiz-dot'));
    if (!checkinEl || !checkoutEl || steps.length === 0) return;

    // sensible defaults: check-in a week from now, 4-night stay
    const today = new Date();
    const inDate = new Date(today); inDate.setDate(inDate.getDate() + 7);
    const outDate = new Date(inDate); outDate.setDate(outDate.getDate() + 4);
    const fmt = (d) => d.toISOString().slice(0, 10);
    checkinEl.value = fmt(inDate);
    checkoutEl.value = fmt(outDate);
    checkinEl.min = fmt(today);

    function goToStep(n){
      steps.forEach(s => s.classList.toggle('is-active', Number(s.dataset.step) === n));
      dots.forEach(d => {
        const dn = Number(d.dataset.step);
        d.classList.toggle('is-active', dn === n);
        d.classList.toggle('is-done', dn < n);
      });
      if (n === 3) updateSummary();
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateSummary(){
      const inD = new Date(checkinEl.value);
      const outD = new Date(checkoutEl.value);
      let nights = Math.round((outD - inD) / 86400000);
      if (!nights || nights < 1) nights = 1;

      const selectedOption = roomEl.options[roomEl.selectedIndex];
      const roomName = selectedOption.textContent.split(' — ')[0];
      const price = parseInt(selectedOption.dataset.price, 10) || 0;
      const total = price * nights;

      summaryRoom.textContent = roomName;
      summaryNights.textContent = `${nights} night${nights === 1 ? '' : 's'}`;
      summaryTotal.textContent = '€' + total.toLocaleString('en-US');
    }

    document.querySelectorAll('.wiz-next-btn').forEach(btn => {
      btn.addEventListener('click', () => goToStep(Number(btn.dataset.next)));
    });
    document.querySelectorAll('.wiz-back-btn').forEach(btn => {
      btn.addEventListener('click', () => goToStep(Number(btn.dataset.back)));
    });
  }
  initBookingForm();

  const ctaBookBtn = document.getElementById('ctaBookBtn');
  if (ctaBookBtn){
    ctaBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // fonts/images can finish loading after ScrollTrigger's initial measurement,
  // shifting section heights — refresh once everything has actually settled
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });