/* =========================
   OUR LOVE SANCTUARY
   SCRIPT.JS
========================= */


/* =========================
   COUNTDOWN
========================= */

const start = new Date('2025-09-27T23:15:00+07:00');

const countdown = document.getElementById('countdown');

function updateTime() {

  if (!countdown) return;

  const now = new Date();

  let years =
    now.getFullYear() - start.getFullYear();

  let anchor = new Date(start);

  anchor.setFullYear(
    start.getFullYear() + years
  );

  if (anchor > now) {

    years--;

    anchor.setFullYear(
      start.getFullYear() + years
    );

  }

  let months = 0;

  while (true) {

    const next = new Date(anchor);

    next.setMonth(
      anchor.getMonth() + months + 1
    );

    if (next <= now) {

      months++;

    } else {

      break;

    }

  }

  anchor.setMonth(
    anchor.getMonth() + months
  );


  const diff =
    Math.max(0, now - anchor);


  const days =
    Math.floor(
      diff / 86400000
    );

  const hours =
    Math.floor(
      diff / 3600000
    ) % 24;

  const minutes =
    Math.floor(
      diff / 60000
    ) % 60;

  const seconds =
    Math.floor(
      diff / 1000
    ) % 60;


  countdown.innerHTML = [

    [years, 'Years'],

    [months, 'Months'],

    [days, 'Days'],

    [hours, 'Hours'],

    [minutes, 'Minutes'],

    [seconds, 'Seconds']

  ].map(item => `

    <div>

      <b>${item[0]}</b>

      <span>${item[1]}</span>

    </div>

  `).join('');

}

updateTime();

setInterval(updateTime, 1000);



/* =========================
   MEMORIES PAGE 1
========================= */

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


const gallery =
  document.getElementById('gallery');


if (gallery) {

  memories.forEach((memory, i) => {

    const el =
      document.createElement('article');

    el.className = 'memory';


    el.innerHTML = `

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
          memory ${String(i + 1).padStart(2, '0')}
          · click to view
        </span>

      </div>

    `;


    el.onclick = () => {

      openPhoto(
        memory.name,
        memory.image
      );

    };


    gallery.appendChild(el);

  });

}



/* =========================
   PHOTO FULLSCREEN
========================= */

const photoModal =
  document.getElementById('photoModal');

const photoView =
  document.getElementById('photoView');

const photoCaption =
  document.getElementById('photoCaption');


function openPhoto(name, image) {

  if (!photoModal) return;


  if (photoView) {

    photoView.innerHTML = `

      <img
        src="${image}"
        alt="${name}"
      >

    `;

  }


  if (photoCaption) {

    photoCaption.textContent = name;

  }


  photoModal.classList.add('show');


  document.body.classList.add(
    'modal-open'
  );

}


function closePhoto() {

  if (!photoModal) return;


  photoModal.classList.remove('show');


  document.body.classList.remove(
    'modal-open'
  );

}


const photoClose =
  document.querySelector(
    '[data-photo-close]'
  );


if (photoClose) {

  photoClose.onclick = closePhoto;

}



/* Klik area gelap untuk menutup */

if (photoModal) {

  photoModal.addEventListener(
    'click',
    function(e) {

      if (e.target === photoModal) {

        closePhoto();

      }

    }
  );

}



/* =========================
   LOVE LETTER MODAL
========================= */

const letterModal =
  document.getElementById(
    'letterModal'
  );

const readLetter =
  document.getElementById(
    'readLetter'
  );


if (readLetter && letterModal) {

  readLetter.onclick = () => {

    letterModal.classList.add(
      'show'
    );

    document.body.classList.add(
      'modal-open'
    );

  };

}


document
  .querySelectorAll('[data-close]')
  .forEach(button => {

    button.onclick = () => {

      if (letterModal) {

        letterModal.classList.remove(
          'show'
        );

      }

      document.body.classList.remove(
        'modal-open'
      );

    };

  });



/* =========================
   MUSIC PLAYER
========================= */

const songs = [

  [
    'Kisah Romantis',
    'Glenn Fredly'
  ],

  [
    'Risk It All',
    'Bruno Mars'
  ],

  [
    'So High School',
    'Taylor Swift'
  ],

  [
    'Denganmu Cinta',
    '—'
  ],

  [
    'Begin Again',
    'Taylor Swift'
  ],

  [
    'Hanya Untukmu',
    '—'
  ]

];


let current = 0;

let playing = false;


const title =
  document.getElementById(
    'songTitle'
  );

const artist =
  document.getElementById(
    'songArtist'
  );

const playlist =
  document.getElementById(
    'playlist'
  );

const playButton =
  document.getElementById(
    'play'
  );

const progress =
  document.getElementById(
    'progress'
  );


function renderSongs() {

  if (!playlist) return;


  playlist.innerHTML =
    songs.map((song, i) => `

      <div
        class="playlist-item
        ${i === current ? 'active' : ''}"
        data-i="${i}"
      >

        <span class="track-num">
          ${String(i + 1).padStart(2, '0')}
        </span>

        <span class="track-title">
          ${song[0]}
        </span>

        <span class="track-artist">
          ${song[1]}
        </span>

      </div>

    `).join('');


  playlist
    .querySelectorAll(
      '.playlist-item'
    )
    .forEach(item => {

      item.onclick = () => {

        current =
          Number(
            item.dataset.i
          );

        loadSong();

      };

    });

}


function loadSong() {

  if (title) {

    title.textContent =
      songs[current][0];

  }


  if (artist) {

    artist.textContent =
      songs[current][1];

  }


  if (progress) {

    progress.value = 0;

  }


  renderSongs();

}


renderSongs();



if (playButton) {

  playButton.onclick = () => {

    playing = !playing;

    playButton.textContent =
      playing
        ? '❚❚'
        : '▶';

  };

}


const previousButton =
  document.getElementById(
    'prev'
  );


if (previousButton) {

  previousButton.onclick = () => {

    current =
      (current - 1 + songs.length)
      % songs.length;

    loadSong();

  };

}


const nextButton =
  document.getElementById(
    'next'
  );


if (nextButton) {

  nextButton.onclick = () => {

    current =
      (current + 1)
      % songs.length;

    loadSong();

  };

}



/* =========================
   MOBILE MENU
========================= */

const menu =
  document.querySelector(
    '.menu'
  );

const nav =
  document.querySelector(
    'nav'
  );


if (menu && nav) {

  menu.onclick = () => {

    nav.classList.toggle(
      'open'
    );

  };


  nav
    .querySelectorAll('a')
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          nav.classList.remove(
            'open'
          );

        }
      );

    });

}



/* =========================
   ACTIVE NAVIGATION
========================= */

const links =
  [
    ...document.querySelectorAll(
      'nav a'
    )
  ];

const sections =
  [
    ...document.querySelectorAll(
      'main section'
    )
  ];


if (links.length && sections.length) {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            links.forEach(link => {

              link.classList.toggle(

                'active',

                link.getAttribute(
                  'href'
                ) ===
                '#' +
                entry.target.id

              );

            });

          }

        });

      },

      {
        rootMargin:
          '-35% 0px -55%'
      }

    );


  sections.forEach(section => {

    observer.observe(section);

  });

}



/* =========================
   KEYBOARD
========================= */

window.addEventListener(
  'keydown',
  e => {

    if (e.key === 'Escape') {

      closePhoto();


      if (letterModal) {

        letterModal.classList.remove(
          'show'
        );

      }

      document.body.classList.remove(
        'modal-open'
      );

    }

  }
);
