
var button = document.getElementById('button');
var play = document.getElementById('play');
var svg1 = document.getElementById('heart');
var svg2 = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id="greenheart" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>';
var heartState = 1;
var svg3 = document.getElementById('playsvg');
var svg4 = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/></svg>';
var playState = 1;

function togglePlay() {
if (playState === 1) {
    play.innerHTML = svg4;
    playState = 2;
    song.play();
} else {
    play.innerHTML = '<svg id="playsvg" xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/></svg>';
    playState = 1;
    song.pause();
}
}

const songName = document.getElementById('songName');
const bandName = document.getElementById('bandName');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const playButton = document.getElementById('play');
const currentProgress = document.getElementById('currentProgress');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('currenttime');
const totalTime = document.getElementById('totallength');

const aRandomPieceOfCheesePlease = {
  songName: 'A Random Piece Of Cheese Please',
  bandName: 'Alfred Grupstra',
  file: 'a-random-piece-of-cheese-please',
  cover: 'ARPOCP',
  liked: false,
}
const twoMinuteBanger = {
  songName: '2 Minute Banger',
  bandName: 'Lesiakower',
  file: '2-minute-banger',
  cover: '2MB',
  liked: false,
}
const airFlight = {
  songName: 'Air Flight',
  bandName: 'BeCorbal',
  file: 'air-flight',
  cover: 'AF',
  liked: false,
}
const funkyTime = {
  songName: 'Funky Time',
  bandName: 'Lesiakower',
  file: 'funky-time',
  cover: 'FT',
  liked: false,
}
const myUniverse = {
  songName: 'My Universe',
  bandName: 'Nesterouk',
  file: 'my-universe',
  cover: 'MU',
  liked: false,
}

let isShuffled = false;
let loop = false;
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? 
  [aRandomPieceOfCheesePlease, 
  twoMinuteBanger, 
  airFlight, 
  funkyTime, 
  myUniverse];
let sortedPlaylist = [...playlist];
let index = 0;

function initializeSong() {
  cover.src = `images/${sortedPlaylist[index].cover}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].bandName;
  likeButtonRender()
  localStorage.setItem('playlist', JSON.stringify(playlist));
}

function previousSong() {
  index = (index - 1 + sortedPlaylist.length) % sortedPlaylist.length;
  initializeSong();
  togglePlay();
  togglePlay();
}

function nextSong() {
  index = (index + 1) % sortedPlaylist.length;
  initializeSong();
  togglePlay();
  togglePlay();
  progress.style.setProperty('--progress', `${barWidth}%`)
}

function updateProgress() {
  const barWidth = (song.currentTime/song.duration)*100;
  progress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function togles() {
const body = document.body;
body.classList.toggle('darkred');
const img = document.getElementById('cover');
img.classList.toggle('border2');
}

function shuffleButtonClicked() {
  if(isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.remove('icon');
    shuffleButton.classList.add('green');
  }
  else {
    isShuffled = false;
    sortedPlaylist = [...playlist];
    shuffleButton.classList.remove('green');
    shuffleButton.classList.add('icon');
  }
}

function shuffleArray(preShuffleArray) {
  let size = sortedPlaylist.length;
  let currentIndex = size -1;
  while (currentIndex > 0){
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function repeatButtonClicked() {
  if(song.loop === false) {
    song.loop = true;
    repeatButton.classList.remove('icon');
    repeatButton.classList.add('green');
  }
  else {
    song.loop = false;
    repeatButton.classList.remove('green');
    repeatButton.classList.add('icon');
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - (hours * 3600)) / 60);
  let secs = Math.floor(originalNumber - (hours * 3600) - (min * 60));
  return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id="greenheart" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>';
    heartState = 2;
  } else {
    button.innerHTML = '<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg>'; // Default heart SVG
    heartState = 1;
  }
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(playlist));
}

initializeSong()

play.addEventListener('click', togglePlay);
button.addEventListener('click', likeButtonClicked);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateTotalTime);
a.addEventListener('click', togles);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);