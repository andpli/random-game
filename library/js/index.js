
const sections = document.querySelector(".sections");
const burgerMenuButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".header__burger-menu");
const body = document.querySelector("body");
const headerLink = document.querySelectorAll(".header__link");

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

let position = 0;
let slidesToShow = 1;
let slidesToScroll = 1;
let containerWidth = 450

let container = document.querySelector('.slider__container-tablet');
let track = document.querySelector('.slider__track-tablet');
let btnPrev = document.querySelector('.btnPrev');
let btnNext = document.querySelector('.btnNext');
let items = document.querySelectorAll('.slider__item-tablet');
if (window.innerWidth >= 1440) {
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
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
   item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
});

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position)  / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkBtns();