console.log("Вёрстка +10");
console.log("Кнопка Play/Pause +10");
console.log("При кликах по кнопкам 'Вперёд' и 'Назад' переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10");
console.log("При смене аудиотрека меняется изображение - обложка аудиотрека +10");
console.log("Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10");
console.log("Отображается продолжительность аудиотрека и его текущее время проигрывания +10");
console.log("Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

let iCur = 0;
let isPause = true;
let isList = false;
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
let list = document.querySelector('.list');
let items ;

let arr = [['assets/mp3/inna-hot.mp3', '03:35', 'Inna', 'Hot', 'img1'], 
           ['assets/mp3/sting-the-windmills-of-your-mind.mp3', '04:18', 'Sting', 'The Windmills of Your Mind' , 'img2'],
           ['assets/mp3/oceana-endless-summer-uefa-euro-2012.mp3', '03:12', 'Oceana', 'Endless Summer' , 'img3'],
           ['assets/mp3/mika-relax-take-it-easy.mp3', '03:41', 'Mika', 'Relax, Take It Easy' , 'img3'],
           ['assets/mp3/minelli-rampampam.mp3', '03:20', 'Minelli', 'Rampampam' , 'img3'],
           ['assets/mp3/kylie-minogue-can-not-get-you-out-of-my-head.mp3', '03:47', 'Kylie Minogue', "Can't Get You Out Of My Head", 'img3'],
           ['assets/mp3/luis-fonsi-feat-daddy-yankee-despacito.mp3', '03:48', 'Luis Fonsi feat. Daddy Yankee', 'Despacito' , 'img3'],
           ['assets/mp3/britney-spears-3.mp3', '03:23', 'Britney Spears', '3', 'img3'],
           ['assets/mp3/basic-element-touch-you-right-now.mp3', '03:14', 'Basic Element', 'Touch You Right Now', 'img3'],
           ['assets/mp3/lady-gaga-bad-romance.mp3', '04:21', 'Lady Gaga', 'Bad Romance', 'img3'],
           ['assets/mp3/the-offspring-want-you-bad.mp3', '03:22', 'The Offspring', 'Want You Bad', 'img3'],
           ['assets/mp3/kesha-tik-tok.mp3', '03:21', 'Ke$ha', 'TiK ToK', 'img3'],
           ['assets/mp3/shakira-whenever-wherever.mp3', '03:17', 'Shakira', 'Whenever, Wherever', 'img3']
          ];

    
playButton.addEventListener("click", () => {play()});
stopButton.addEventListener("click", () => {stop()});
volButton.addEventListener("click", () => {vol()});
volume.addEventListener("change", (el) => {setVolume(el.target.value);});
duration.addEventListener("change", () => { setCurrent();});
tostart.addEventListener("click", () => { audio.currentTime = 0;});
list.addEventListener("click", () => {showlist()});
audio.addEventListener('volumechange',() => {volume.value = audio.volume * 100;});
audio.addEventListener('ended',() => {next.click();});
audio.addEventListener('timeupdate', () => { timeUpdate(); });

window.onload = myinit();

function myinit(){
  audio.src = arr[iCur][0];
  audio.currentTime = 0;
  total.textContent = arr[iCur][1]; 
  artist.textContent = arr[iCur][2];
  song.textContent = arr[iCur][3];
  addList();
  items = document.querySelectorAll('.item')
  items.forEach(link => link.addEventListener('click', (el) => {
    if (iCur == Array.prototype.indexOf.call(items, el.target)){
      return;
    }
    iCur = Array.prototype.indexOf.call(items, el.target);
    audio.currentTime = 0;
    audio.src = arr[iCur][0];  
    playAudio();
  }));  

  selectCurrentItem();
}

function addList(){
  let list = document.querySelector("ul");
  let newNode;
  let elemText;
  let newSpan;
  let spanText;
  for (let li = 0; li < arr.length; li++){
    newNode = document.createElement("li");
    newNode.classList.add('item');
    elemText = document.createTextNode(arr[li][2] + ' - ' + arr[li][3]);
    newNode.appendChild(elemText);
    newSpan = document.createElement('span');
    newSpan.classList.add('list_time');
    spanText = document.createTextNode(arr[li][1]);
    newSpan.appendChild(spanText);
    newNode.appendChild(newSpan);
    list.appendChild(newNode);
  }
}

function showlist(){
  isList = !isList;
  list.classList.toggle('liston');
  document.querySelector('.player').style.width = (isList ? '800px' : '400px');
  document.querySelector('.player_list').style.opacity  = (isList ? '0.6' : '0');
}



next.addEventListener("click", () => {iCur ++; if (iCur >= arr.length) {iCur = 0};   audio.currentTime = 0;
  audio.src = arr[iCur][0];  
  playAudio();
});

prev.addEventListener("click", () => {iCur --; if (iCur < 0) {iCur = arr.length - 1};   audio.currentTime = 0;
  audio.src = arr[iCur][0];
  playAudio();
});

function selectCurrentItem(){
  let elements =  document.querySelectorAll('.item');
  for (let li = 0; li < elements.length; li ++){
      elements[li].style.opacity = (li == iCur ? 1 : 0.6);
  }
}

function setCurrent(){
  audio.currentTime = audio.duration * duration.value / 100;
}

function timeUpdate(){
  if (audio.duration > 0 ) {
    duration.value = audio.currentTime * 100 /audio.duration; 
  }
  else {
    duration.value = 0;
  }
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
  } else {
    volButton.classList.remove('off');
    volButton.classList.add('on');  
    isOn = true;
    volButton.title = 'Mute';
  }
}

function playAudio() {
  document.querySelector('body').style.backgroundImage = `url('assets/alb/${iCur}/0.jpg')`;
  document.querySelector('.alb').srcset = `assets/alb/${iCur}/1.jpg`;
  selectCurrentItem();
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
