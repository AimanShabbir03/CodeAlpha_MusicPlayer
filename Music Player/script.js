// ---------- Playlist data ----------
// Apne songs yahan add karo. Local files ke liye src me "songs/song1.mp3" jaisa path do.
const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "SoundHelix Song 4",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

// ---------- Elements ----------
const audio = document.getElementById("audio");
const disc = document.getElementById("disc");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const muteBtn = document.getElementById("mute");
const autoplayBox = document.getElementById("autoplay");
const playlistEl = document.getElementById("playlist");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const iconVolume = document.getElementById("icon-volume");
const iconMuted = document.getElementById("icon-muted");

let currentIndex = 0;
let lastVolume = 0.7;

// ---------- Helpers ----------
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + String(s).padStart(2, "0");
}

// Colours the filled part of a range slider
function setFill(slider) {
  const min = Number(slider.min) || 0;
  const max = Number(slider.max) || 100;
  const pct = ((slider.value - min) / (max - min)) * 100;
  slider.style.setProperty("--fill", pct + "%");
}

// ---------- Playlist UI ----------
function buildPlaylist() {
  playlistEl.innerHTML = "";

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "song";
    btn.dataset.index = index;
    btn.innerHTML =
      '<div><div class="song-name"></div><div class="song-artist"></div></div>' +
      '<span class="song-time">--:--</span>';
    btn.querySelector(".song-name").textContent = song.title;
    btn.querySelector(".song-artist").textContent = song.artist;

    btn.addEventListener("click", () => {
      loadSong(index);
      playSong();
    });

    li.appendChild(btn);
    playlistEl.appendChild(li);

    // Har song ki duration playlist me dikhane ke liye metadata load karo
    const probe = new Audio();
    probe.preload = "metadata";
    probe.src = song.src;
    probe.addEventListener("loadedmetadata", () => {
      btn.querySelector(".song-time").textContent = formatTime(probe.duration);
    });
  });
}

function highlightActive() {
  document.querySelectorAll(".song").forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.index) === currentIndex);
  });
}

// ---------- Audio control ----------
function loadSong(index) {
  currentIndex = (index + songs.length) % songs.length; // wrap around
  const song = songs[currentIndex];

  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";
  progress.value = 0;
  setFill(progress);
  highlightActive();
}

function playSong() {
  const attempt = audio.play();
  if (attempt !== undefined) {
    attempt.catch((err) => console.error("Playback failed:", err));
  }
}

function pauseSong() {
  audio.pause();
}

function togglePlay() {
  if (audio.paused) playSong();
  else pauseSong();
}

function nextSong() {
  const wasPlaying = !audio.paused;
  loadSong(currentIndex + 1);
  if (wasPlaying) playSong();
}

function prevSong() {
  // 3 seconds se zyada chal chuka ho to same song shuru se, warna pichla song
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  const wasPlaying = !audio.paused;
  loadSong(currentIndex - 1);
  if (wasPlaying) playSong();
}

// ---------- Play / pause UI ----------
audio.addEventListener("play", () => {
  iconPlay.hidden = true;
  iconPause.hidden = false;
  playBtn.setAttribute("aria-label", "Pause");
  disc.classList.add("playing");
});

audio.addEventListener("pause", () => {
  iconPlay.hidden = false;
  iconPause.hidden = true;
  playBtn.setAttribute("aria-label", "Play");
  disc.classList.remove("playing");
});

// ---------- Duration + progress ----------
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progress.value = (audio.currentTime / audio.duration) * 100;
  setFill(progress);
});

// Seek: slider drag karne par song us jagah se chalega
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
  setFill(progress);
});

// ---------- Autoplay ----------
audio.addEventListener("ended", () => {
  if (autoplayBox.checked) {
    loadSong(currentIndex + 1);
    playSong();
  } else {
    audio.currentTime = 0;
    progress.value = 0;
    setFill(progress);
  }
});

audio.addEventListener("error", () => {
  titleEl.textContent = "Song load nahi ho saka";
  artistEl.textContent = "Path ya internet connection check karo";
});

// ---------- Volume ----------
function updateVolumeIcon() {
  const muted = audio.muted || audio.volume === 0;
  iconVolume.hidden = muted;
  iconMuted.hidden = !muted;
}

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
  audio.muted = audio.volume === 0;
  if (audio.volume > 0) lastVolume = audio.volume;
  setFill(volume);
  updateVolumeIcon();
});

muteBtn.addEventListener("click", () => {
  if (audio.muted || audio.volume === 0) {
    audio.muted = false;
    audio.volume = lastVolume;
    volume.value = lastVolume;
  } else {
    audio.muted = true;
    volume.value = 0;
  }
  setFill(volume);
  updateVolumeIcon();
});

// ---------- Button events ----------
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// ---------- Init ----------
audio.volume = Number(volume.value);
setFill(volume);
setFill(progress);
buildPlaylist();
loadSong(0);
