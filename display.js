const cells =  document.querySelectorAll('.cell');
const roundBoard = document.querySelector(".roundBoard");
const winning = document.querySelector('.winning');
const startPlayerInfo = document.querySelectorAll(`[data-modal-target]`);
const endPlayerInfo = document.querySelectorAll(`[data-close-button]`);
const submit = document.querySelector(`.submit`);
const playerOne = document.querySelector(`[name="player1"]`);
const playerTwo = document.querySelector(`[name="player2"]`);
const playerOneName = document.querySelector('.playerOneName');
const playerTwoName = document.querySelector('.playerTwoName');
const playerOneDisplay = document.querySelector('.playerOneDisplay');
const playerTwoDisplay = document.querySelector('.playerTwoDisplay');

let storeFirstPlayerName;
let storeSecondPlayerName;
startPlayerInfo.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
        button.textContent = "Restart Game";
    })
})

endPlayerInfo.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.playerInfo');
        closeModal(modal);
    })
})

submit.addEventListener('click', (e) => {
    if (playerOne.value == "" || playerTwo.value == "") return;
    e.preventDefault();
    playerOneName.textContent = playerOne.value
    playerTwoName.textContent = playerTwo.value;
    gamePlay.setPlayerNames(playerOne.value, playerTwo.value);
    storeFirstPlayerName =  playerOne.value;
    storeSecondPlayerName = playerTwo.value;
    playerOne.value = "";
    playerTwo.value = "";
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
    })

   gamePlay.resetGameBoard();
   winning.textContent = "";
   
})

function openModal(modal){
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal){
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
const screenContoller = (() => {
    
    const updateScreen = (row, column) => {
        
            const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
            cell.textContent =  gamePlay.getActivePlayer().token;
    }

    const checkDomWinning = () => {
        const flatBoard = gamePlay.getFlatBoard().every((item) => item !== "");
        const hasWon = gamePlay.checkWinning();

        if (hasWon || flatBoard ){
            
            winning.textContent = hasWon ? `${gamePlay.getActivePlayer().name} is the winner` : "It is a draw";
            
            cells.forEach((cell) => cell.style.pointerEvents = "none");
            return true;
            
        }

        
    }
    
    return {updateScreen, checkDomWinning}
})();

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        const row = e.currentTarget.dataset.row;
        const column = e.currentTarget.dataset.column;
        if(gamePlay.getActivePlayer().name == "") return;
        if (cell.textContent !== "") return;
        screenContoller.updateScreen(parseInt(row), parseInt(column));
        gamePlay.playRound(parseInt(row), parseInt(column));
       
        if(cell.textContent == "X"){
           
            cell.style.cssText = `color:green`;
            playerTwoName.textContent = `${gamePlay.getActivePlayer().name} turn`;
            playerTwoDisplay.style.cssText = `color: red`;
            playerOneDisplay.style.cssText = `color:black`;
            
            
            
            
        }
        else if(cell.textContent == "O"){
            cell.style.cssText = `color:red`;
            playerOneDisplay.style.cssText = `color:green`;
            playerOneName.textContent = `${gamePlay.getActivePlayer().name} turn`;
            playerTwoDisplay.style.cssText = `color:black`;
            
            
        }
         

        if (screenContoller.checkDomWinning()){
            playerOneDisplay.style.cssText = `color:black`;
            playerTwoDisplay.style.cssText = `color:black`;
            playerOneName.textContent = `${storeFirstPlayerName}`
            playerTwoName.textContent = `${storeSecondPlayerName}`;
        }
    
        
    })
})