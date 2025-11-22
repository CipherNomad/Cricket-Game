/* 🎵 Load Sounds */
const sounds = {
  click: new Audio("sounds/click.mp3"),
  bat: new Audio("sounds/bat.mp3"),
  ball: new Audio("sounds/ball.mp3"),
  stump: new Audio("sounds/stumps.mp3"),
  win: new Audio("sounds/win.mp3"),
  lose: new Audio("sounds/lose.mp3"),
  tie: new Audio("sounds/tie.mp3"),
};

/* Play click sound */
function playClick() {
  sounds.click.currentTime = 0;
  sounds.click.play();
}

/* ---------------- SPLASH SCREEN ----------------- */

setTimeout(() => {
  document.getElementById("splash").style.opacity = 0;

  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
  }, 600);

}, 2500);


/* ---------------- GAME LOGIC ----------------- */

let score;
let scoreStr = localStorage.getItem("score");
resetScore(scoreStr);

function playGame(move) {
  playClick();

  if (move === "Bat") sounds.bat.play();
  if (move === "Ball") sounds.ball.play();
  if (move === "Stumps") sounds.stump.play();

  let comp = systemChoice();
  let msg = getResult(move, comp);

  if (msg.includes("Won")) sounds.win.play();
  else if (msg.includes("System")) sounds.lose.play();
  else sounds.tie.play();

  printResult(move, comp, msg);
}

function resetScore(scoreStr) {
  score = scoreStr
    ? JSON.parse(scoreStr)
    : { win: 0, lost: 0, tie: 0 };

  score.displayScore = function () {
    return `Won: ${score.win} | Lost: ${score.lost} | Tie: ${score.tie}`;
  };

  printResult();
}

function systemChoice() {
  let random = Math.random() * 3;
  if (random < 1) return "Bat";
  else if (random < 2) return "Ball";
  else return "Stumps";
}

function getResult(userMove, computerMove) {
  if (userMove === computerMove) {
    score.tie++;
    return "Match Tied 😐";
  }

  const rules = {
    Bat: "Ball",
    Ball: "Stumps",
    Stumps: "Bat",
  };

  if (rules[userMove] === computerMove) {
    score.win++;
    return "You Won 🏆";
  } else {
    score.lost++;
    return "System Won 😭";
  }
}

function printResult(userMove, compMove, resultMsg) {
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector("#user-move").innerText =
    userMove ? `You chose: ${userMove}` : "";

  document.querySelector("#computer-move").innerText =
    compMove ? `System chose: ${compMove}` : "";

  document.querySelector("#result").innerText = resultMsg || "";

  document.querySelector("#score").innerText = score.displayScore();
}
