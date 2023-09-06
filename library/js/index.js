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
document.querySelector('.logo').addEventListener("click", () => {closeMenu();});
document.querySelector('.header__nav').addEventListener("click", () => {closeMenu();});
overlay.addEventListener("click", () => {closeMenu();});
headerLinks.forEach(link => link.addEventListener('click', () => {closeMenu();}));
/************/

function closeMenu() {
  toggleBurger("remove");
  closeProfileMenu();
}



const label = document.querySelectorAll(".label");
const favorites = document.querySelectorAll(".favorites__set");
const seasonsInp = document.querySelectorAll(".season__input");
var bookBuyBtn = document.querySelectorAll(".book__buy_btn");

const fadeIn = (el, timeout) => {
  el.style.opacity = 0; 
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
  }, timeout);
};

function initSeason(){
  currentSeason = 1;
  seasonsInp.forEach(el => el.checked = false);
  document.querySelector('#season_id1').checked = true;;
  favorites.forEach(el => el.style.opacity = 0); 
  favorites[0].style.opacity = 1;
  console.log(bookBuyBtn);
  bookBuyBtn.forEach((el, idx) =>{if (idx < 4) {el.style.zIndex = 2;}
  });
}

let currentSeason = 0;
let previousSeason = 0;
initSeason();

label.forEach(el => el.addEventListener('click', function() {
  
  if (currentSeason == this.children[0].id.slice(-1)) {return};
  previousSeason = currentSeason;
  currentSeason = this.children[0].id.slice(-1);

  bookBuyBtn.forEach((el, idx) =>{
    el.style.zIndex = 0;
    if  (idx >= (currentSeason * 4 - 4) && idx < (currentSeason * 4)) {
      el.style.zIndex = 2;
    }
  });

  favorites.forEach((item,idx) => {
    if (idx === (previousSeason - 1))
       { fadeOut(item, 2000)}
  }); 
  fadeIn(document.querySelector(`#set_${this.innerText.toLowerCase()}`), 2000);
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
  btnPrev.style.opacity = btnPrev.disabled ? 0.2 : 1;
  btnNext.style.opacity = btnNext.disabled ? 0.2 : 1;
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

var prevModal = '';
var modalRegister = document.querySelector("#modalRegister");
var modalLogIn = document.querySelector("#modalLogIn");
var modalBuyCard = document.querySelector("#modalBuyCard");
var modalMyProfile = document.querySelector("#modalMyProfile");
var modalBack = document.querySelector(".modal-background");
var itemRegister = document.querySelector("#item__register");
var itemLogin = document.querySelector("#item__login");
var itemLogout = document.querySelector("#item__logout");
var itemMyProfile = document.querySelector("#item__myprofile");
var spanRegister = document.querySelector(".register__span");
var spanLogin = document.querySelector(".login__span");
var getFormSignup = document.querySelector(".get__form_signup");
var getFormLogin = document.querySelector(".get__form_login");
var getFormProfile = document.querySelector(".get__form_profile");
var findFormSubmit = document.querySelector(".find__form_submit");
var close = document.querySelectorAll(".close__button");
var cardNumber = document.querySelector(".card__number");
var copyCardButton = document.querySelector(".copy__card");
var registerButton = document.querySelector(".register__button");
var loginButton = document.querySelector(".login__button");
var buyCardButton = document.querySelector(".buy__button");

function openModal(modal) {
    closeModal(prevModal);
    closeProfileMenu();
    prevModal = modal;
    modal.classList.add("show");
    modalBack.classList.add("show");
    body.classList.add('lock');
}

function closeModal(modal) {
if (modal != '') {
  modal.scrollTop = 0;
  modal.classList.remove("show");
  hideError();
}
modalBack.classList.remove("show");
body.classList.remove('lock');
}

bookBuyBtn.forEach(el => el.addEventListener('click', () => {clickBookBuy(el);}));
itemMyProfile.addEventListener("click", () => {openModal(modalMyProfile)});
getFormProfile.addEventListener("click", () => {openModal(modalMyProfile)});
spanLogin.addEventListener("click", () => {clickLogIn();});
itemLogin.addEventListener("click", () => {clickLogIn();});
getFormLogin.addEventListener("click", () => {clickLogIn();});
spanRegister.addEventListener("click", () => {clickSignUp();});
itemRegister.addEventListener("click", () => {clickSignUp();});
getFormSignup.addEventListener("click", () => {clickSignUp();});
copyCardButton.addEventListener("click",() => {navigator.clipboard.writeText(cardNumber.textContent)});
registerButton.addEventListener("click",() => {signUp();});
itemLogout.addEventListener("click",() => {logOut();});
loginButton.addEventListener("click",() => {logIn();});
buyCardButton.addEventListener("click",() => {processBuyCard();});
findFormSubmit.addEventListener("click",() => {findCard();});
close.forEach(link => link.addEventListener('click', () => {closeModal(prevModal);}));
modalBack.addEventListener("click", () => { closeModal(prevModal);});

let profileMenu = '';

if (sessionStorage.getItem('currentBPL') === null) {
  profileMenu = document.querySelector(".profile_login"); } 
else {
  profileMenu = document.querySelector(".profile_logout");
  setValues(getCurrentUser());
}
profile.forEach(link => link.addEventListener('click', () => {
  openProfileMenu(link);
}));

function openProfileMenu(link) {
  toggleBurger("remove");
  link.classList.toggle("active");
  profileMenu.classList.toggle("active");
}

//let profileActive = document.querySelector(".profile.active");

function closeProfileMenu() {
 // console.log(profileActive);
  profile.forEach(el => el.classList.remove('active'));
  profileMenu.classList.remove("active");
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function getRandomHexValue() {
  let res = "";
  for (let i = 0; i < 9; i++) { 
    let digit = getRandomValue(0, 15);
    res += digit.toString(16);
  }
  return res;
}
function clickLogIn() {
  openModal(modalLogIn);
}

function clickSignUp() {
  openModal(modalRegister);
}

function signUp() {
  if (sessionStorage.getItem('currentBPL') !== null ) return;
  let arr = [];
  const fname = document.querySelector("#firstname").value;
  const lname = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;
  const pwd = document.querySelector("#password-reg").value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !pwd || !fname || !lname) {
    showError('Please fill in all the required fields.');
    return;
  }

  if (regex.test(email) == false) {
    showError('Email is invalid.');
    return;
  }

  if (pwd.length < 8) {
    showError('Password must have at least 8 characters.');
    return;
  }
  
  const hex = getRandomHexValue().toUpperCase();
  if (localStorage.usersBPL !== undefined) {
    arr = JSON.parse(localStorage.getItem("usersBPL"));
  }
  
  if (arr.some((el) => el.email === email)) {
    showError('This email is already in use.');
    return;
  }
  sessionStorage.setItem('currentBPL', hex);
  
  let arrlen = arr.length;
  arr.push({firstName: fname, lastName: lname,
            email: email, password: pwd,
            cardNumber: hex, visits: 1,
            books: [], cardExists: 0
          });
  setValues(arr[arrlen]);             
  localStorage.setItem("usersBPL", JSON.stringify(arr));
  profileMenu = document.querySelector(".profile_logout");
  closeModal(prevModal);
  alert('You have successfully registered. Your card number is ' + hex);
}

function logOut() {
  sessionStorage.removeItem('currentBPL');
  closeProfileMenu();
  profileMenu = document.querySelector(".profile_login");
  document.querySelector(".find__form_readername").value = '';
  document.querySelector(".find__form_cardnumber").value = '';
  document.querySelector(".register__form").reset();
  document.querySelector(".login__form").reset();
  location.reload();
  return true;
}

function logIn() {
  if (sessionStorage.getItem('currentBPL') !== null ) return;

  let arr = [];
  const email = document.querySelector("#emailcard").value;
  const pwd = document.querySelector("#password-log").value;

  if (!email || !pwd) {
    showError('Please fill in all the required fields.');
    return;
  }

  if (pwd.length < 8) {
    showError('Password must have at least 8 characters.');
    return;
  }

  if (localStorage.usersBPL !== undefined) {
    arr = JSON.parse(localStorage.getItem("usersBPL"));
  } else return;
  
  let lbFlag = false;
  for (let li = 0; li < arr.length; li += 1) {
    console.log(arr[li]);
    if ((arr[li].email === email || arr[li].cardNumber === email)
      && (arr[li].password === pwd)) {
      lbFlag = true;
      sessionStorage.setItem('currentBPL', arr[li].cardNumber);
      arr[li].visits += 1;
      localStorage.setItem("usersBPL", JSON.stringify(arr));
      setValues(arr[li]);   
      profileMenu = document.querySelector(".profile_logout");
      closeModal(prevModal);
      alert('You have successfully logged in to your account.');

    }
  }
  if (lbFlag === false) {
    showError('Invalid user/password. Please try again.');
    document.querySelector("#password-log").value = '';
  }
  
  
}

function setValues(obj) {
  if (!obj) return;
  for (let li = 0; li < 2; li++) {
    let profile = document.querySelectorAll(".profile")[li];
    let oldNode = document.querySelectorAll(".profile__logo")[0];
    let newNode = document.createElement("div");
    newNode.classList.add('profile__logo-text');
    newNode.setAttribute('title', obj.firstName + ' ' + obj.lastName);
    let elemText = document.createTextNode(obj.firstName[0] + obj.lastName[0]);
    newNode.appendChild(elemText);
    if (oldNode !== undefined)
    profile.replaceChild(newNode, oldNode);
  }
  
  document.querySelector(".find__form_submitbox").style.display = 'none';
  document.querySelector(".find__form-container").style.display = 'flex';
  document.querySelector(".find__form_name").textContent = 'Your Library card';
  document.querySelector(".find__form_readername").value =
  obj.firstName + ' ' + obj.lastName;
  document.querySelector(".find__form_readername").style.color = '#BB945F';
  document.querySelector(".find__form_readername").readOnly = true;
  document.querySelector(".find__form_cardnumber").value = obj.cardNumber;
  document.querySelector(".find__form_cardnumber").style.color = '#BB945F';
  document.querySelector(".find__form_cardnumber").readOnly = true;
 
  document.querySelector(".get__form_name").textContent = 'Visit your profile';
  document.querySelector(".get__form_label").textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
  document.querySelector(".get__form_signup").style.display = 'none';
  document.querySelector(".get__form_login").style.display = 'none';
  document.querySelector(".get__form_profile").style.display = 'block';

  document.querySelector(".small").textContent = obj.cardNumber;
  document.querySelector(".card__number").textContent = obj.cardNumber;
  document.querySelector(".visits").textContent = obj.visits;
  document.querySelector(".books").textContent = obj.books.length;
  document.querySelector(".ff-visits").textContent = obj.visits;
  document.querySelector(".ff-books").textContent = obj.books.length;
  document.querySelector(".name__full").textContent = 
  obj.firstName + ' ' + obj.lastName;
  document.querySelector(".name__simple").textContent = 
  obj.firstName[0] + obj.lastName[0]; 
                                                    
  let rentedList = document.querySelector(".rented__list");
  let rentedItems = document.querySelectorAll(".rented__item");

  for (let li = 0; li < rentedItems.length; li++){
    rentedList.removeChild(rentedItems[li]);
  }; 

  for (let li = 0; li < obj.books.length; li++){
    newNode = document.createElement("li");
    newNode.classList.add('rented__item');
    elemText = document.createTextNode(obj.books[li][1]);
    newNode.appendChild(elemText);
    rentedList.appendChild(newNode);
    bookBuyBtn[obj.books[li][0]].classList.add('own__book_btn');
    bookBuyBtn[obj.books[li][0]].textContent = 'Own';
    bookBuyBtn[obj.books[li][0]].disabled = true;
  }
  /*
  rentedList.style.height = '1000px';
  rentedList.style.overflow = 'hidden';
  rentedList.style.height = '80px';
  rentedList.style.overflow = 'auto';
  rentedList.scrollTop = 0;
  rentedList.scroll(0,0);*/
  console.log('scroll');
}

function isRegistered(){
  let arr = [];
  if (localStorage.usersBPL !== undefined) {
      arr = JSON.parse(localStorage.getItem("usersBPL"));
      return (arr.length > 0);
  }
  return false;
}

function getCurrentUser() {
  if (sessionStorage.getItem('currentBPL') === null ) return;

  let arr = [];
  if (localStorage.usersBPL !== undefined) {
    arr = JSON.parse(localStorage.getItem("usersBPL"));
  }
  
  for (let li = 0; li < arr.length; li++ ) {
    if (arr[li].cardNumber === sessionStorage.getItem('currentBPL')) {
      return arr[li];
    }
  }
  return undefined;
}

function clickBookBuy(el) {
  let obj = getCurrentUser();
  console.log(obj);
  if (obj !== undefined) {
    if (obj.cardExists === 0) {
      openModal(modalBuyCard);}
      else {processBuyBook(Array.prototype.indexOf.call(bookBuyBtn, el));}
  } else if (isRegistered()) clickLogIn();
}

function processBuyCard() {
  if (checkCardFields() == false) return false;
  let idx = -1;
  let arr = JSON.parse(localStorage.getItem("usersBPL"));
  for (let li = 0; li < arr.length; li++ ) {
    if (arr[li].cardNumber === sessionStorage.getItem('currentBPL')) {
      arr[li].cardExists = 1; idx = li; break;
    }
  }
  localStorage.setItem("usersBPL", JSON.stringify(arr));
  if (idx >= 0) setValues(arr[idx]);
  closeModal(prevModal);
  document.querySelector(".buycard__form").reset();
  return true;
}

function processBuyBook(btn) {
  let alreadyExist = false;
  let auth = document.querySelectorAll(".book__main")[btn].textContent.trim();
  let pos = auth.indexOf('By ');
  auth = auth.substring(pos + 3);
  let book =  document.querySelectorAll(".book__name")[btn].textContent.trim();
  pos = -1;
  let arr = JSON.parse(localStorage.getItem("usersBPL"));
  for (let li = 0; li < arr.length; li++ ) {
    if (arr[li].cardNumber === sessionStorage.getItem('currentBPL')) {
      arr[li].books.forEach(el => {
        if (el[0] == btn) alreadyExist = true; } 
      );
      pos = li;
      if (!alreadyExist) {arr[li].books.push([btn, book + ', ' + auth])}; 
      break;
    }
  }
  localStorage.setItem("usersBPL", JSON.stringify(arr));
  if (pos >= 0) setValues(arr[pos]);

  return true;
}

function findCard() {
  if (checkCard()) {
  document.querySelector(".find__form_submitbox").style.display = 'none';
  document.querySelector(".find__form-container").style.display = 'flex';
  document.querySelector(".find__form_readername").style.color = '#BB945F';
  document.querySelector(".find__form_readername").readOnly = true;
  document.querySelector(".find__form_cardnumber").style.color = '#BB945F';
  document.querySelector(".find__form_cardnumber").readOnly = true;
  setTimeout(() => updateFindForm(), 10000);
  }
}

function checkCard() {
  let userName = document.querySelector(".find__form_readername").value;
  let userCardNumber = document.querySelector(".find__form_cardnumber").value;
  let lcNames = '';
  let arr = JSON.parse(localStorage.getItem("usersBPL"));
  if (arr) {
    for (let li = 0; li < arr.length; li++ ) {
      lcNames = arr[li].firstName + ' ' + arr[li].lastName;
      if (arr[li].cardNumber.toUpperCase() === userCardNumber.toUpperCase() 
      && lcNames.toUpperCase() === userName.toUpperCase()) {
        document.querySelector(".find__form_readername").value = lcNames;
        document.querySelector(".find__form_cardnumber").value = arr[li].cardNumber;
        document.querySelector(".ff-visits").textContent = arr[li].visits;
        document.querySelector(".ff-books").textContent = arr[li].books.length;
        return true;
      }
    }
  }
  return false;
}

function updateFindForm(){
  document.querySelector(".find__form_readername").value = '';
  document.querySelector(".find__form_cardnumber").value = '';
  document.querySelector(".find__form_submitbox").style.display = 'block';
  document.querySelector(".find__form-container").style.display = 'none';
  document.querySelector(".find__form_readername").style.color = '#8E8E8E';
  document.querySelector(".find__form_readername").readOnly = false; 
  document.querySelector(".find__form_cardnumber").style.color = '#8E8E8E';
  document.querySelector(".find__form_cardnumber").readOnly = false;
  return true;
}

function hideError() {
  let errorBox = document.querySelectorAll(".error__box");
  for(let li = 0; li < errorBox.length; li++) {
    errorBox[li].classList.remove("error__active"); 
  }
}

function showError(errMess) {
  let errorBox = document.querySelectorAll(".error__box");
  for(let li = 0; li < errorBox.length; li++) {
    errorBox[li].textContent = errMess;
    errorBox[li].classList.add("error__active");
  }  
}

function checkCardFields() {
  const card = document.querySelector("#bankcard").value;
  const month = document.querySelector("#month").value;
  const year = document.querySelector("#year").value;
  const cvc = document.querySelector("#cvc").value;
  const cardholder = document.querySelector("#cardholder").value;
  const pcode = document.querySelector("#pcode").value;
  const city = document.querySelector("#city").value;
  if (!card || !month || !year || !cvc || !cardholder || !pcode || !city) {
    showError('Please fill in all the required fields.');
    return false;
  }
  
  let regex = /^[0-9]{16}$/;
    if (!regex.test(card)) {
    showError('Bank card number is invalid.');
    return false;
  }
  
  regex = /^[0-9]{2}$/;
  num_check = Number(month);
  if (!regex.test(month) || num_check > 12 || num_check < 1) {
    showError('Month (Expiration code) is invalid.');
    return false;
  }
 
  if (!regex.test(year)) {
    showError('Year (Expiration code) is invalid.');
    return false;
  }

  regex = /^[0-9]{3}$/;
  if (!regex.test(cvc)) {
    showError('CVC is invalid.');
    return false;
  }

  return true;
}

// hide errors on input
document.querySelector('#emailcard').addEventListener("input",() => {hideError()});
document.querySelector('#password-log').addEventListener("input",() => {hideError()});
document.querySelector('#firstname').addEventListener("input",() => {hideError()});
document.querySelector('#lastname').addEventListener("input",() => {hideError()});
document.querySelector('#email').addEventListener("input",() => {hideError()});
document.querySelector('#password-reg').addEventListener("input",() => {hideError()});
document.querySelector('#bankcard').addEventListener("input",() => {hideError()});
document.querySelector('#month').addEventListener("input",() => {hideError()});
document.querySelector('#year').addEventListener("input",() => {hideError()});
document.querySelector('#cvc').addEventListener("input",() => {hideError()});
document.querySelector('#cardholder').addEventListener("input",() => {hideError()});
document.querySelector('#pcode').addEventListener("input",() => {hideError()});
document.querySelector('#city').addEventListener("input",() => {hideError()});