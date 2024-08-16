let humanScore = 0;
let computerScore = 0;

let choice = "";

function getComputerChoice() {
  let randomNumber = getRandomInt();

  return randomNumber === 1 // rock: 1, paper: 2, scissors: 3
    ? "rock"
    : randomNumber === 2
    ? "paper"
    : "scissors";
}

function getRandomInt() {
  return Math.floor(Math.random() * 3) + 1;
}

function getHumanChoice() {
  return choice;
}

function playRound(humanChoice, computerChoice) {
  let isHuman = true;

  changeIconState(isHuman, humanChoice);
  changeIconState(!isHuman, computerChoice);

  if (humanChoice === computerChoice) {
    displayRoundTie();

    return;
  }

  if (validateHumanWin(humanChoice, computerChoice)) {
    displayRoundWinner("Human", humanChoice, computerChoice);
    updateScore(isHuman);
  } else {
    displayRoundWinner("Computer", computerChoice, humanChoice);
    updateScore(!isHuman);
  }

  displayScore();
}

function playGame() {
  const choiceButtons = document.querySelectorAll(".choice-btn");

  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const buttonId = e.currentTarget.id;

      const choices = {
        rock: "rock",
        paper: "paper",
        scissors: "scissors",
      };

      if (choices[buttonId]) {
        playRound(buttonId, getComputerChoice());
      }
    });
  });

  // determineWinner();
}

function determineWinner() {
  if (humanScore === computerScore) {
    console.log("It's a tie!");
    return;
  }

  let scoreDiff =
    humanScore > computerScore
      ? humanScore - computerScore
      : computerScore - humanScore;

  if (humanScore > computerScore) {
    console.log(`Human won by ${scoreDiff} pts`);
  } else {
    console.log(`Computer won by ${scoreDiff} pts`);
  }
}

function changeIconState(isHuman, choice) {
  const playerIcon = document.querySelector(".player-icon");
  if (isHuman) {
    playerIcon.textContent = getIcon(choice);
    return;
  }

  const computerIcon = document.querySelector(".computer-icon");
  computerIcon.textContent = getIcon(choice);
}

function getIcon(choice) {
  const icons = {
    rock: "✊",
    paper: "✋",
    scissors: "✌",
  };

  return icons[choice];
}

function isRock(choice) {
  return choice === "rock";
}

function isPaper(choice) {
  return choice === "paper";
}

function isScissors(choice) {
  return choice === "scissors";
}

function displayRoundWinner(winner, winnerChoice, losingChoice) {
  const winnerText = document.querySelector(".winner-text");
  winnerText.textContent = `${winner} wins! "${winnerChoice}" beats "${losingChoice}"`;
}

function displayRoundTie() {
  const winnerText = document.querySelector(".winner-text");

  winnerText.textContent = "Round finished by a tie!";
}

function validateHumanWin(humanMove, computerChoice) {
  return (
    (isRock(humanMove) && isScissors(computerChoice)) ||
    (isPaper(humanMove) && isRock(computerChoice)) ||
    (isScissors(humanMove) && isPaper(computerChoice))
  );
}

function updateScore(isHuman) {
  if (isHuman) {
    humanScore++;
    return;
  }

  computerScore++;
}

function displayScore() {
  const playerPoints = document.querySelector(".player-points");
  const computerPoints = document.querySelector(".computer-points");

  playerPoints.textContent = humanScore;
  computerPoints.textContent = computerScore;
}

playGame();
