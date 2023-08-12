
/*
const activeBurgerMenu = document.querySelector(".header__burger-menu.active");
document.addEventListener("click", function(e) {
    const withinMenu = e.composedPath().includes(activeBurgerMenu);
    if (! withinMenu) {
    const burgerMenu = document.querySelector(".header__burger-menu");
    burgerMenu.classList.remove('active');}
    
   });
  */
const activeBurgerMenu = document.querySelector(".sections");
const burgerMenuButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".header__burger-menu");
const body = document.querySelector("body");
const headerLink = document.querySelectorAll(".header__link");
const headerarea = document.querySelector(".header__wrapper");

if  (activeBurgerMenu) {
  activeBurgerMenu.addEventListener("click", function(e) {
    burgerMenuButton.classList.remove('active');
    burgerMenu.classList.remove('active');
     body.classList.remove('lock');
 })};

 if  (headerarea) {
  headerarea.addEventListener("click", function(e) {



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

