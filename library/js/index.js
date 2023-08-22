/* burger menu */
const overlay = document.querySelector(".sections");
const burgerMenuButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".header__burger-menu");
const body = document.querySelector("body");
const profile = document.querySelectorAll(".profile");
const headerLinks = document.querySelectorAll(".header__link");

const toggleBurger = (action) => {
  if (action == 'remove') {
      burgerMenuButton.classList.remove('active');
      burgerMenu.classList.remove('active');
      body.classList.remove('lock');
  } else {
      burgerMenuButton.classList.toggle('active');
      burgerMenu.classList.toggle('active');
      body.classList.toggle('lock');
      closeProfileMenu();
  }
}

if  (burgerMenuButton) {
  burgerMenuButton.addEventListener("click", () => {toggleBurger("toggle")} );
}

overlay.addEventListener("click", () => {toggleBurger("remove")});
// profile.forEach(link => link.addEventListener('click', () => {toggleBurger("remove")}));
headerLinks.forEach(link => link.addEventListener('click', () => {toggleBurger("remove")}));
/************/





const label = document.querySelectorAll(".label");
const favorites = document.querySelectorAll(".favorites__set");
const seasonsInp = document.querySelectorAll(".season__input");



const fadeIn = (el, timeout) => {
  el.style.opacity = 0; 
  el.style.display = 'flex';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() =>  {
    el.style.opacity = 1;
  }, 10);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() =>  {
    el.style.display = 'none';
  }, timeout);
};

 function changeSeason(){
  currentSeason++;
  if (currentSeason > 4) {currentSeason = 1;}
  seasonsInp.forEach(el => el.checked = false);
  let curElement = document.querySelector(`#season_id${currentSeason}`);
  curElement.checked = true;
  favorites.forEach((item) => {
    if (item.style.display != 'none')
    { fadeOut(item, 1000)}  else
    {item.style = 'display: none;'};
  }); 
  fadeIn(document.querySelector(`#set_${curElement.parentElement.innerText.toLowerCase()}`),3000);
  setTimeout(changeSeason, 5000);
  
}

let currentSeason = 0;
// changeSeason();

label.forEach(el => el.addEventListener('click', function(e) {
  
  if (currentSeason == this.children[0].id.slice(-1)) {return};

  currentSeason = this.children[0].id.slice(-1);

  favorites.forEach((item) => {
     if (item.style.display != 'none')
       { fadeOut(item, 1000)}  else
       {item.style = 'display: none;'};

  }); 
   fadeIn(document.getElementById(`set_${this.innerText.toLowerCase()}`), 2000);
 }));

/************/


/* Slider */ 
const circleWrapper = document.querySelectorAll(".wrapper__circle");
const circle = document.querySelectorAll(".circle");
let position = 0;

let slidesToShow = 1;
let containerWidth = 450;
let currentSlide = 4; /*total is 8 ; 3 in desktop + 5 in tablet  */

let container = document.querySelector('.slider__container-tablet');
let track = document.querySelector('.slider__track-tablet');
let btnPrev = document.querySelector('.btnPrev');
let btnNext = document.querySelector('.btnNext');
let items = document.querySelectorAll('.slider__item-tablet');

if (window.innerWidth >= 1425) {
  /* desktop view setup */
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
  btnPrev.style.opacity = btnPrev.disabled ? 0 : 1;
  btnNext.style.opacity = btnNext.disabled ? 0 : 1;
  btnPrev.style.cursor = btnPrev.disabled ? "default" : "pointer";
  btnNext.style.cursor = btnNext.disabled ? "default" : "pointer";
}

for (let i = 0; i < circleWrapper.length; i++) {
  circleWrapper[i].onclick = function() {
  circle.forEach(el => el.classList.remove('active'));
  currentSlide = this.id.slice(-1);
  document.querySelector(`#circle_id${currentSlide}`).classList.add('active');
  position = (currentSlide - (currentSlide > 3 ? 4 : 1)) * -itemWidth;
  setPosition();
  checkBtns();
  };
}

const setCircle = () => {
  circle.forEach(el => el.classList.remove('active'));
  document.querySelector(`#circle_id${currentSlide}`).classList.add('active');
};

checkBtns();

/************/

var modal = document.getElementById("myModal");
var trigger = document.querySelector(".logo");
var close = document.querySelector(".close");

function openModal() {
modal.classList.add("show");
body.classList.add('lock');
}


function closeModal() {
modal.classList.remove("show");
body.classList.remove('lock');

}


trigger.addEventListener("click", openModal);
close.addEventListener("click", closeModal);

var profileMenu = document.querySelector(".profile_login");

profile.forEach(link => link.addEventListener('click', () => {
  toggleBurger("remove");
  openProfileMenu();
  link.classList.toggle("active");
}));

function openProfileMenu() {
  profileMenu.classList.toggle("active");
}
  
function closeProfileMenu() {
  profileMenu.classList.remove("active");
}