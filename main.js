/* =========================================================
   DATA — ubah isi di sini untuk mengganti teks, foto, dan lagu
   ========================================================= */

// Tanggal mulai hitung mundur (tahun-bulan-hari jam:menit:detik)
const START_DATE = new Date('2025-08-30T08:42:19');

const JOURNEY = [
  { date: 'Okt 01, 2025',     title: 'The Day We Met',     img: 'assets/img/the-day-we-met.jpg',    text: 'Hari pertama bisa ngobrol ngobrol, walaupun masih di depan lab wkwkwkwk' },
  { date: 'Januari 10, 2026', title: 'Our First Adventure', img: 'assets/img/curug-semirang.jpg',   text: 'Pertama kali ke curug, bukan curug lawe tapi ke semirang, langsung le capean ga kuat [noob]' },
  { date: 'April 04, 2026',   title: 'Happy Moment',        img: 'assets/img/playground.jpg',       text: 'Under a sky full of stars, we chose forever—and every beautiful chapter still waiting for us.' },
  { date: 'Maret, 2026',      title: 'Ramadhan Moment',     img: 'assets/img/bukber.jpg',           text: 'Bukber pertama kali, makan nasi goreng di kedai siang malam, kangen jir lah....' },
];

// Surat yang tampil pertama kali di kartu kanan
const FEATURED_LETTER = {
  date: 'September 12, 2026',
  title: 'Khira Violet Anarta',
  body: [
    'My love,',
    'Somehow, even after all this time, your name still feels like my favorite secret and your hand still feels like home. You make the brightest days more beautiful and the difficult ones feel possible.',
    'Thank you for every laugh, every patient silence, and every ordinary morning that becomes extraordinary simply because it is ours.',
    'In this life and every life after, I will keep choosing you. Always yours.',
  ],
};
// Daftar surat di kiri. Ganti "body" dengan isi surat lengkap.
const LETTERS = [
  { date: 'Oktober 03, 2026', title: 'To My Favorite Person',    body: ['Entah kenapa, setelah selama ini, namamu masih jadi salah satu hal favorit yang selalu bikin aku senyum, dan rasanya tetap nyaman setia…'] },
  { date: 'June 03, 2026',    title: 'For All Our Ordinary Days', body: ['Aku suka petualangan dan hal-hal seru, tapi ternyata momen sederhana bareng kamu justru lebih aku suka—ngobrol santai, ketawa…'] },
  { date: 'February 14, 2026', title: 'Our Story Going Forward',  body: ['Nggak tahu nanti bakal ke mana, tapi kalau masih bisa bareng kamu, ketawa bareng, ngobrol random, dan bikin cerita baru, sounds good to me.'] },
];

const MEMORIES = [
  // halaman 1
  { title: 'Bukber',        date: 'Maret, 2026',    img: 'bukber' },
  { title: 'Hari Batik',    date: 'April, 2026',    img: 'hari-batik' },
  { title: 'Serrac',        date: 'Agutus, 2026',   img: 'serrac' },
  { title: 'Pulang Bareng', date: 'Mei, 2026',      img: 'pulang-bareng' },
  { title: 'Playground',    date: 'April, 2026',    img: 'playground' },
  { title: 'Awan Costa',    date: 'Juni 2026',      img: 'awan-costa' },
  // halaman 2
  { title: 'Pantau Tirang',  date: 'Agustus, 2026',  img: 'pantai-tirang' },
  { title: 'Cyrug Semirang', date: 'Januari, 2026',  img: 'curug-semirang' },
  { title: 'On Sevem',       date: 'Desember 2025',  img: 'on-sevem' },
  { title: 'Curug Telu',     date: 'Juli, 2026',     img: 'curug-telu' },
  { title: 'Dies Natalis',   date: 'Mei, 2026',      img: 'dies-natalis' },
  { title: 'Hari Batik',     date: 'Oktober 2025',   img: 'hari-batik-2' },
];
const PER_PAGE = 6;

// Isi "src" dengan file mp3 (mis. 'assets/audio/kisah-romantis.mp3') supaya lagu benar-benar terputar.
const TRACKS = [
  { title: 'Kisah Romantis', artist: 'Glenn Fredly',  time: '2:57', src: '' },
  { title: 'Risk It All',    artist: 'Bruno Mars',    time: '3:29', src: '' },
  { title: 'So High School', artist: 'Taylor Swift',  time: '3:41', src: '' },
  { title: 'Denganmu Cinta', artist: 'mytha',         time: '3:37', src: '' },
  { title: 'Begin Again',    artist: 'Taylor Swift',  time: '3:29', src: '' },
  { title: 'Hanya Untukmu',  artist: 'Eten2five',     time: '5:03', src: '' },
];

/* ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const icon = id => `<svg class="ic"><use href="#i-${id}"/></svg>`;
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- Tema & efek ---------- */
const root = document.documentElement;
const savedTheme = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
if (savedTheme) setTheme(savedTheme);
function setTheme(t){
  root.dataset.theme = t;
  $('#themeIcon').innerHTML = `<use href="#i-${t === 'dark' ? 'moon' : 'sun'}"/>`;
  try { localStorage.setItem('theme', t); } catch {}
}
$('#themeBtn').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
$('#fxBtn').addEventListener('click', e => {
  const on = document.body.classList.toggle('fx-off');
  e.currentTarget.setAttribute('aria-pressed', String(!on));
});

/* ---------- Menu aktif saat scroll ---------- */
const links = $$('.nav-links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.dataset.sec === en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main > section').forEach(s => io.observe(s));

/* ---------- Hitung mundur ---------- */
function diff(from, to){
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  let h = to.getHours() - from.getHours();
  let mi = to.getMinutes() - from.getMinutes();
  let s = to.getSeconds() - from.getSeconds();
  if (s < 0){ s += 60; mi--; }
  if (mi < 0){ mi += 60; h--; }
  if (h < 0){ h += 24; d--; }
  if (d < 0){ d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); m--; }
  if (m < 0){ m += 12; y--; }
  return { years: y, months: m, days: d, hours: h, minutes: mi, seconds: s };
}
const pad = n => String(n).padStart(2, '0');
function tick(){
  const v = diff(START_DATE, new Date());
  $$('#countdown b').forEach(b => {
    const u = b.dataset.u;
    b.textContent = u === 'days' ? v[u] : pad(v[u]);
  });
}
tick(); setInterval(tick, 1000);

/* ---------- Timeline ---------- */
$('#timeline').innerHTML = JOURNEY.map(j => `
  <div class="t-item">
    <article class="t-card">
      <img src="${j.img}" alt="${esc(j.title)}" loading="lazy">
      <div class="t-body">
        <div class="t-top"><span class="t-date">${esc(j.date)}</span>${icon('heart')}</div>
        <h3>${esc(j.title)}</h3>
        <p>${esc(j.text)}</p>
      </div>
    </article>
  </div>`).join('');

/* ---------- Love letters ---------- */
const side = $('#letterSide');
function showLetter(l, idx){
  $('#lDate').textContent = l.date;
  $('#lTitle').textContent = l.title;
  $('#lBody').innerHTML = l.body.map(p => `<p>${esc(p)}</p>`).join('');
  side.classList.remove('closed');
  $$('.l-card').forEach((c, i) => c.setAttribute('aria-pressed', String(i === idx)));
}
$('#letterList').innerHTML = LETTERS.map((l, i) => `
  <button class="l-card" data-i="${i}" aria-pressed="false">
    <span class="l-ic">${icon('heart')}</span>
    <span class="l-txt"><span class="date">${esc(l.date)}</span><h3>${esc(l.title)}</h3><p>${esc(l.body[0])}</p></span>
    <span class="l-go">${icon('arrow')}</span>
  </button>`).join('');
$$('.l-card').forEach(c => c.addEventListener('click', () => showLetter(LETTERS[+c.dataset.i], +c.dataset.i)));
$('#letterClose').addEventListener('click', () => {
  side.classList.add('closed');
  $$('.l-card').forEach(c => c.setAttribute('aria-pressed', 'false'));
});
showLetter(FEATURED_LETTER, -1);

/* ---------- Galeri + lightbox ---------- */
let page = 1, lbIndex = 0;
const pages = Math.ceil(MEMORIES.length / PER_PAGE);
function renderGallery(){
  const start = (page - 1) * PER_PAGE;
  $('#gallery').innerHTML = MEMORIES.slice(start, start + PER_PAGE).map((m, i) => `
    <div class="g-item" tabindex="0" role="button" aria-label="Lihat ${esc(m.title)} layar penuh" data-i="${start + i}">
      <img src="assets/img/${m.img}.jpg" alt="${esc(m.title)}" loading="lazy">
      <span class="g-view">${icon('expand')} View Fullscreen</span>
      <div class="g-cap"><b>${esc(m.title)}</b><small>${esc(m.date)}</small></div>
      <span class="g-exp">${icon('expand')}</span>
    </div>`).join('');
  $('#pager').innerHTML = Array.from({ length: pages }, (_, i) =>
    `<button data-p="${i + 1}" aria-label="Halaman ${i + 1}" ${i + 1 === page ? 'aria-current="true"' : ''}>${i + 1}</button>`).join('');
}
$('#pager').addEventListener('click', e => { const b = e.target.closest('button'); if (b){ page = +b.dataset.p; renderGallery(); } });
$('#gallery').addEventListener('click', e => { const g = e.target.closest('.g-item'); if (g) openLb(+g.dataset.i); });
$('#gallery').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ const g = e.target.closest('.g-item'); if (g){ e.preventDefault(); openLb(+g.dataset.i); } } });
renderGallery();

const lb = $('#lightbox');
function openLb(i){
  lbIndex = (i + MEMORIES.length) % MEMORIES.length;
  const m = MEMORIES[lbIndex];
  $('#lbImg').src = `assets/img/${m.img}.jpg`; $('#lbImg').alt = m.title;
  $('#lbTitle').textContent = m.title; $('#lbDate').textContent = m.date;
  lb.hidden = false; document.body.style.overflow = 'hidden';
}
function closeLb(){ lb.hidden = true; document.body.style.overflow = ''; }
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', () => openLb(lbIndex - 1));
$('#lbNext').addEventListener('click', () => openLb(lbIndex + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
  if (e.key === 'ArrowRight') openLb(lbIndex + 1);
});

/* ---------- Pemutar musik ---------- */
const audio = $('#audio');
const toSec = t => { const [m, s] = t.split(':').map(Number); return m * 60 + s; };
const fmt = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
let cur = 0, playing = true, elapsed = 92, shuffle = false, liked = false;

function renderList(){
  $('#plist').innerHTML = TRACKS.map((t, i) => `
    <li><button class="song ${i === cur ? 'active' : ''}" data-i="${i}">
      <span class="s-num">${i === cur ? `<span class="eq">${'<i></i>'.repeat(4)}</span>` : pad(i + 1)}</span>
      <span class="s-main"><b>${esc(t.title)}</b><small>${esc(t.artist)}</small></span>
      <span class="s-time">${t.time}</span><span class="s-more" aria-hidden="true">•••</span>
    </button></li>`).join('');
  $('#plist').classList.toggle('playing', playing);
}
function dur(){ return audio.src && audio.duration ? audio.duration : toSec(TRACKS[cur].time); }
function paint(){
  const d = dur(), pct = Math.min(100, elapsed / d * 100);
  $('#barFill').style.width = pct + '%';
  $('#tNow').textContent = fmt(elapsed);
  $('#tEnd').textContent = fmt(d);
  $('#playIcon').innerHTML = `<use href="#i-${playing ? 'pause' : 'play'}"/>`;
  $('#plist').classList.toggle('playing', playing);
}
function load(i, start = 0){
  cur = i; elapsed = start;
  const t = TRACKS[cur];
  $('#pTitle').textContent = t.title; $('#pArtist').textContent = t.artist;
  if (t.src){ audio.src = t.src; audio.currentTime = start; } else { audio.removeAttribute('src'); }
  renderList(); paint();
  if (playing && t.src) audio.play().catch(() => { playing = false; paint(); });
}
function next(dir = 1){
  let i = shuffle ? Math.floor(Math.random() * TRACKS.length) : (cur + dir + TRACKS.length) % TRACKS.length;
  if (shuffle && i === cur) i = (cur + 1) % TRACKS.length;
  load(i);
}
setInterval(() => {
  if (!playing) return;
  if (TRACKS[cur].src){ elapsed = audio.currentTime; }
  else { elapsed += 1; if (elapsed >= dur()) return next(); }
  paint();
}, 1000);
audio.addEventListener('ended', () => next());

$('#playBtn').addEventListener('click', () => {
  playing = !playing;
  if (TRACKS[cur].src) playing ? audio.play().catch(() => { playing = false; paint(); }) : audio.pause();
  paint();
});
$('#nextBtn').addEventListener('click', () => next(1));
$('#prevBtn').addEventListener('click', () => elapsed > 3 ? load(cur) : next(-1));
$('#plist').addEventListener('click', e => { const b = e.target.closest('.song'); if (b){ playing = true; load(+b.dataset.i); } });
$('#shuffleBtn').addEventListener('click', e => { shuffle = !shuffle; e.currentTarget.setAttribute('aria-pressed', String(shuffle)); });
$('#likeBtn').addEventListener('click', e => { liked = !liked; e.currentTarget.setAttribute('aria-pressed', String(liked)); });

function seek(clientX){
  const r = $('#bar').getBoundingClientRect();
  elapsed = Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * dur();
  if (TRACKS[cur].src) audio.currentTime = elapsed;
  paint();
}
$('#bar').addEventListener('click', e => seek(e.clientX));
$('#bar').addEventListener('keydown', e => {
  if (e.key === 'ArrowRight'){ elapsed = Math.min(dur(), elapsed + 5); }
  if (e.key === 'ArrowLeft'){ elapsed = Math.max(0, elapsed - 5); }
  if (TRACKS[cur].src) audio.currentTime = elapsed;
  paint();
});

load(0, 92);
