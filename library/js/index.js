
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

