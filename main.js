const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const volumeSlider = document.querySelector(".volume-slider");
const seekSlider = document.querySelector(".seek-slider");
const coverImage = document.querySelector(".cover-img");
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");
const singerName = document.querySelector(".singer-name");
const musicName = document.querySelector(".music-name");

// LIST OF OUR MUSICS INFORMATION
const playList = [
  {
    singerName: "Shayea",
    musicName: "Telo",
    audioSrc: "./assets/1-music.mp3",
    coverSrc: "./assets/1-cover.jpg",
  },
  {
    singerName: "Remix",
    musicName: "Khake sorkh",
    audioSrc: "./assets/2-music.mp3",
    coverSrc: "./assets/2-cover.jpg",
  },
  {
    singerName: "Haamim",
    musicName: "Khorshido Mah",
    audioSrc: "./assets/3-music.mp3",
    coverSrc: "./assets/3-cover.jpg",
  },
];

let currentIndex = 0;
let isPlaying = false;

// LOAD CURRENT MUSIC
const loadAudio = () => {
  const track = playList[currentIndex];
  coverImage.src = track.coverSrc;
  singerName.textContent = track.singerName;
  musicName.textContent = track.musicName;
  audio.src = track.audioSrc;

  if (isPlaying) {
    audio.play();
    coverImage.classList.add("cover-animation");
  }
};

// PLAY AND PAUSE MUSIC
playPauseButton.addEventListener("click", () => {
  const playPauseIcon = playPauseButton.firstElementChild;

  if (isPlaying) {
    audio.pause();
    coverImage.classList.remove("cover-animation");
    playPauseIcon.classList.replace("fa-pause", "fa-play");
  } else {
    audio.play();
    coverImage.classList.add("cover-animation");
    playPauseIcon.classList.replace("fa-play", "fa-pause");
  }

  isPlaying = !isPlaying;
});

// HANDLE MUSIC SOUNDS
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// seek to current of music
seekSlider.addEventListener("input", () => {
  const newTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = newTime;
});

// load next music
nextButton.addEventListener("click", () => {
  currentIndex += 1;
  if (currentIndex > playList.length - 1) {
    currentIndex = 0;
  }

  playPauseButton.firstElementChild.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
  loadAudio();
});

// load previous music
prevButton.addEventListener("click", () => {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = playList.length - 1;
  }

  playPauseButton.firstElementChild.classList.replace("fa-play", "fa-pause");
  isPlaying = true;

  loadAudio();
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const totalTime = audio.duration;

  const percentage = (currentTime / totalTime) * 100;
  if (percentage) {
    seekSlider.value = percentage;
  }
  if (currentTime && totalTime) {
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(totalTime);
  }

  currentTime.display;
});

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // 0:08
};
formatTime(120);

// reset music information when audio end
audio.addEventListener("ended", () => {
  isPlaying = false;
  playPauseButton.firstElementChild.classList.replace("fa-pause", "fa-play");
});

// LOAD INITIALY MUSIC
loadAudio();
