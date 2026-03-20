/**
 * 하얀마음 백구 스타일 - 게임형 모바일 청첩장
 * 횡스크롤 플랫포머 웨딩 인비테이션
 */
(function () {
  'use strict';

  // ===== CONSTANTS =====
  const GW = 128; // internal game width
  let GH = 228;   // calculated from aspect ratio
  const GRAVITY = 0.35;
  const JUMP_VEL = -5.5;
  const PLAYER_SPEED = 1.0;
  const ANIM_INTERVAL = 10;
  let GROUND_Y;

  // ===== SPRITE COLOR PALETTE =====
  const SP = [
    null,           // 0 - transparent
    '#1B1B2F',      // 1 - outline/black
    '#FFDCB8',      // 2 - skin
    '#4A3728',      // 3 - dark hair
    '#2C3E50',      // 4 - suit dark
    '#FFFFFF',      // 5 - white
    '#E74C3C',      // 6 - red
    '#FF8FAB',      // 7 - pink
    '#F1C40F',      // 8 - gold/yellow
    '#2ECC71',      // 9 - green
    '#8B5E3C',      // 10 - brown
    '#A67C52',      // 11 - brown light
    '#5B86E5',      // 12 - blue
    '#C9738E',      // 13 - dark pink
    '#34495E',      // 14 - suit lighter
  ];

  // ===== SPRITE DEFINITIONS (8x12) =====
  const GROOM_1 = [
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 2, 2, 2, 2, 3, 0],
    [0, 2, 1, 2, 2, 1, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 4, 4, 6, 4, 4, 4, 0],
    [4, 4, 14, 6, 14, 4, 4, 4],
    [0, 4, 4, 4, 4, 4, 4, 0],
    [0, 0, 4, 4, 4, 4, 0, 0],
    [0, 0, 4, 0, 0, 4, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
  ];
  const GROOM_2 = [
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 2, 2, 2, 2, 3, 0],
    [0, 2, 1, 2, 2, 1, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 4, 4, 6, 4, 4, 4, 0],
    [4, 4, 14, 6, 14, 4, 4, 4],
    [0, 4, 4, 4, 4, 4, 4, 0],
    [0, 0, 4, 4, 4, 4, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
  ];
  const BRIDE_1 = [
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 0],
    [5, 3, 2, 2, 2, 2, 3, 5],
    [5, 2, 1, 2, 2, 1, 2, 5],
    [0, 2, 2, 7, 7, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 5, 5, 5, 5, 5, 5, 0],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [0, 5, 5, 5, 5, 5, 5, 0],
    [0, 0, 2, 0, 0, 2, 0, 0],
    [0, 0, 5, 0, 0, 5, 0, 0],
  ];
  const BRIDE_2 = [
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 0],
    [5, 3, 2, 2, 2, 2, 3, 5],
    [5, 2, 1, 2, 2, 1, 2, 5],
    [0, 2, 2, 7, 7, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 5, 5, 5, 5, 5, 5, 0],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [0, 5, 5, 5, 5, 5, 5, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 5, 5, 0, 0, 0],
  ];

  // Heart sprite (7x6)
  const HEART_SP = [
    [0, 6, 6, 0, 6, 6, 0],
    [6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6],
    [0, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 0, 0],
    [0, 0, 0, 6, 0, 0, 0],
  ];

  // Flag sprite (6x10)
  const FLAG_SP = [
    [1, 8, 8, 8, 8, 0],
    [1, 8, 6, 6, 8, 0],
    [1, 8, 8, 8, 8, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
  ];

  // ===== STAGE DEFINITIONS =====
  const STAGES = [
    {
      name: '신랑을 소개합니다',
      character: 'groom',
      length: 700,
      bgTop: '#87CEEB',
      bgBot: '#C8E6F0',
      grass: '#4CAF50',
      dirt: '#8B5E3C',
    },
    {
      name: '신부를 소개합니다',
      character: 'bride',
      length: 700,
      bgTop: '#FFCDD2',
      bgBot: '#FFF0F5',
      grass: '#F48FB1',
      dirt: '#C9738E',
    },
    {
      name: '우리의 이야기',
      character: 'both',
      length: 800,
      bgTop: '#FFE0B2',
      bgBot: '#FFF8E1',
      grass: '#FFB74D',
      dirt: '#D68910',
    },
    {
      name: '예식 안내',
      character: 'both',
      length: 700,
      bgTop: '#7E57C2',
      bgBot: '#B39DDB',
      grass: '#5E35B1',
      dirt: '#4527A0',
    },
  ];

  // ===== GAME STATE =====
  let canvas, ctx;
  let gameState = 'title'; // title | stageIntro | playing | stageClear | gallery | final
  let currentStage = 0;
  let cameraX = 0;
  let player, companion;
  let platforms = [], hearts = [], clouds = [], decorations = [], particles = [];
  let goalFlag;
  let collectedHearts = 0;
  let stageComplete = false;
  let introTimer = 0;

  // ===== INIT =====
  function init() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);

    // Game input
    canvas.addEventListener('touchstart', onJump, { passive: false });
    canvas.addEventListener('mousedown', onJump);
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space' || e.code === 'ArrowUp') onJump(e);
    });

    // Overlay handlers (use click only to prevent double-fire on touch devices)
    el('title-screen').addEventListener('click', startGame);
    el('stage-info').addEventListener('click', onInfoTap);
    el('gallery-next').addEventListener('click', showFinal);
    el('restart-btn').addEventListener('click', restartGame);

    requestAnimationFrame(loop);
  }

  function resize() {
    // Container dimensions
    var cw = Math.min(window.innerWidth, 500);
    var ch = window.innerHeight;

    // Calculate internal canvas height from container aspect ratio
    var aspect = ch / cw;
    GH = Math.round(GW * Math.min(aspect, 2.5));
    canvas.width = GW;
    canvas.height = GH;
    GROUND_Y = GH - 32;

    // Scale canvas to fill container while maintaining aspect ratio
    var internalAspect = GH / GW;
    var containerAspect = ch / cw;
    var displayW, displayH;

    if (containerAspect > internalAspect) {
      // Container is taller - fit to width, center vertically
      displayW = cw;
      displayH = cw * internalAspect;
    } else {
      // Container is wider - fit to height, center horizontally
      displayH = ch;
      displayW = ch / internalAspect;
    }

    canvas.style.width = Math.ceil(displayW) + 'px';
    canvas.style.height = Math.ceil(displayH) + 'px';
    canvas.style.position = 'absolute';
    canvas.style.left = Math.floor((cw - displayW) / 2) + 'px';
    canvas.style.top = Math.floor((ch - displayH) / 2) + 'px';
    ctx.imageSmoothingEnabled = false;
  }

  // ===== HELPERS =====
  function el(id) { return document.getElementById(id); }

  function drawSprite(sprite, x, y, alpha) {
    const prev = ctx.globalAlpha;
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    for (let r = 0; r < sprite.length; r++) {
      for (let c = 0; c < sprite[r].length; c++) {
        const ci = sprite[r][c];
        if (ci === 0) continue;
        ctx.fillStyle = SP[ci];
        ctx.fillRect(Math.floor(x + c), Math.floor(y + r), 1, 1);
      }
    }
    ctx.globalAlpha = prev;
  }

  function spawnParticles(wx, wy, color, count) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: wx, y: wy,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -Math.random() * 2 - 0.5,
        color: color,
        life: 25 + Math.random() * 20,
        maxLife: 45,
      });
    }
  }

  function rng(seed) {
    // Simple seeded random for consistent level gen
    return function () {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  // ===== LEVEL GENERATION =====
  function generateLevel(idx) {
    const stage = STAGES[idx];
    const rand = rng(idx * 1000 + 42);

    platforms = [];
    hearts = [];
    clouds = [];
    decorations = [];
    particles = [];
    stageComplete = false;
    collectedHearts = 0;

    // Generate ground segments with small gaps
    let x = 0;
    while (x < stage.length - 40) {
      const segW = 40 + Math.floor(rand() * 60);
      platforms.push({ x: x, y: GROUND_Y, w: segW });

      // Add some floating platforms
      if (rand() > 0.5 && x > 30) {
        platforms.push({
          x: x + 10 + Math.floor(rand() * 20),
          y: GROUND_Y - 18 - Math.floor(rand() * 12),
          w: 16 + Math.floor(rand() * 12),
        });
      }

      // Gap - must jump to cross!
      const gapW = 15 + Math.floor(rand() * 11);
      x += segW + gapW;
    }
    // Final platform to goal
    platforms.push({ x: x, y: GROUND_Y, w: 60 });

    // Goal flag
    goalFlag = { x: x + 40, y: GROUND_Y - 10 };

    // Hearts
    for (let i = 0; i < 6; i++) {
      const hx = 60 + Math.floor(rand() * (stage.length - 120));
      const hy = GROUND_Y - 18 - Math.floor(rand() * 20);
      hearts.push({ x: hx, y: hy, collected: false, bob: rand() * Math.PI * 2 });
    }

    // Clouds
    for (let i = 0; i < 6; i++) {
      clouds.push({
        x: rand() * (stage.length + GW),
        y: 6 + rand() * (GH * 0.2),
        speed: 0.05 + rand() * 0.1,
      });
    }

    // Decorations - only place on top of ground platforms
    for (let i = 0; i < platforms.length; i++) {
      var plat = platforms[i];
      if (plat.y !== GROUND_Y) continue; // skip floating platforms
      if (plat.w < 30) continue; // skip small platforms
      // Place 1-2 decorations per ground segment
      var count = 1 + Math.floor(rand() * 2);
      for (var j = 0; j < count; j++) {
        var dx = plat.x + 6 + Math.floor(rand() * (plat.w - 12));
        decorations.push({
          type: rand() > 0.4 ? 'flower' : 'tree',
          x: dx,
          colorIdx: Math.floor(rand() * 4),
        });
      }
    }

    // Reset player
    player = {
      x: 16, y: GROUND_Y - 12,
      vy: 0, onGround: true,
      frame: 0, frameTimer: 0,
    };

    companion = null;
    if (stage.character === 'both') {
      companion = {
        x: player.x - 9, y: GROUND_Y - 12,
        vy: 0, onGround: true,
        frame: 0, frameTimer: 0,
        type: 'bride',
      };
    }

    cameraX = 0;
  }

  // ===== INPUT =====
  function onJump(e) {
    e.preventDefault();
    if (gameState !== 'playing') return;
    if (player.onGround) {
      player.vy = JUMP_VEL;
      player.onGround = false;
    }
  }

  // ===== GAME FLOW =====
  function startGame(e) {
    if (e) e.preventDefault();
    el('title-screen').classList.remove('active');
    currentStage = 0;
    collectedHearts = 0;
    showStageIntro(0);
  }

  function showStageIntro(idx) {
    gameState = 'stageIntro';
    generateLevel(idx);
    const s = STAGES[idx];
    el('stage-start').querySelector('.stage-num').textContent = 'STAGE ' + (idx + 1);
    el('stage-start').querySelector('.stage-name').textContent = s.name;
    el('stage-start').classList.add('active');
    introTimer = 90; // frames
  }

  function showStageInfo() {
    gameState = 'stageClear';

    const content = el('info-content');
    content.innerHTML = getInfoHTML(currentStage);

    // Add explicit next button
    var btn = document.createElement('button');
    btn.className = 'pixel-btn next-btn';
    btn.textContent = currentStage >= STAGES.length - 1 ? '갤러리 보기 ▶' : '다음 스테이지 ▶';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      onInfoTap(e);
    });
    content.appendChild(btn);

    el('stage-info').classList.add('active');
  }

  var infoTapLock = false;
  function onInfoTap(e) {
    if (e) e.preventDefault();
    if (infoTapLock) return;
    infoTapLock = true;
    el('stage-info').classList.remove('active');

    if (currentStage >= STAGES.length - 1) {
      showGallery();
    } else {
      currentStage++;
      showStageIntro(currentStage);
    }
    setTimeout(function () { infoTapLock = false; }, 500);
  }

  function showGallery() {
    gameState = 'gallery';
    const grid = el('photo-grid');
    const noPhotos = document.querySelector('.no-photos-msg');
    grid.innerHTML = '';

    if (CONFIG.photos && CONFIG.photos.length > 0) {
      noPhotos.style.display = 'none';
      CONFIG.photos.forEach(function (p) {
        const img = document.createElement('img');
        img.src = 'assets/photos/' + p;
        img.alt = 'Wedding photo';
        grid.appendChild(img);
      });
    } else {
      noPhotos.style.display = 'block';
    }
    el('gallery-section').classList.add('active');
  }

  function showFinal(e) {
    if (e) e.preventDefault();
    el('gallery-section').classList.remove('active');
    gameState = 'final';

    // Accounts
    const groomAccounts = CONFIG.accounts.filter(function (a) { return a.side.includes('신랑'); });
    const brideAccounts = CONFIG.accounts.filter(function (a) { return a.side.includes('신부'); });

    el('accounts-groom').innerHTML = '<h3>신랑측</h3>' + groomAccounts.map(accountHTML).join('');
    el('accounts-bride').innerHTML = '<h3>신부측</h3>' + brideAccounts.map(accountHTML).join('');

    // Contacts
    el('contacts-container').innerHTML = buildContactsHTML();

    el('final-section').classList.add('active');

    // Copy button handlers
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const num = btn.dataset.account;
        navigator.clipboard.writeText(num).then(function () {
          btn.textContent = '복사됨';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = '복사';
            btn.classList.remove('copied');
          }, 1500);
        }).catch(function () {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = num;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = '복사됨';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = '복사';
            btn.classList.remove('copied');
          }, 1500);
        });
      });
    });
  }

  function restartGame() {
    el('final-section').classList.remove('active');
    currentStage = 0;
    collectedHearts = 0;
    showStageIntro(0);
  }

  // ===== INFO HTML BUILDERS =====
  function getInfoHTML(idx) {
    switch (idx) {
      case 0: return [
        '<h2>GROOM</h2>',
        '<h3>' + CONFIG.groom.name + '</h3>',
        '<p>' + (CONFIG.groom.description || '') + '</p>',
        '<div class="info-parents">',
        CONFIG.groom.father.name + ' · ' + CONFIG.groom.mother.name + '의 아들',
        '</div>',
      ].join('');
      case 1: return [
        '<h2>BRIDE</h2>',
        '<h3>' + CONFIG.bride.name + '</h3>',
        '<p>' + (CONFIG.bride.description || '') + '</p>',
        '<div class="info-parents">',
        CONFIG.bride.father.name + ' · ' + CONFIG.bride.mother.name + '의 딸',
        '</div>',
      ].join('');
      case 2: return [
        '<h2>OUR STORY</h2>',
        '<p>' + (CONFIG.story || '').replace(/\n/g, '<br>') + '</p>',
      ].join('');
      case 3: return [
        '<h2>CEREMONY</h2>',
        '<p class="date-highlight">' + CONFIG.wedding.date + '</p>',
        '<p>' + CONFIG.wedding.day + ' ' + CONFIG.wedding.time + '</p>',
        '<p class="venue-name">' + CONFIG.wedding.venue + '</p>',
        '<p>' + (CONFIG.wedding.hall || '') + '</p>',
        '<p class="venue-address">' + (CONFIG.wedding.address || '') + '</p>',
        '<div class="map-buttons">',
        '<a class="map-btn" href="' + CONFIG.wedding.mapUrl + '" target="_blank">카카오맵</a>',
        '<a class="map-btn" href="' + CONFIG.wedding.naverMapUrl + '" target="_blank">네이버지도</a>',
        '</div>',
      ].join('');
      default: return '';
    }
  }

  function accountHTML(acc) {
    return [
      '<div class="account-item">',
      '<div class="account-info">',
      '<div>' + acc.holder + '</div>',
      '<div class="account-bank">' + acc.bank + ' ' + acc.number + '</div>',
      '</div>',
      '<button class="copy-btn" data-account="' + acc.number + '">복사</button>',
      '</div>',
    ].join('');
  }

  function buildContactsHTML() {
    var rows = [];
    rows.push(contactRow('신랑', CONFIG.groom.name, CONFIG.groom.phone));
    if (CONFIG.groom.father.phone) rows.push(contactRow('신랑 부', CONFIG.groom.father.name, CONFIG.groom.father.phone));
    if (CONFIG.groom.mother.phone) rows.push(contactRow('신랑 모', CONFIG.groom.mother.name, CONFIG.groom.mother.phone));
    rows.push(contactRow('신부', CONFIG.bride.name, CONFIG.bride.phone));
    if (CONFIG.bride.father.phone) rows.push(contactRow('신부 부', CONFIG.bride.father.name, CONFIG.bride.father.phone));
    if (CONFIG.bride.mother.phone) rows.push(contactRow('신부 모', CONFIG.bride.mother.name, CONFIG.bride.mother.phone));
    return rows.join('');
  }

  function contactRow(label, name, phone) {
    return [
      '<div class="contact-row">',
      '<span class="contact-label">' + label + '</span>',
      '<span class="contact-name">' + name + '</span>',
      '<a href="tel:' + phone + '">&#128222;</a>',
      '<a href="sms:' + phone + '">&#128172;</a>',
      '</div>',
    ].join('');
  }

  // ===== MAIN LOOP =====
  let lastTime = 0;
  function loop(time) {
    const dt = Math.min((time - lastTime) / 16.67, 3);
    lastTime = time;

    update(dt);
    render();
    requestAnimationFrame(loop);
  }

  // ===== UPDATE =====
  function update(dt) {
    if (gameState === 'stageIntro') {
      introTimer -= dt;
      if (introTimer <= 0) {
        el('stage-start').classList.remove('active');
        gameState = 'playing';
      }
      return;
    }

    if (gameState !== 'playing') return;

    // Player movement
    var prevY = player.y;
    player.x += PLAYER_SPEED * dt;
    player.vy += GRAVITY * dt;
    if (player.vy > 5) player.vy = 5;
    player.y += player.vy * dt;

    // Animation
    player.frameTimer += dt;
    if (player.frameTimer > ANIM_INTERVAL) {
      player.frameTimer = 0;
      player.frame = 1 - player.frame;
    }

    // Platform collision (sweep check + wall collision)
    player.onGround = false;
    for (var i = 0; i < platforms.length; i++) {
      var p = platforms[i];

      // Top collision (landing on platform)
      if (player.x + 7 > p.x && player.x + 1 < p.x + p.w) {
        var prevBot = prevY + 12;
        var currBot = player.y + 12;
        if (player.vy >= 0 && prevBot <= p.y + 2 && currBot >= p.y - 1) {
          player.y = p.y - 12;
          player.vy = 0;
          player.onGround = true;
        }
      }

      // Wall collision (hitting the side of a platform)
      // Only check if player's feet are below the platform top (not landing on it)
      if (player.y + 12 > p.y + 3) {
        // Hitting left wall of platform
        if (player.x + 7 > p.x && player.x + 1 < p.x && player.x + 7 < p.x + 8) {
          player.x = p.x - 7;
        }
      }
    }

    // Fall recovery - respawn on nearest platform ahead
    if (player.y > GH + 10) {
      var bestPlat = null;
      for (var i = 0; i < platforms.length; i++) {
        var p = platforms[i];
        if (p.x + p.w > player.x - 20) {
          bestPlat = p;
          break;
        }
      }
      if (bestPlat) {
        player.x = bestPlat.x + 10;
        player.y = bestPlat.y - 12;
      } else {
        player.y = GROUND_Y - 12;
        player.x = Math.max(cameraX + 10, player.x - 30);
      }
      player.vy = 0;
    }

    // Camera
    var targetCam = player.x - GW * 0.35;
    cameraX += (targetCam - cameraX) * 0.08 * dt;
    if (cameraX < 0) cameraX = 0;

    // Hearts
    for (var i = hearts.length - 1; i >= 0; i--) {
      var h = hearts[i];
      if (!h.collected) {
        h.bob += dt * 0.06;
        h._dy = h.y + Math.sin(h.bob) * 2;
        var dx = (player.x + 4) - (h.x + 3.5);
        var dy = (player.y + 6) - (h._dy + 3);
        // Also check companion
        var compHit = false;
        if (companion) {
          var cdx = (companion.x + 4) - (h.x + 3.5);
          var cdy = (companion.y + 6) - (h._dy + 3);
          compHit = Math.abs(cdx) < 7 && Math.abs(cdy) < 7;
        }
        if ((Math.abs(dx) < 7 && Math.abs(dy) < 7) || compHit) {
          h.collected = true;
          collectedHearts++;
          spawnParticles(h.x + 3.5, h._dy + 3, SP[7], 8);
        }
      }
    }

    // Companion - independent physics, stays next to player
    if (companion) {
      // Follow player x position (stuck to left side)
      companion.x = player.x - 9;

      // Independent gravity & collision
      var prevCompY = companion.y;
      companion.vy += GRAVITY * dt;
      if (companion.vy > 5) companion.vy = 5;
      companion.y += companion.vy * dt;

      // Platform collision for companion
      companion.onGround = false;
      for (var i = 0; i < platforms.length; i++) {
        var p = platforms[i];
        if (companion.x + 7 > p.x && companion.x + 1 < p.x + p.w) {
          var prevBot = prevCompY + 12;
          var currBot = companion.y + 12;
          if (companion.vy >= 0 && prevBot <= p.y + 2 && currBot >= p.y - 1) {
            companion.y = p.y - 12;
            companion.vy = 0;
            companion.onGround = true;
          }
        }
        // Wall collision for companion
        if (companion.y + 12 > p.y + 3) {
          if (companion.x + 7 > p.x && companion.x + 1 < p.x && companion.x + 7 < p.x + 8) {
            companion.x = p.x - 7;
          }
        }
      }

      // Fall recovery for companion
      if (companion.y > GH + 10) {
        companion.y = player.y;
        companion.vy = 0;
      }

      // Jump together with player
      if (player.vy < 0 && companion.onGround) {
        companion.vy = JUMP_VEL;
        companion.onGround = false;
      }

      // Animation synced
      companion.frame = player.frame;
    }

    // Particles
    for (var i = particles.length - 1; i >= 0; i--) {
      var pt = particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += 0.1 * dt;
      pt.life -= dt;
      if (pt.life <= 0) particles.splice(i, 1);
    }

    // Clouds
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      c.x -= c.speed * dt;
      if (c.x < cameraX - 20) {
        c.x = cameraX + GW + Math.random() * 80;
      }
    }

    // Goal check
    if (!stageComplete && player.x >= goalFlag.x) {
      stageComplete = true;
      spawnParticles(goalFlag.x + 3, goalFlag.y, SP[8], 15);
      spawnParticles(goalFlag.x + 3, goalFlag.y, SP[7], 10);
      setTimeout(showStageInfo, 600);
    }
  }

  // ===== RENDER =====
  function render() {
    if (!ctx) return;
    var stage = STAGES[currentStage] || STAGES[0];

    // Background gradient
    var grad = ctx.createLinearGradient(0, 0, 0, GH);
    grad.addColorStop(0, stage.bgTop);
    grad.addColorStop(1, stage.bgBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GW, GH);

    // Clouds (parallax)
    ctx.globalAlpha = 0.6;
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      var sx = Math.floor(c.x - cameraX * 0.4);
      drawCloud(sx, c.y);
    }
    ctx.globalAlpha = 1;

    // Decorations (behind ground)
    for (var i = 0; i < decorations.length; i++) {
      var d = decorations[i];
      var sx = Math.floor(d.x - cameraX);
      if (sx > -12 && sx < GW + 12) {
        drawDecoration(d, sx, GROUND_Y);
      }
    }

    // Platforms / Ground
    for (var i = 0; i < platforms.length; i++) {
      var p = platforms[i];
      var sx = Math.floor(p.x - cameraX);
      if (sx + p.w < -2 || sx > GW + 2) continue;
      // Grass
      ctx.fillStyle = stage.grass;
      ctx.fillRect(sx, p.y, p.w, 3);
      // Dirt
      ctx.fillStyle = stage.dirt;
      ctx.fillRect(sx, p.y + 3, p.w, GH - p.y);
      // Grass highlight
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(sx, p.y, p.w, 1);
    }

    // Hearts
    for (var i = 0; i < hearts.length; i++) {
      var h = hearts[i];
      if (h.collected) continue;
      var sx = Math.floor(h.x - cameraX);
      if (sx > -8 && sx < GW + 8) {
        drawSprite(HEART_SP, sx, h._dy || h.y);
      }
    }

    // Goal flag
    if (goalFlag) {
      var sx = Math.floor(goalFlag.x - cameraX);
      if (sx > -8 && sx < GW + 8) {
        drawSprite(FLAG_SP, sx, goalFlag.y);
      }
    }

    // Companion
    if (companion) {
      var sx = Math.floor(companion.x - cameraX);
      var sp = companion.frame === 0 ? BRIDE_1 : BRIDE_2;
      drawSprite(sp, sx, companion.y);
    }

    // Player
    if (gameState === 'playing' || gameState === 'stageClear') {
      var sx = Math.floor(player.x - cameraX);
      var charType = STAGES[currentStage].character;
      var sp;
      if (charType === 'bride') {
        sp = player.frame === 0 ? BRIDE_1 : BRIDE_2;
      } else {
        sp = player.frame === 0 ? GROOM_1 : GROOM_2;
      }
      drawSprite(sp, sx, player.y);
    }

    // Particles
    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx.fillStyle = pt.color;
      ctx.fillRect(Math.floor(pt.x - cameraX), Math.floor(pt.y), 1, 1);
    }
    ctx.globalAlpha = 1;

    // HUD
    if (gameState === 'playing') {
      // Top bar
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, GW, 10);

      ctx.fillStyle = '#fff';
      ctx.font = '7px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('STAGE ' + (currentStage + 1), 3, 8);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FF6B9D';
      ctx.fillText('\u2665 ' + collectedHearts, GW - 3, 8);

      // Tap hint at start
      if (player.x < 40) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,' + (0.5 + 0.3 * Math.sin(Date.now() * 0.005)) + ')';
        ctx.font = '6px monospace';
        ctx.fillText('TAP TO JUMP!', GW / 2, GH / 2 - 10);
      }
    }
  }

  // ===== DRAW HELPERS =====
  function drawCloud(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 2, y, 8, 1);
    ctx.fillRect(x + 1, y + 1, 10, 1);
    ctx.fillRect(x, y + 2, 12, 2);
    ctx.fillRect(x + 1, y + 4, 10, 1);
    ctx.fillRect(x + 3, y + 5, 6, 1);
  }

  function drawDecoration(d, sx, gy) {
    var flowerColors = [SP[6], SP[7], SP[8], '#9B59B6'];
    if (d.type === 'tree') {
      // Trunk
      ctx.fillStyle = SP[10];
      ctx.fillRect(sx + 2, gy - 10, 2, 10);
      // Leaves
      ctx.fillStyle = SP[9];
      ctx.fillRect(sx, gy - 16, 6, 7);
      ctx.fillRect(sx + 1, gy - 18, 4, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(sx + 1, gy - 15, 2, 3);
    } else {
      // Stem
      ctx.fillStyle = SP[9];
      ctx.fillRect(sx + 1, gy - 5, 1, 5);
      // Petal
      ctx.fillStyle = flowerColors[d.colorIdx];
      ctx.fillRect(sx, gy - 8, 3, 3);
      // Center
      ctx.fillStyle = SP[8];
      ctx.fillRect(sx + 1, gy - 7, 1, 1);
    }
  }

  // ===== BOOT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
