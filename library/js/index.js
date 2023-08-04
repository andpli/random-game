
/*
const activeBurgerMenu = document.querySelector(".header__burger-menu.active");
document.addEventListener("click", function(e) {
    const withinMenu = e.composedPath().includes(activeBurgerMenu);
    if (! withinMenu) {
    const burgerMenu = document.querySelector(".header__burger-menu");
    burgerMenu.classList.remove('active');}
    
   });
  */
const burgerMenuButton = document.querySelector(".header__burger");
if  (burgerMenuButton) {
    burgerMenuButton.addEventListener("click", function(e) {
    burgerMenuButton.classList.toggle('active');
    const burgerMenu = document.querySelector(".header__burger-menu");
    burgerMenu.classList.toggle('active');
    const body = document.querySelector("body");
    body.classList.toggle('lock');
   });
}

