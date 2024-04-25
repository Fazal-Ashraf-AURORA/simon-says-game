let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let playArea = document.querySelector(".play-button");

// Sounds

let startSfx = document.getElementById("startSfx"); // Instantiate audio object
let flashSfx = document.getElementById("flashSfx");
let clickSfx = document.getElementById("clickSfx");
let errorSfx = document.getElementById("errorSfx");
let levelupSfx = document.getElementById("levelupSfx");

// Start the game
playArea.addEventListener("click", function () {
  console.log("div was clicked");
  if (started == false) {
    console.log("Game Started");
    started = true;
    startSfx.play(); // Play the sound effect

    setTimeout(levelUp, 1000);
  }
});

function levelUp() {
  // levelupSfx.play();
  userSeq = [];
  level++;
  h2.innerText = "Level: " + level;

  let randIdx = Math.floor(Math.random() * 4);
  console.log(randIdx);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randbtn);
}

function gameFlash(btn) {
  flashSfx.play();
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  clickSfx.play();
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkSeq(idx) {
  // console.log(`Current level: ${level}`);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      levelupSfx.play();
      setTimeout(levelUp, 1000);
    }
    console.log("same value");
  } else {
    errorSfx.play();
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any to start a new game`;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 500);
    reset();
  }
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
