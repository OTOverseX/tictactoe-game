const cells =  document.querySelectorAll('.cell');
const roundBoard = document.querySelector(".roundBoard");
const winning = document.querySelector('.winning');
const startPlayerInfo = document.querySelectorAll(`[data-modal-target]`);
const endPlayerInfo = document.querySelectorAll(`[data-close-button]`);
const reset = document.querySelectorAll(`[data-close-button]`)


startPlayerInfo.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

endPlayerInfo.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.playerInfo');
        closeModal(modal);
    })
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
        }
    }
    
    return {updateScreen, checkDomWinning}
})();

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        const row = e.currentTarget.dataset.row;
        const column = e.currentTarget.dataset.column;
        
        if (cell.textContent !== "") return;
        screenContoller.updateScreen(parseInt(row), parseInt(column));
        gamePlay.playRound(parseInt(row), parseInt(column));
        screenContoller.checkDomWinning();
        roundBoard.textContent = `${gamePlay.getActivePlayer().name} turn`;
        
    })
})