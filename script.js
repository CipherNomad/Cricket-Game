/* 🎵 Load Sounds */
const sounds = {
  click: new Audio("sounds/click.mp3"),
  bat: new Audio("sounds/bat.mp3"),
  ball: new Audio("sounds/ball.mp3"),
  stump: new Audio("sounds/stumps.mp3"),
  win: new Audio("sounds/win.mp3"),   // plays when YOU win
  lose: new Audio("sounds/lose.mp3"), // plays when YOU lose
  tie: new Audio("sounds/tie.mp3"),
};

/* Limit result sounds to max 4 seconds */
function limitSound(sound, duration = 4000) {
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, duration);
}

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

  // play button sound immediately
  if (move === "Bat") limitSound(sounds.bat, 2000);
  if (move === "Ball") limitSound(sounds.ball, 2000);
  if (move === "Stumps") limitSound(sounds.stump, 2000);

  let comp = systemChoice();
  let msg = getResult(move, comp);

  printResult(move, comp, msg);

  // small delay for result sound
  setTimeout(() => {
    if (msg.includes("Won")) {
      limitSound(sounds.win, 4000);   // YOU won
    } else if (msg.includes("Lost")) {
      limitSound(sounds.lose, 4000);  // YOU lost
    } else {
      limitSound(sounds.tie, 3500);   // tie
    }
  }, 300);
}

/* RESET SCORE */
function resetScore(scoreStr) {
  score = scoreStr
    ? JSON.parse(scoreStr)
    : { win: 0, lost: 0, tie: 0 };

  score.displayScore = function () {
    return `Won: ${score.win} | Lost: ${score.lost} | Tie: ${score.tie}`;
  };

  printResult();
}

/* SYSTEM RANDOM CHOICE */
function systemChoice() {
  let random = Math.random() * 3;
  if (random < 1) return "Bat";
  else if (random < 2) return "Ball";
  else return "Stumps";
}

/* FIXED RESULT LOGIC */
function getResult(userMove, computerMove) {
  if (userMove === computerMove) {
    score.tie++;
    return "Match Tied 😐";
  }

  // Game rules
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
    return "You Lost 😭";  // 🔥 FIXED TEXT
  }
}

/* PRINT RESULT */
function printResult(userMove, compMove, resultMsg) {
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector("#user-move").innerText =
    userMove ? `You chose: ${userMove}` : "";

  document.querySelector("#computer-move").innerText =
    compMove ? `System chose: ${compMove}` : "";

  document.querySelector("#result").innerText = resultMsg || "";

  document.querySelector("#score").innerText = score.displayScore();
}
