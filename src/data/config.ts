// ================================================
// KONFIGURASI UTAMA - Edit file ini untuk menyesuaikan
// ================================================

export const config = {
  // === NAMA ===
  partnerName: 'Sayang', // Ganti dengan nama pacar kamu
  myName: 'Muhammad Syahmi Ash Shidqi',      // Ganti dengan nama kamu

  // === LOVE LETTER ===
  loveLetter: {
    opening: 'Dear Egic Rahma Yunita,',
    body: [
      'Happy Birthday sayang ❤️',
      '',
      'Terima kasih sudah menjadi bagian terindah dalam hidupku. Setiap hari bersamamu adalah hadiah yang paling berharga.',
      '',
      'Terima kasih untuk semua cerita, tawa, dan waktu yang sudah kita lewati bersama. Kamu membuatku sadar bahwa hidup harus terus diperjuangkan meski sudah ditakdirkan.',
      '',
      'Semoga kamu selalu bahagia, sehat, semua impianmu tercapai dan kita bisa terus bersama. Di hari spesialmu ini, aku hanya ingin kamu tahu betapa berartinya kamu bagiku.',
      '',
      'Selamat ulang tahun babeyyy, kamu adalah seseorang yang membuatku lebih berwarna.',
    ],
    closing: 'With all my love,',
    image: '/images/signa.webp',
    signature: 'Muhammad Syahmi Ash Shidqi',
  },

  // === JOURNEY / TIMELINE ===
  journey: [
    {
      year: '2025',
      title: 'First Time We Met',
      description: 'Awal dari cerita kita dimulai. Saat pertama kali melihatmu, kamu menarik perhatianku.',
      emoji: '⛰️',
      image: '/images/journey-1.webp', // Ganti dengan foto asli
    },
    {
      year: '2025',
      title: 'Our First Date',
      description: 'Momen yang tidak akan pernah aku lupakan. Kamu tersenyum dan duniaku berubah.',
      emoji: '💨',
      image: '/images/journey-2.webp',
    },
    {
      year: '2025',
      title: 'Our Favorite Memories',
      description: 'Banyak cerita indah yang kita buat bersama. Setiap momen bersamamu adalah kenangan yang berharga.',
      emoji: '🤓',
      image: '/images/journey-3.webp',
    },
    {
      year: '2026',
      title: 'Your Special Day',
      description: 'Hari dimana aku ingin membuatmu tersenyum, tertawa, dan merasa betapa istimewanya dirimu.',
      emoji: '🎂',
      image: '/images/journey-4.webp',
    },
  ],

  // === GALLERY MEMORIES ===
  memories: [
    { id: 1, category: 'First Moment', image: '/images/memory-1.webp', caption: 'Awal segalanya' },
    { id: 2, category: 'Our Date', image: '/images/memory-2.webp', caption: 'Date pertama kita' },
    { id: 3, category: 'Random Memories', image: '/images/memory-3.webp', caption: 'Bermalam dikopken' },
    { id: 4, category: 'Favorite Photos', image: '/images/memory-4.webp', caption: 'Harus aku yang di sampingmu' },
    { id: 5, category: 'Our Date', image: '/images/memory-5.webp', caption: 'Tiba-tiba Bonbin' },
    { id: 6, category: 'Random Memories', image: '/images/memory-6.webp', caption: 'Selalu ada cerita' },
    { id: 7, category: 'Favorite Photos', image: '/images/memory-7.webp', caption: 'Senyummu yang terindah' },
    { id: 8, category: 'First Moment', image: '/images/memory-8.webp', caption: 'After confess' },
  ],

  // === REASONS I LOVE YOU ===
  reasons: [
    { id: 1, back: 'Aku suka caramu selalu peduli dengan hal kecil yang sering orang lain abaikan.' },
    { id: 2, back: 'Kamu adalah kamu. Dengan segala kelebihan, kekurangan, dan keunikanmu.' },
    { id: 3, back: 'Caramu menjelaskan suatu hal dan bercerita.' },
    { id: 4, back: 'Menggemaskan, rupamu dalah hal pertama yang ingin aku lihat setiap pagi.' },
    { id: 5, back: 'Setiap percakapan denganmu selalu ada saja hal yang membuatku tertawa.' },
    { id: 6, back: 'Kemandirianmu dalam menjalani hari-harimu.' },
    { id: 7, back: 'Kamu mengubah caraku memandang dunia.' },
    { id: 8, back: 'Kamu membuat hal-hal sederhana menjadi sangat berarti dan bermakna.' },
    { id: 9, back: 'Bersamamu, hariku lebih berwarna.' },
    { id: 10, back: 'Bersamamu, aku merasa menjadi versi terbaik dari diriku sendiri.' },
  ],

  // === PLAYLIST ===
  playlist: [
    {
      title: 'Lagu Pertama Kita',
      artist: 'Raim Laode',
      duration: '3:46',
      cover: '/images/raim.jpg',
      url: '/music/Raim.mp3', // Ganti dengan URL lagu
    },
    {
      title: 'Lagu Favoritmu',
      artist: 'Tulus',
      duration: '3:57',
      cover: '/images/tulus.jpg',
      url: '/music/TULUS.mp3',
    },
    {
      title: 'Lagu yang Mengingatkanku Padamu',
      artist: 'Nuh...',
      duration: '3:16',
      cover: '/images/mia.jpg',
      url: '/music/Teruntuk-Mia.mp3',
    },
  ],

  // === VIDEO ===
  videoUrl: '/video/dokumenter-kita.mp4', // Ganti dengan URL video kamu
  videoThumbnail: '/images/cover-vid.png',

  // === GIFT BOX MESSAGE ===
  giftMessage: 'My biggest gift is having you in my life ❤️',
  gifts: [
    { emoji: '👚', label: 'Pakaian', message: 'Supaya setiap kamu memakainya, kamu ingat betapa cantiknya dirimu' },
    { emoji: '🎐', label: 'Kipas', message: 'Untuk menemani hari-harimu yang panas, seperti aku yang selalu menemanimu' },
    { emoji: '🧰', label: 'P3K', message: 'Karena aku ingin kamu selalu aman dan terjaga, di mana pun kamu berada' },
  ],

  // === BACKGROUND MUSIC ===
  backgroundMusic: '/music/background.mp3', // Ganti dengan musik yang diinginkan
};

export type Config = typeof config;
