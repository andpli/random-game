/*
console.log("Вёрстка +10 ");
console.log("Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10");
console.log("Реализовано завершение игры при достижении игровой цели +10");
console.log("По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10");
console.log("Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10");
console.log("Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10");
console.log("Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");
*/

const str = '0123456789abcdefghijklmnopqrstuvwxyz';
const keys = [...str];
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
      let bomb = new Ball(this.x + this.width/2,this.y + this.height + 5, 'black');
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
       console.log(`step1 ${step}`);
        this.step = (Math.floor(Math.random() * 3) + 1) * step;
        console.log(`step2 ${this.step}`);
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
                    console.log(`${this.x} step3 ${this.step}`);
                } 


          }, 10); 
    }

    kill(x,y) {
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
            this.step = (Math.floor(Math.random() * 3) + 1) * step;
            console.log(`step4 ${this.step}`);
           // this.move(1);
        }, 1000);
    }
}

class MyShip extends Ship{
      fire() {
        if (this.pause) return;
        let bomb = new EnemyBall(this.x + this.width/2,this.y+5, 'red');
        bomb.move(-2, enemies);
      }

      move(step) {
              if (this.pause) return;
              context.drawImage(white,this.x,this.y);
              this.x += step; 
              if (this.x <= 0) {this.x = 0};
              if (this.x >= canvas.width-50) {this.x = canvas.width-50};
              context.drawImage(this.color,this.x,this.y);
 
            
      }

      kill(x,y) {
        time = 1;
        enemies.forEach((el) => el.stop());
        this.stop();
        context.drawImage(flash,x-20,y-20);
        setTimeout(() => {   
            context.drawImage(flash,this.x,y-10);
            context.drawImage(flash,this.x+20,y-10);
        }, 200);

        clearAll(5000);
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
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0,  Math.PI *2 );
        context.fill();

        const moveId = setInterval(() => {

            context.beginPath();
            context.fillStyle = bgColor;
            context.fillRect(this.x - this.r, this.y - this.r,this.r *2 , this.r *2 );
            this.y += step; 
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.r, 0,  Math.PI *2 );
            context.fill();
            
            for (let ship of ships){
                if (( this.checkHeight(ship.y)  
                    && this.x >= ship.x && this.x <= ship.x + 50) && ship.pause != true)
                {
                ship.kill(this.x, this.y);
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
let key = getRandomKey();

let enemyShip = null;
let playerShip = null;
let enemies = [];
let myships = [];

btn.addEventListener('click', () =>{

    if (time != 0) return;

    score = 0; showScore(score);
    time = 100; showTime(time);

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

    playerShip = new MyShip(Math.floor(w / 2),h - enemyShip.height - 5, blue);
    myships.push(playerShip);
    game = setInterval(function(){

        time--;
        showTime(time);
     
        if (time <= 0) { clearInterval(game); 
            enemies.forEach((el) => el.stop());
            clearAll(1000); }
     }, 1000);

});

document.addEventListener('keydown', function(e){
    if (time == 0) return;
  //  console.log(e);
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

function clearAll(delay){
    setTimeout(() => {   
        context.fillStyle = bgColor;
        context.fillRect(0, 0, w, h);
    }, delay);
}

function showScore(value){
    document.querySelector(".score").textContent = `Убито: ${value}`;
}

function showTime(value){
    document.querySelector(".time").textContent = `Осталось: ${value} сек`;
}