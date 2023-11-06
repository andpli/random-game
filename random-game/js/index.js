/*
console.log("Вёрстка +10 ");
console.log("Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10");
console.log("Реализовано завершение игры при достижении игровой цели +10");
console.log("По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10");
console.log("Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10");
console.log("Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10");
console.log("Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");
*/
var modalRegister = document.querySelector("#modalRegister");
var str = '';
var keys = [];
var modalBack = document.querySelector(".modal-background");
var up = document.querySelector("#up");
var ru = document.querySelector("#ru");
var eng = document.querySelector("#eng");
var ABC = '';
getABC();
 
let score = 0;
let time = 0;
let game = null;
let enemy = null;
let btn =document.querySelector("#start");
let bgColor = 'lightgoldenrodyellow';

class Ship {
    constructor (x, y, color) {
      this.x = x
      this.y = y
      this.color = color
      this.width = 50
      this.height = 40
      this.show();
      this.moveId = null;
      this.pause = false;
      this.step = 0;
    }

    show(){
        context.drawImage(this.color,this.x,this.y);
    }

    fire() {
      if (Math.floor(Math.random() * 50) != 0) return;  
      let bomb = new Ball(this.x + this.width/2,this.y + this.height + 10, 'black');
      bomb.move(Math.floor(Math.random() * 2) + 1, myships);
    }
    pause(){
      this.pause = true;
    }

    go(){
        this.pause = false;
    }

    stop(){
        this.pause = true;
        clearInterval(this.moveId);
    }

    move(step) {
     //  console.log(`step1 ${step}`);
        this.step = (Math.floor(Math.random() * 3) + 1) * step;
       // console.log(`step2 ${this.step}`);
        this.moveId = setInterval(() => {
            if (this.pause) return;
            this.fire();
            context.drawImage(white,this.x,this.y);
            this.x += this.step; 
            context.drawImage(this.color,this.x,this.y);

                if (this.x > canvas.width && step > 0) { 
                    this.x= -70;
                    this.step = (Math.floor(Math.random() * 3) + 1) * step;
                //    console.log(`step3 ${this.step}`);
                } 

                if (this.x < -150 && step < 0) { 
                    this.x= w+70;
                    this.step = (Math.floor(Math.random() * 3) + 1) * step;
                  //  console.log(`${this.x} step3 ${this.step}`);
                } 


          }, 10); 
    }

    kill(x,y,step) {
        this.pause = true;
        context.drawImage(flash,x-20,y-20);
        setTimeout(() => {   
            context.drawImage(flash,this.x,this.y+10);
            context.drawImage(flash,this.x+20,this.y+10);
            score++;
            showScore(score);
        }, 200);

        setTimeout(() => {   
            context.fillStyle = bgColor;
            context.fillRect(this.x-15, this.y-15, this.width+35, this.height+30);
            this.x= -70;
            this.pause = false;
           // this.step = (Math.floor(Math.random() * 3) + 1) * step;
          //  console.log(`step4 ${this.step}`);
           // this.move(1);
        }, 1000);
    }
}

class MyShip extends Ship{
      fire() {
        if (this.pause) return;
        let boom = new Audio('assets/audio/boom.mp3');
        boom.play();
        let bomb = new EnemyBall(this.x + this.width/2, this.y+5, 'red');
        bomb.move(-2, enemies);
      }

      move(step) {
              if (this.pause) return;
              context.drawImage(white, this.x, this.y);
              this.x += step; 
              if (this.x <= 0) {this.x = 0};
              if (this.x >= canvas.width - 50) {this.x = canvas.width - 50};
              context.drawImage(this.color, this.x, this.y);
 
            
      }

      kill(x,y) {
        time = 1;
        enemies.forEach((el) => el.stop());
        this.stop();
        context.drawImage(flash, x-20, y-20);
        setTimeout(() => {   
            context.drawImage(flash, this.x, y-10);
            context.drawImage(flash, this.x+20, y-10);
        }, 200);

       // clearAll(5000);
    }
}

class Ball {
    constructor (x, y, color) {
      this.x = x
      this.y = y
      this.color = color
      this.r = 3
      this.show()
    }

    show(){

    }
    checkHeight(y){
       return  this.y > y && this.y < y + 40;
      //  return (this.y > canvas.height - 40 && this.y < canvas.height) 
    }
    move(step, ships) {

        context.beginPath();
        context.strokeStyle = this.color;
        context.arc(this.x, this.y, this.r, 0,  Math.PI *2 );
        context.stroke();

        const moveId = setInterval(() => {

            context.beginPath();
            context.fillStyle = bgColor;
            context.fillRect(this.x - 2* this.r, this.y - 2* this.r,this.r *4 , this.r *4 );
            this.y += step; 
            context.beginPath();
            context.strokeStyle = this.color;
            context.arc(this.x, this.y, this.r, 0,  Math.PI *2 );
            context.stroke();
            
            for (let ship of ships){
                if (( this.checkHeight(ship.y)  
                    && this.x >= ship.x && this.x <= ship.x + 50) && ship.pause != true)
                {
                ship.kill(this.x, this.y);
                let bah = new Audio('assets/audio/bah.mp3');
                bah.play();
                clearInterval(moveId);
                }
            }
            if (time == 0 || this.y > canvas.height + this.r) { 
                clearInterval(moveId);  //stop
               
            }
          }, 10); 
    }
}


class EnemyBall extends Ball{
 //   checkHeight(tt){
  //      console.log(tt);
 //       return (this.y > 0 && this.y < 40) 
 //    }
}

function getRandomKey(){
  if (ABC == 2) return;
  const randomIndex = Math.floor(Math.random() * keys.length);
  document.querySelector(".key").textContent = `Выстрел: ${keys[randomIndex]}`;
  return keys[randomIndex];
}




let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 250;
let w = canvas.width;
let h = canvas.height ;
var blue = document.getElementById("blue");
var red = document.getElementById("red");
var white = document.getElementById("white");
var flash = document.getElementById("flash");
let arr = [];
showResults();
let key = '';

let enemyShip = null;
let playerShip = null;
let enemies = [];
let myships = [];
var width = window.innerWidth;
var height = window.innerHeight;

btn.addEventListener('click', () =>{
    openModal(modalRegister); 

    if (time != 0) return;

    width = window.innerWidth;
    height = window.innerHeight;

    window.resizable = false;
      
  //const str = ;
//0123456789
    str = ABC == 0 ? 'abcdefghijklmnopqrstuvwxyz' : 'йфяцычувскамепинртгоьшлбщдзэхъ';
    keys = [...str];
    key = getRandomKey(); 
    playerShip = null;
    myships = [];
    score = 0; showScore(score);
    time = 99; showTime(time);
    enemies = [];
/*
    enemyShip = new Ship(-50, 0, red);
    enemies.push(enemyShip);
    enemyShip.move(1);
*/

    for (let li = 0; li < Number(document.querySelector("#qty").value); li++){
        enemyShip = new Ship(-Math.floor(Math.random() * 100) - 50, 
            Math.floor(Math.random() * 100) , Math.floor(Math.random()*2) == 0 ? red : blue);
        enemies.push(enemyShip);
        enemyShip.move(Math.floor(Math.random()*2) == 0 ? -1 : 1);
    }
    /*  
    let enemyShip1 = new Ship(-200, 30, blue);
    enemies.push(enemyShip1);
    enemyShip1.move(-1);

    enemyShip1 = new Ship(-100, 60, red);
    enemies.push(enemyShip1);
    enemyShip1.move(1);

    enemyShip1 = new Ship(-250, 30, blue);
    enemies.push(enemyShip1);
    enemyShip1.move(-1);

    enemyShip1 = new Ship(-150, 60, red);
    enemies.push(enemyShip1);
    enemyShip1.move(1); */
    if (myships.length === 0) {
        playerShip = new MyShip(Math.floor(w / 2),h - enemyShip.height - 5, blue);
        myships.push(playerShip);
    } else myships.forEach((el) => el.show());
    game = setInterval(function(){
        if (time == 12) {
            let ten = new Audio('assets/audio/10.mp3');
            ten.play();
        }

        time--;
        showTime(time);
        
        if (time <= 0) { clearInterval(game); 
            enemies.forEach((el) => el.stop());
            clearAll(1000); 
            
        }
     }, 1000);

});


let k = {};
document.addEventListener('keydown', function(e){
    if (time == 0) return;
    k[e.code] = true;
    if (e.key == 'ArrowUp' && ABC == 2){myships.forEach((el) => el.fire())}
    if (e.key.toLowerCase() == key) {

        playerShip.fire();
        key = getRandomKey();
    }
});

document.addEventListener('keyup', function(e){
    k[e.code] = false;
});

function animate() {
    requestAnimationFrame(animate);
    
    if (k.ArrowLeft) {myships.forEach((el) => el.move(-3))}
    if (k.ArrowRight) {myships.forEach((el) => el.move(3))}
 //   if (k.ArrowUp) {myships.forEach((el) => el.fire())}
    

    }
    animate();
    

/*
document.addEventListener('keydown', function(e){
    console.log(e);

    if (time == 0) return;

    if (e.key == 'ArrowLeft'){myships.forEach((el) => el.move(-5))}
    if (e.key == 'ArrowRight'){myships.forEach((el) => el.move(5))}
    if (e.key == 'ArrowUp'){myships.forEach((el) => el.fire())}
    if (e.key == 'ArrowDown'){
       // enemies.forEach((el) => el.stop());
     //  playerShip = new MyShip(Math.floor(w / 2),h - enemyShip.height - 5, blue);
     //  myships.push(playerShip);
    }
    if (e.key == key) {
        playerShip.fire();
        key = getRandomKey();
    }
})
*/


function clearAll(delay){
    saveResults();

    setTimeout(() => {   
        context.fillStyle = bgColor;
        context.fillRect(0, 0, w, h);
        endgame();
    }, delay);

}

function showScore(value){
    document.querySelector(".score").textContent = `Убито: ${value}`;
}

function showTime(value){
   document.querySelector(".time").style.color =  (value < 11) ? 'red' : 'white';
    document.querySelector(".time").textContent = `Осталось: ${value} сек`;
} 


function clickOpen() {

        openModal(modalRegister); 
      
  
  }

  function openModal(modal) {
    modal.classList.add("show");
    modalBack.classList.add("show");
   
}

function endgame(){
    alert("Ваш результат: " + score + (score == 0 ? " - Увы :( Попробуйте еще раз." : score > 10 ? " - Отлично!" : score > 5 ? " - Хорошая попытка!" : " - Могло быть и лучше :("))
    modalRegister.classList.remove("show");
    modalBack.classList.remove("show");
    document.querySelector(".time").textContent = ``;
    document.querySelector(".score").textContent = ``;
    document.querySelector(".key").textContent = ``;

   


}

function getABC(){
    if (localStorage.getItem('currentABC') === null) {
      ABC = 0;
      setABC();
    }
    else ABC = localStorage.getItem('currentABC');

   setTimeout(() => {   
        if (ABC == 0) {eng.click();} else if (ABC == 1) {ru.click();} else  up.click();
    }, 10);

    return ABC;
  }
  
  function setABC(){
    localStorage.setItem('currentABC', ABC);
  }

  eng.addEventListener('click', () =>{
    ABC = 0;
    setABC();
    eng.srcset = `assets/icons/eng-on.png`;
    ru.srcset = `assets/icons/ru-off.png`;
    up.srcset = `assets/icons/up-off.png`;
  })

  ru.addEventListener('click', () =>{
    ABC = 1;
    setABC();
    ru.srcset = `assets/icons/ru-on.png`;
    eng.srcset = `assets/icons/eng-off.png`;
    up.srcset = `assets/icons/up-off.png`;
  })

  up.addEventListener('click', () =>{
    ABC = 2;
    setABC();
    up.srcset = `assets/icons/up-on.png`;
    eng.srcset = `assets/icons/eng-off.png`;
    ru.srcset = `assets/icons/ru-off.png`;
  })

  function saveResults(){

    let now = new Date();
    
    arr = JSON.parse(localStorage.getItem("shipsRes"));
    if (arr == null) arr = [];
    arr.push({ship: enemies.length, score: score,
        date: formatDate(now), time : formatTime(now)  
      });
    localStorage.setItem("shipsRes", JSON.stringify(arr));
    showResults();
  }


  function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }

  function formatTime(date) {

    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;
  
    var mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;
  
    return hh + ':' + mm;
  }

  window.addEventListener('resize', (e) => {

    window.resizeTo(width, height);
  //  if (time > 1 && time < 99) {
  //    let isReload = confirm("Для корректной работы необходимо обновить страницу, текущий раунд будет потерян, согласны?");
   //   if (isReload) location.reload();
 //   }
  });

    
  window.onresize = function () {

   // if (width < minWidth || width > maxWidth || height < minHeight || height > maxHeight) {
  
    window.resizeTo(width, height);
   // }
    };

    function showResults(){
      arr = JSON.parse(localStorage.getItem("shipsRes"));

      let list = document.querySelector("ul");
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      let newNode;
      let elemText;
      let newSpan;
      let spanText;
      let lj = -1;
      if (arr)
      for (let li = arr.length - 1; li >= 0; li--){
        lj++;
        if (lj > 9) return;
        newNode = document.createElement("li");
        newNode.classList.add('item');
       
      //  elemText = document.createTextNode((li > 8 ? lj + '.' : '  ' + lj + '.' ));
      //  newNode.appendChild(elemText);
        newSpan = document.createElement('span');
        newSpan.classList.add('date');
        spanText = document.createTextNode(arr[li].date);
        newSpan.appendChild(spanText);
        newNode.appendChild(newSpan);

        newSpan = document.createElement('span');
        newSpan.classList.add('time');
        spanText = document.createTextNode(arr[li].time);
        newSpan.appendChild(spanText);
        newNode.appendChild(newSpan);
/*
        newSpan = document.createElement('span');
        newSpan.classList.add('ship');
        spanText = document.createTextNode(arr[li].ship);
        newSpan.appendChild(spanText);
        newNode.appendChild(newSpan);
*/
        newSpan = document.createElement('span');
        newSpan.classList.add('score');
        spanText = document.createTextNode(arr[li].score);
        newSpan.appendChild(spanText);
        newNode.appendChild(newSpan);

        list.appendChild(newNode);
      }

    }
