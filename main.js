const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const MAX_SCORE = 5;

let playerScore = 0;
let computerScore = 0;
let round = 1;

function computerPlay() {
  let randomNum = Math.floor(Math.random() * 3);
  if (randomNum === 0) {
    return ROCK;
  } else if (randomNum === 1) {
    return PAPER;
  }
  return SCISSORS;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return "tie";
  } else if (
    (playerSelection === ROCK && computerSelection === SCISSORS) ||
    (playerSelection === PAPER && computerSelection === ROCK) ||
    (playerSelection === SCISSORS && computerSelection === PAPER)
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function capitalizeString(string) {
  let firstLetter = string.substr(0, 1);
  firstLetter = firstLetter.toUpperCase();
  return firstLetter + string.substr(1).toLowerCase();
}

function createRoundResult(result, playerSelection, computerSelection) {
  let text;
  if (result === "player") {
    text = `You win! ${capitalizeString(
      playerSelection
    )} beats ${capitalizeString(computerSelection)}.`;
  } else if (result === "computer") {
    text = `You lose! ${capitalizeString(
      computerSelection
    )} beats ${capitalizeString(playerSelection)}.`;
  } else {
    text = "Tie!";
  }
  return text;
}

function updateResultText(text) {
  const resultHeading = document.querySelector("#result");
  resultHeading.textContent = text;
}

function updateRoundText() {
  const roundHeader = document.querySelector("#round");
  roundHeader.textContent = `Round ${round}`;
}

function resetPlayerSide() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.removeAttribute("disabled");
    button.classList.remove("hidden");
  });
}

function resetComputerSide() {
  const computerIcon = document.querySelector("#computer");
  computerIcon.classList.remove(
    "rock",
    "paper",
    "scissors",
    "computer-selection"
  );
  computerIcon.classList.add("loading");
}

function prepareNextRound() {
  resetPlayerSide();
  resetComputerSide();

  if (playerScore === MAX_SCORE || computerScore === MAX_SCORE) {
    round = 1;
    playerScore = 0;
    computerScore = 0;
    updatePlayerScoreText();
    updateComputerScoreText();
  } else {
    round++;
  }

  updateRoundText();
  updateResultText("");
}

function updatePlayerScoreText() {
  const score = document.querySelector("#player-side .score");
  score.textContent = `Score: ${playerScore}/${MAX_SCORE}`;
}

function updateComputerScoreText() {
  const score = document.querySelector("#computer-side .score");
  score.textContent = `Score: ${computerScore}/${MAX_SCORE}`;
}

function handleButtonClick(button) {
  let playerSelection = button.textContent;
  let computerSelection = computerPlay();
  let roundWinner = playRound(playerSelection, computerSelection);
  let resultText = createRoundResult(
    roundWinner,
    playerSelection,
    computerSelection
  );
  updateResultText(resultText);

  button.classList.add("selected");
  button.setAttribute("disabled", "true");
  let buttons = Array.from(button.parentElement.children);
  buttons.forEach((otherButton) => {
    if (otherButton.textContent !== button.textContent) {
      otherButton.classList.add("hidden");
    }
  });

  const computerIcon = document.querySelector("#computer");
  computerIcon.classList.remove("loading");
  computerIcon.classList.add(computerSelection, "computer-selection");

  if (roundWinner === "player") {
    playerScore++;
    updatePlayerScoreText();
  } else if (roundWinner === "computer") {
    computerScore++;
    updateComputerScoreText();
  }

  if (playerScore === MAX_SCORE || computerScore === MAX_SCORE) {
    if (playerScore === MAX_SCORE) {
      updateResultText("YOU WIN! Preparing next match...");
    } else {
      updateResultText("YOU LOSE! Preparing next match...");
    }
  }

  setTimeout(prepareNextRound, 3000);
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button);
  });
});
