# 🎂 Birthday Website - Digital Love Story

Website ulang tahun romantis yang dibuat khusus dengan konsep "Digital Love Story".

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## ✏️ Cara Kustomisasi

Semua konfigurasi utama ada di satu file:

### `src/data/config.ts`

```ts
// Ganti nama
partnerName: 'Sayang',   // ← nama pacar kamu
myName: 'Syahmi',        // ← nama kamu

// Ganti isi love letter
loveLetter: { ... }

// Ganti timeline perjalanan
journey: [ ... ]

// Ganti alasan
reasons: [ ... ]

// Ganti playlist
playlist: [ ... ]
```

## 📁 Tambah Media

### Foto (Memories & Journey)
Taruh di folder `/public/images/`:
```
memory-1.jpg, memory-2.jpg, ...   (galeri memori)
journey-1.jpg, journey-2.jpg, ...  (foto timeline)
album-1.jpg, album-2.jpg, ...      (cover lagu)
```

### Musik
Taruh di `/public/music/`:
```
background.mp3    ← musik background
song1.mp3
song2.mp3
song3.mp3
```

### Video
Taruh di `/public/video/`:
```
message.mp4    ← video pesan kamu
```

## 🎨 Sections

1. **Hero** - Opening dengan typing animation & floating hearts
2. **Love Letter** - Surat cinta dengan envelope animation  
3. **Journey** - Timeline perjalanan hubungan
4. **Memories** - Gallery foto dengan masonry layout & lightbox
5. **Reasons** - Card flip interaktif "10 alasan aku mencintaimu"
6. **Video Message** - Video player custom
7. **Playlist** - Mini Spotify-style player
8. **Gift Box** - Ending dengan confetti & pesan rahasia

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## 📱 Responsive

✅ Mobile (360px+)
✅ Tablet (768px+)  
✅ Desktop (1280px+)
