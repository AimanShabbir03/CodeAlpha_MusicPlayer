# 🎵 Sidecut — Music Player

A vinyl turntable-inspired music player built with plain **HTML, CSS, and JavaScript** — with full playback controls, a playlist, autoplay, and a seekable progress bar. Built as part of the **CodeAlpha Internship** (Front-End Development track).

---

## ✨ Features

- **Full audio controls** — play, pause, next, and previous
- **Spinning vinyl disc animation** that spins while a track is playing and pauses when it isn't
- **Song info display** — title, artist, and duration, updated live for every track
- **Seekable progress bar** — click or drag to jump to any point in the song, with real-time current-time display
- **Volume control** — draggable slider plus a mute/unmute button
- **Playlist** — clickable track list with an animated equalizer indicator on the currently playing song
- **Autoplay** — automatically moves to the next track when one finishes (toggleable on/off)
- **Shuffle & repeat** modes
- **Keyboard shortcuts** — `Space` to play/pause, `←`/`→` to skip tracks
- **Fully responsive** — layout adapts cleanly from desktop down to mobile

---

## 🛠️ Built With

- **HTML5** — semantic structure and the native `<audio>` element
- **CSS3** — custom properties (CSS variables), Grid/Flexbox layout, keyframe animations (vinyl spin, equalizer bars)
- **Vanilla JavaScript (ES6)** — playback logic, playlist rendering, progress/volume seeking, and keyboard event handling (no frameworks or libraries)

---

## 📁 Project Structure

```
CodeAlpha_MusicPlayer/
├── Music Player/
│   ├── index.html      # Page markup/structure
│   ├── style.css        # All styling (theme, layout, disc & control animations)
│   └── script.js        # Playback, playlist, progress bar, and volume logic
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

No build tools, no dependencies — just open it in a browser.

1. **Clone the repository**
   ```bash
   git clone https://github.com/AimanShabbir03/CodeAlpha_MusicPlayer.git
   ```
2. **Move into the music player folder**
   ```bash
   cd "CodeAlpha_MusicPlayer/Music Player"
   ```
3. **Open `index.html`**
   - Double-click the file to open it directly in your browser, **or**
   - Use a live server (e.g. the VS Code "Live Server" extension) for the best experience

That's it — no installation required. (An internet connection is needed the first time, since the demo tracks are streamed from an external source — see below.)

---

## 🎮 Usage

| Control | Action |
|---|---|
| ▶ / ⏸ | Play / pause the current track |
| ⏮ / ⏭ | Previous / next track |
| Progress bar | Click or drag to seek |
| Volume bar | Click or drag to adjust volume; speaker icon to mute |
| Playlist row | Click any track to play it immediately |
| Shuffle icon | Toggle shuffled playback |
| Repeat icon | Toggle looping the current track |
| Autoplay checkbox | Turn automatic next-track playback on/off |
| `Space` | Play / pause |
| `←` `→` | Previous / next track |

---

## 🎧 Customizing the Playlist

All track data lives in a single array near the top of `script.js`:

```js
const tracks = [
  { title: 'Night Drive', artist: 'Sidecut Ensemble', src: 'your-audio-file.mp3' },
  // ...
];
```

Replace the `src` of each entry with your own audio file's path or URL to use your own music instead of the demo tracks.

---

## 👩‍💻 Author

**Aiman Shabbir**
Software Engineer & Frontend Developer

- 📧 Email: [aimilicious02@gmail.com](mailto:aimilicious02@gmail.com)
- 💻 GitHub: [@AimanShabbir03](https://github.com/AimanShabbir03)
- 🔗 LinkedIn: [aiman-s-342390326](https://www.linkedin.com/in/aiman-s-342390326/)

---

## 📄 License

This project is open source and available for learning purposes. Feel free to fork it and build on top of it.

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
