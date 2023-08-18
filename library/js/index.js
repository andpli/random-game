
const sections = document.querySelector(".sections");
const burgerMenuButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".header__burger-menu");
const body = document.querySelector("body");
const headerLink = document.querySelectorAll(".header__link");
const circleWrapper = document.querySelectorAll(".wrapper__circle");
const circle = document.querySelectorAll(".circle");
const circleActive = document.querySelector(".circle.active");
const label = document.querySelectorAll(".label");
const favorites = document.querySelectorAll(".favorites__set");

if  (sections) {
  sections.addEventListener("click", function(e) {
      burgerMenuButton.classList.remove('active');
      burgerMenu.classList.remove('active');
      body.classList.remove('lock');
 })};

if  (burgerMenuButton) {
    burgerMenuButton.addEventListener("click", function(e) {
      burgerMenuButton.classList.toggle('active');
      burgerMenu.classList.toggle('active');
      body.classList.toggle('lock');
   });
}

headerLink.forEach(link => link.addEventListener('click', function(e) {
    burgerMenuButton.classList.remove('active');
    burgerMenu.classList.remove('active');
    body.classList.remove('lock');
 }));


label.forEach(el => el.addEventListener('click', function(e) {
  favorites.forEach((item) => {
    item.style.display = "none";
  }); 
  document.getElementById(`set_${this.innerText.toLowerCase()}`).style.display = "";
}));



let position = 0;
let slidesToShow = 1;
let containerWidth = 450;
let currentSlide = 4;

let container = document.querySelector('.slider__container-tablet');
let track = document.querySelector('.slider__track-tablet');
let btnPrev = document.querySelector('.btnPrev');
let btnNext = document.querySelector('.btnNext');
let items = document.querySelectorAll('.slider__item-tablet');

if (window.innerWidth >= 1425) {
  currentSlide = 1;
  slidesToShow = 3;
  containerWidth = 1401;
  container = document.querySelector('.slider__container');
  track = document.querySelector('.slider__track');
  items = document.querySelectorAll('.slider__item');
  btnPrev = document.querySelector('.btnPrevM');
  btnNext = document.querySelector('.btnNextM');
};


const itemsCount = items.length;
const itemWidth = containerWidth / slidesToShow;

items.forEach((item) => {
   item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
  if (btnNext.disabled) {return}
  position -= itemWidth;
  
  setPosition();
  checkBtns();
  currentSlide++;
  setCircle();
});

btnPrev.addEventListener('click', () => {
  if (btnPrev.disabled) {return}
  position += itemWidth;
  setPosition();
  checkBtns();
  currentSlide--;
  setCircle();
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

for (let i = 0; i < circleWrapper.length; i++) {
  circleWrapper[i].onclick = function() {
  circle.forEach(el => el.classList.remove('active'));
  currentSlide = this.id.slice(-1);
  document.getElementById(`circle_id${currentSlide}`).classList.add('active');
  position = (currentSlide - (currentSlide > 3 ? 4 : 1)) * -itemWidth;
  setPosition();
  checkBtns();
  };
}

const setCircle = () => {
  circle.forEach(el => el.classList.remove('active'));
  document.getElementById(`circle_id${currentSlide}`).classList.add('active');
};

checkBtns();