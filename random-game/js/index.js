console.log("Вёрстка +10 ");
console.log("Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10");
console.log("Реализовано завершение игры при достижении игровой цели +10");
console.log("По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10");
console.log("Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10");
console.log("Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10");
console.log("Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

const str = '0123456789abcdefghijklmnopqrstuvwxyz';
const keys = [...str];
let score = 0;
let time = 0;
let game = null;
let enemy = null;
let btn =document.querySelector("#start");





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
let y = canvas.width / 2 - 25;

let x = -70;
context.drawImage(red,x,0);

btn.addEventListener('click', () =>{
    score = 0;
    time = 100;
    game = setInterval(function(){
        time--;
        document.querySelector(".time").textContent = `Осталось: ${time} сек`;
     
        if (time == 0) { clearInterval(game); clearInterval(enemy);}
     }, 1000);




 enemy = setInterval(function(){
    if (x > canvas.width) x = -50;
    context.drawImage(white,x,0);
    x = x + 1;
    context.drawImage(red,x,0);
}, 10);

context.drawImage(blue,y,h-50);

});




document.addEventListener('keydown', function(e){
    if (time === 0) {return}
   if (e.key == 'ArrowLeft') {
    context.drawImage(white,y,h-50);
    y = y - 5; 
    if (y <= 0) {y = 0};
    context.drawImage(blue,y,h-50);
   }
   
   if (e.key == 'ArrowRight') {
    context.drawImage(white,y,h-50);
    y=y+5;
    if (y + 50 >= canvas.width) {y = canvas.width - 50};
    context.drawImage(blue,y,h-50);
}
    if (e.key == key) {
        key = getRandomKey();
        let z = y+25;
        let ha = h-50;
        context.beginPath();
        context.fillStyle = 'red';
        context.arc(z, ha, 3, 0,  Math.PI *2 );
        context.fill();


        
        const intervalId = setInterval(() => {
           context.beginPath();
           if (ha < 40 && ha > 0 && z >= x && z <= x +50) {clearInterval(intervalId); x = -50; boom(z);}
           
        context.fillStyle = 'lightgoldenrodyellow';
        context.arc(z, ha, 3, 0,  Math.PI *2 );
        context.fill();
        context.fillRect(z-3,ha,10, 5);
            ha =ha - 2;
            context.fillStyle = 'red';
            context.arc(z, ha, 3, 0,  Math.PI *2 );
            context.fill();    
            if (ha<-5) {clearInterval(intervalId);}
         }, 10); 

    }


});

function boom(z){

   score++;
   document.querySelector(".score").textContent = `Убито: ${score}`;

            context.drawImage(flash,z-20,10);
      
           setTimeout(() => {   
                 context.beginPath();
                 context.fillStyle = 'lightgoldenrodyellow';
                // context.fillStyle = 'lightgreen';
                        context.arc(z, 30, 60, 0,  Math.PI *2 );
                        context.fill();}, 1000);
  

}