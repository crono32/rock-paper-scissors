function computerPlay() {
  let randomNum = Math.floor(Math.random() * 3);
  if (randomNum === 0) {
      return "Rock";
  } else if (randomNum === 1) {
      return "Paper";
  } 
  return "Scissors";
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
      return "tie";
  }
  else if (playerSelection === "rock" && computerSelection === "scissors"
      || playerSelection === "paper" && computerSelection === "rock"
      || playerSelection === "scissors" && computerSelection === "paper") {
          return "player";
      }
  return "computer";
}

function capitalizeString(string) {
  let firstLetter = string.substr(0, 1);
  firstLetter = firstLetter.toUpperCase();
  return firstLetter + string.substr(1);
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  
  let playerSelection;
  let computerSelection;
  let roundWinner;

  for (let i = 0; i < 5; i++) {
      playerSelection = capitalizeString(prompt("Rock, paper, or scissors?"));
      computerSelection = capitalizeString(computerPlay());
      roundWinner = playRound(playerSelection, computerSelection);

      if (roundWinner === "tie") {
          console.log("Tie!");
      } else if (roundWinner === "player") {
          playerScore++;
          console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
      } else {
          computerScore++;
          console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
      }
  }

  console.log(`Final scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}.`)
  
  if (playerScore > computerScore) {
      console.log("You win!");
  } else if (playerScore < computerScore) {
      console.log("You lose!");
  } else {
      console.log("Tie!");
  }
}

game();