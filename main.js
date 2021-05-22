const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

let playerScore = 0;
let computerScore = 0;

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
    }
    else if (playerSelection === ROCK && computerSelection === SCISSORS ||  
            playerSelection === PAPER && computerSelection === ROCK || 
            playerSelection === SCISSORS && computerSelection === PAPER) {
        return "player";
        }
    else {
        return "computer";
    }
}

function capitalizeString(string) {
    let firstLetter = string.substr(0, 1);
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + string.substr(1).toLowerCase();
}

function showRoundResult(result, playerSelection, computerSelection) {
    let text;
    if (result === "player") {
        text = `You win! ${capitalizeString(playerSelection)} beats ${capitalizeString(computerSelection)}.`;
    } else if (result === "computer") {
        text = `You lose! ${capitalizeString(computerSelection)} beats ${capitalizeString(playerSelection)}.`;
    } else {
        text = "Tie!";
    }

    const resultHeading = document.querySelector("#result");
    resultHeading.textContent = text;
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
        let playerSelection = button.textContent;
        let computerSelection = computerPlay();
        let roundWinner = playRound(playerSelection, computerSelection);
        showRoundResult(roundWinner, playerSelection, computerSelection);

        button.classList.add("selected");
        button.setAttribute("disabled", "true");
        buttons.forEach(otherButton => {
            if (otherButton.textContent !== button.textContent) {
                otherButton.classList.add("hidden");
            }
        });

        const loadingIcon = document.querySelector("#computer");
        loadingIcon.classList.remove("loading");
        loadingIcon.classList.add(computerSelection, "computer-selection");

        if (roundWinner === "player") {
            playerScore++;
            const score = document.querySelector("#player-side .score");
            score.textContent = `Score: ${playerScore}`;
        } else if (roundWinner === "computer") {
            computerScore++;
            const score = document.querySelector("#computer-side .score");
            score.textContent = `Score: ${computerScore}`;
        }
    });
});