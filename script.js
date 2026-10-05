// ======================================================
// OUR LOVE SANCTUARY — SCRIPT.JS
// ======================================================


// ======================================================
// COUNTDOWN
// Mulai: 27 September 2025, 23:15 WIB
// ======================================================

const start = new Date('2025-09-27T23:15:00+07:00');
const countdown = document.getElementById('countdown');

function updateTime() {
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let anchor = new Date(start);

  anchor.setFullYear(start.getFullYear() + years);

  if (anchor > now) {
    years--;
    anchor.setFullYear(start.getFullYear() + years);
  }

  let months = 0;

  while (true) {
    const next = new Date(anchor);
    next.setMonth(anchor.getMonth() + months + 1);

    if (next <= now) {
      months++;
    } else {
      break;
    }
  }

  anchor.setMonth(anchor.getMonth() + months);

  const difference = Math.max(0, now - anchor);

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor(difference / 3600000) % 24;
  const minutes = Math.floor(difference / 60000) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  countdown.innerHTML = [
    [years, 'Years'],
    [months, 'Months'],
    [days, 'Days'],
    [hours, 'Hours'],
    [minutes, 'Minutes'],
    [seconds, 'Seconds']
  ]
    .map(item => `
      <div>
        <b>${item[0]}</b>
        <span>${item[1]}</span>
      </div>
    `)
    .join('');
}

updateTime();
setInterval(updateTime, 1000);


// ======================================================
// MEMORIES PAGE 1
// ======================================================

const memories = [
  {
    name: 'Pantai Tirang',
    image: 'pantai-tirang.jpg'
  },
  {
    name: 'Curug Semirang',
    image: 'curug-semirang.jpg'
  },
  {
    name: 'On Seven',
    image: 'on-seven.jpg'
  },
  {
    name: 'Curug Telu',
    image: 'curug-telu.jpg'
  },
  {
    name: 'Dies Natalis',
    image: 'dies-natalis.jpg'
  },
  {
    name: 'Hari Batik',
    image: 'hari-batik.jpg'
  }
];

const gallery = document.getElementById('gallery');

if (gallery) {
  memories.forEach((memory, index) => {

    const element = document.createElement('article');

    element.className = 'memory';

    element.innerHTML = `
      <div class="memory-image">
        <img
          src="${memory.image}"
          alt="${memory.name}"
          loading="lazy"
        >
      </div>

      <div class="memory-content">
        <b>${memory.name}</b>
        <span>
          memory ${String(index + 1).padStart(2, '0')} · click to view
        </span>
      </div>
    `;

    element.addEventListener('click', () => {
      openPhoto(memory.image, memory.name);
    });

    gallery.appendChild(element);
  });
}


// ======================================================
// PHOTO FULLSCREEN
// ======================================================

const photoModal = document.getElementById('photoModal');
const photoView = document.getElementById('photoView');
const photoCaption = document.getElementById('photoCaption');

function openPhoto(image, name) {

  if (!photoModal || !photoView) return;

  photoView.innerHTML = `
    <img src="${image}" alt="${name}">
  `;

  if (photoCaption) {
    photoCaption.textContent = name;
  }

  photoModal.classList.add('show');

  document.body.classList.add('modal-open');
}

function closePhoto() {

  if (!photoModal) return;

  photoModal.classList.remove('show');

  document.body.classList.remove('modal-open');

  setTimeout(() => {
    if (photoView) {
      photoView.innerHTML = '';
    }
  }, 300);
}

const photoClose = document.querySelector('[data-photo-close]');

if (photoClose) {
  photoClose.addEventListener('click', closePhoto);
}

if (photoModal) {
  photoModal.addEventListener('click', event => {

    if (event.target === photoModal) {
      closePhoto();
    }

  });
}


// ======================================================
// LOVE LETTER
// ======================================================

const letterModal = document.getElementById('letterModal');
const readLetter = document.getElementById('readLetter');

if (readLetter && letterModal) {

  readLetter.addEventListener('click', () => {
    letterModal.classList.add('show');
  });

}

document.querySelectorAll('[data-close]').forEach(button => {

  button.addEventListener('click', () => {

    if (letterModal) {
      letterModal.classList.remove('show');
    }

  });

});


// ======================================================
// OUR SONGS
// ======================================================

const songs = [
  {
    title: 'Kisah Romantis',
    artist: 'Glenn Fredly',
    audio: 'Kisah Romantis.mp3',
    cover: 'cover1.jpg'
  },

  {
    title: 'Risk It All',
    artist: 'Bruno Mars',
    audio: 'Risk It All.mp3',
    cover: 'cover2.jpg'
  },

  {
    title: 'So High School',
    artist: 'Taylor Swift',
    audio: 'So High School.mp3',
    cover: 'cover3.jpg'
  },

  {
    title: 'Denganmu Cinta',
    artist: '—',
    audio: 'Denganmu Cinta.mp3',
    cover: 'cover4.jpg'
  },

  {
    title: 'Begin Again',
    artist: 'Taylor Swift',
    audio: "Begin Again (Taylor's Version).mp3",
    cover: 'cover5.jpg'
  },

  {
    title: 'Hanya Untukmu',
    artist: '—',
    audio: 'Hanya Untuk Mu.mp3',
    cover: 'cover6.jpg'
  }
];


// ======================================================
// PLAYER ELEMENT
// ======================================================

const title = document.getElementById('songTitle');
const artist = document.getElementById('songArtist');
const playlist = document.getElementById('playlist');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const progress = document.getElementById('progress');
const cover = document.getElementById('cover');


// ======================================================
// AUDIO ELEMENT
// ======================================================

const audio = new Audio();

audio.preload = 'metadata';

let current = 0;
let playing = false;


// ======================================================
// LOAD SONG
// ======================================================

function loadSong(shouldPlay = false) {

  const song = songs[current];

  if (!song) return;

  // Informasi lagu
  if (title) {
    title.textContent = song.title;
  }

  if (artist) {
    artist.textContent = song.artist;
  }

  // Cover
  if (cover) {

    cover.innerHTML = `
      <img
        src="${song.cover}"
        alt="${song.title}"
      >
    `;

  }

  // Audio
  audio.src = song.audio;

  audio.load();

  // Reset progress
  if (progress) {
    progress.value = 0;
  }

  updatePlaylist();

  if (shouldPlay) {
    playSong();
  }

}


// ======================================================
// PLAY
// ======================================================

function playSong() {

  audio.play()
    .then(() => {

      playing = true;

      if (playButton) {
        playButton.textContent = '❚❚';
      }

    })
    .catch(error => {

      console.log('Audio gagal diputar:', error);

    });

}


// ======================================================
// PAUSE
// ======================================================

function pauseSong() {

  audio.pause();

  playing = false;

  if (playButton) {
    playButton.textContent = '▶';
  }

}


// ======================================================
// PLAY / PAUSE BUTTON
// ======================================================

if (playButton) {

  playButton.addEventListener('click', () => {

    if (playing) {
      pauseSong();
    } else {
      playSong();
    }

  });

}


// ======================================================
// NEXT
// ======================================================

if (nextButton) {

  nextButton.addEventListener('click', () => {

    current++;

    if (current >= songs.length) {
      current = 0;
    }

    loadSong(true);

  });

}


// ======================================================
// PREVIOUS
// ======================================================

if (prevButton) {

  prevButton.addEventListener('click', () => {

    current--;

    if (current < 0) {
      current = songs.length - 1;
    }

    loadSong(true);

  });

}


// ======================================================
// UPDATE PROGRESS BAR
// ======================================================

audio.addEventListener('timeupdate', () => {

  if (!audio.duration || !progress) return;

  const percentage =
    (audio.currentTime / audio.duration) * 100;

  progress.value = percentage;

});


// ======================================================
// SEEK / GESER LAGU
// ======================================================

if (progress) {

  progress.addEventListener('input', () => {

    if (!audio.duration) return;

    const newTime =
      (progress.value / 100) * audio.duration;

    audio.currentTime = newTime;

  });

}


// ======================================================
// LAGU SELESAI → OTOMATIS NEXT
// ======================================================

audio.addEventListener('ended', () => {

  current++;

  if (current >= songs.length) {
    current = 0;
  }

  loadSong(true);

});


// ======================================================
// PLAYLIST
// ======================================================

function updatePlaylist() {

  if (!playlist) return;

  playlist.innerHTML = songs
    .map((song, index) => {

      return `
        <div
          class="playlist-item ${index === current ? 'active' : ''}"
          data-index="${index}"
        >

          <span class="track-num">
            ${String(index + 1).padStart(2, '0')}
          </span>

          <span class="track-title">
            ${song.title}
          </span>

          <span class="track-artist">
            ${song.artist}
          </span>

        </div>
      `;

    })
    .join('');


  // Klik playlist
  playlist
    .querySelectorAll('.playlist-item')
    .forEach(item => {

      item.addEventListener('click', () => {

        current = Number(item.dataset.index);

        loadSong(true);

      });

    });

}


// ======================================================
// INITIAL SONG
// ======================================================

loadSong(false);


// ======================================================
// MOBILE MENU
// ======================================================

const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menuButton && nav) {

  menuButton.addEventListener('click', () => {

    nav.classList.toggle('open');

  });

}


// ======================================================
// NAVIGATION ACTIVE STATE
// ======================================================

const links = [
  ...document.querySelectorAll('nav a')
];

const sections = [
  ...document.querySelectorAll('main section')
];

if (links.length && sections.length) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          links.forEach(link => {

            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );

          });

        }

      });

    },
    {
      rootMargin: '-35% 0px -55%'
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

}


// ======================================================
// ESCAPE
// ======================================================

window.addEventListener('keydown', event => {

  if (event.key === 'Escape') {

    if (letterModal) {
      letterModal.classList.remove('show');
    }

    closePhoto();

  }

});
/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
  '.heading, .glass, .timeline article, .memory, .growth article, .music'
);

revealElements.forEach(element => {
  element.classList.add('scroll-reveal');
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add('show');

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold:0.15,
    rootMargin:'0px 0px -50px 0px'
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});
