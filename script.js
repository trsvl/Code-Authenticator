const body = document.querySelector("#body");
const inputParent = document.querySelector("#input-parent");
const inputCode = document.querySelector("#inputCode");
const pCode = document.querySelector("#code");
const approve = document.querySelector("#approve");
const disapprove = document.querySelector("#disapprove");
const confirmBtn = document.querySelector("#confirm");
const backBtn = document.querySelector("#back");
const confirmMessage = document.querySelector("#confirm-message");
const timeBarActive = document.querySelector("#time-bar-active");
const timeBarParent = document.querySelector("#time-bar");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const sec = (100 / 14).toFixed(1);
let sum = 100;
let state = false;

//Generate code function

const generateCode = () => {
  if (state) {
    return;
  }
  let sumString = 0;
  let sumNumber = 0;
  inputCode.value = "";
  const code = [];
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * 2);
    const randomNumber = Math.floor(Math.random() * 10);
    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
    random ? code.push(randomNumber) : code.push(randomCharacter);
    pCode.textContent = code.join("");

    //Prevent the length of 5 letters or numbers

    typeof code[i] == "string" ? sumString++ : sumNumber++;
  }
  sumString === 5 || sumNumber === 5 ? generateCode() : timeBar();
};

//Time bar function

const timeBar = () => {
  if (state) {
    return;
  }
  timeBarActive.style.width = `${sum}%`;
  sum = sum - sec;
  if (sum <= -12) {
    timeBarActive.style.transition = "";
    sum = 100;
    generateCode();
  } else {
    timeBarActive.style.transition = "all 1s linear";
    setTimeout(timeBar, 1000);
  }
};

generateCode();

//Press "Enter" to execute the "Confirm" button

body.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    confirmBtn.click();
  }
});

//Add/Remove DOM elements

const menuState = (block, none, flex, disApp, status) => {
  approve.style.display = block;
  confirmMessage.style.display = block;
  backBtn.style.display = block;
  pCode.style.display = none;
  confirmBtn.style.display = none;
  timeBarParent.style.display = none;
  inputParent.style.display = flex;
  disapprove.style.display = disApp;
  state = status;
};

//Changing color when pressing a buttons

const colorTextBtn = (element, color) => {
  element.firstElementChild.style.color = color;
};

const ResultOrError = () => {
  if (inputCode.value.toUpperCase() == pCode.textContent) {
    menuState("block", "none", "none", "none", true);
    backBtn.disabled = true;
    setTimeout(() => {
      backBtn.disabled = false;
    }, 1000);
  } else {
    if (disapprove.style.display == "block") {
      return;
    }
    setTimeout(() => {
      disapprove.style.display = "block";
      setTimeout(() => {
        disapprove.style.display = "none";
      }, 1200);
    }, 500);
  }
  colorTextBtn(confirmBtn, "#282828");
  setTimeout(() => {
    colorTextBtn(confirmBtn, "");
  }, 100);
};

//Generate starting menu

const startingMenu = () => {
  sum = 100;
  menuState("none", "block", "flex", "none", false);
  generateCode();
};

//"Confirm" and "Back" buttons actions

backBtn.onclick = startingMenu;
confirmBtn.onclick = ResultOrError;
