let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let hlevel = 0;
let body = document.querySelector("body");
let btns = ["color1", "color2", "color3", "color4"];

let level = 0;
let started = false;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * btns.length);
  let randomColor = btns[randomIndex];
  let randomButton = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  console.log(gameSeq);
  btnFlash(randomButton);
}

function check(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    body.classList.add("lost");
    setTimeout(function () {
      body.classList.remove("lost");
    }, 150);
    h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press Any Key To Start Again`;
    if (level > hlevel) {
      hlevel = level;
      h3.innerText = `HIGHEST SCORE : ${hlevel}`;
    }
    reset();
  }
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 100);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  check(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  // Add "let" to declare the loop variable
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
