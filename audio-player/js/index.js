console.log("I'm here");

let iCur = 0;
let isPause = true;
let isOn = true;
let prevVol;

const audio = document.querySelector('audio');
let playButton = document.querySelector('#play');
let volButton = document.querySelector('#vol');
let stopButton = document.querySelector('.stop');
let volume = document.querySelector('.volume');
let duration = document.querySelector('.duration');
let current = document.querySelector('.current');
let total = document.querySelector('.total');
let artist = document.querySelector('.artist');
let song = document.querySelector('.song');
let tostart = document.querySelector('.tostart');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

let arr = [['assets/mp3/inna-hot.mp3', '03:35', 'Inna', 'Hot', 'img1'], 
           ['assets/mp3/sting-the-windmills-of-your-mind.mp3', '04:18', 'Sting', 'The Windmills of Your Mind' , 'img2'],
           ['assets/mp3/oceana-endless-summer-uefa-euro-2012.mp3', '03:12', 'Oceana', 'Endless Summer' , 'img3'],
           ['assets/mp3/mika-relax-take-it-easy.mp3', '03:41', 'Mika', 'Relax, Take It Easy' , 'img3'],
           ['assets/mp3/minelli-rampampam.mp3', '03:20', 'Minelli', 'Rampampam' , 'img3'],
           ['assets/mp3/kylie-minogue-can-not-get-you-out-of-my-head.mp3', '03:47', 'Kylie Minogue', "Can't Get You Out Of My Head", 'img3'],
           ['assets/mp3/luis-fonsi-feat-daddy-yankee-despacito.mp3', '03:48', 'Luis Fonsi feat. Daddy Yankee', 'Despacito' , 'img3']];

playButton.addEventListener("click", () => {play()});
stopButton.addEventListener("click", () => {stop()});
volButton.addEventListener("click", () => {vol()});
volume.addEventListener("change", (el) => {setVolume(el.target.value);});
duration.addEventListener("change", () => { setCurrent();});
tostart.addEventListener("click", () => { audio.currentTime = 0;});
audio.addEventListener('volumechange',() => {volume.value = audio.volume * 100;});
audio.addEventListener('ended',() => {next.click();});
audio.addEventListener('timeupdate', () => { timeUpdate(); });

window.onload = myinit();

function myinit(){
  audio.src = arr[iCur][0];
  total.textContent = arr[iCur][1]; 
  artist.textContent = arr[iCur][2];
  song.textContent = arr[iCur][3];
}

next.addEventListener("click", () => {iCur ++; if (iCur >= arr.length) {iCur = 0};   audio.currentTime = 0;
 audio.src = arr[iCur][0];  
  playAudio();

});

prev.addEventListener("click", () => {iCur --; if (iCur < 0) {iCur = arr.length - 1};   audio.currentTime = 0;
audio.src = arr[iCur][0];    playAudio();

});

function setCurrent(){
  audio.currentTime = audio.duration * duration.value / 100;
}

function timeUpdate(){
  duration.value = audio.currentTime * 100 /audio.duration;
  current.textContent = convertTime(audio.currentTime);
}

function play(){
  if (isPause == true) {playAudio();} else {pauseAudio();}
}

function vol(){
  if (isOn == true) {volOff();} else {volOn();}
}

function volOff(){
  prevVol = volume.value; 
  setVolume(0);
}

function volOn(){
  setVolume(prevVol);
}

function setVolume(el){
  volume.value = el;
  audio.volume = el / 100;
  if (el == 0) {
    volButton.classList.remove('on');
    volButton.classList.add('off');
    isOn = false;
    volButton.title = 'Unmute';
  }
  else {
    volButton.classList.remove('off');
    volButton.classList.add('on');  
    isOn = true;
    volButton.title = 'Mute';
  }
}

function playAudio() {
  document.querySelector('body').style.backgroundImage = `url('assets/alb/${iCur}/0.jpg')`;
  document.querySelector('.alb').srcset = `assets/alb/${iCur}/1.jpg`;
  if (isPause == false) {audio.currentTime = 0;}
  isPause = false;
  total.textContent = arr[iCur][1]; 
  artist.textContent = arr[iCur][2];
  song.textContent = arr[iCur][3];
  audio.play();
  playButton.classList.remove('playp');
  playButton.classList.remove('play');
  playButton.classList.add('pause');
  playButton.title = 'Pause';
}

function pauseAudio() {

  audio.pause();
  isPause = true;
  playButton.classList.remove('pause');
  playButton.classList.add('playp'); 
  playButton.title = 'Play';
}

function stop() {
  audio.pause();
  audio.currentTime = 0;
  isPause = true;
  playButton.classList.remove('playp');
  playButton.classList.remove('pause');
  playButton.classList.add('play');  
  playButton.title = 'Play'; 
}


function convertTime(time) {
  let min = Math.trunc(time / 60).toString().padStart(2, '0');
  let sec = Math.floor(time % 60).toString().padStart(2, '0');
  return min + ':'+ sec;
}
