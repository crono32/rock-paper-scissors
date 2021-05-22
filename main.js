const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

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

    let message;
    if (playerSelection === computerSelection) {
        showResult("Tie!");
    }
    else if (playerSelection === ROCK && computerSelection === SCISSORS ||  
    playerSelection === PAPER && computerSelection === ROCK || 
    playerSelection === SCISSORS && computerSelection === PAPER) {
        showResult(`You win! ${capitalizeString(playerSelection)} beats ${capitalizeString(computerSelection)}.`);
        }
    else {
        showResult(`You lose! ${capitalizeString(computerSelection)} beats ${capitalizeString(playerSelection)}.`);
    }
}

function capitalizeString(string) {
    let firstLetter = string.substr(0, 1);
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + string.substr(1).toLowerCase();
}

function showResult(result) {
    const resultHeading = document.querySelector("#result");
    resultHeading.textContent = result;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    
    let playerSelection;
    let computerSelection;
    let roundWinner;

    console.log(`Final scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}.`);
    
    if (playerScore > computerScore) {
        console.log("You win!");
    } else if (playerScore < computerScore) {
        console.log("You lose!");
    } else {
        console.log("Tie!");
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        let playerSelection = button.textContent;
        let computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        button.classList.add("selected");
        button.setAttribute("disabled", "true");
        buttons.forEach(otherButton => {
            if (otherButton.textContent !== button.textContent) {
                otherButton.classList.add("hidden");
            }
        });

        const loadingIcon = document.querySelector("#computer-selection");
        loadingIcon.classList.remove("loading");
    });
});