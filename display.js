const cells =  document.querySelectorAll('.cell');

const test = document.querySelector(`[data-row="${0}"][data-column="${0}"]`)
const anotherTest = document.querySelector(`[class="roundBoard"][id="test"]`);

const screenContoller = (() => {
    
    const updateScreen = (row, column) => {
        
            const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
            cell.textContent =  gamePlay.getActivePlayer().token;
    }
    return {updateScreen}
})();

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        const row = e.currentTarget.dataset.row;
        const column = e.currentTarget.dataset.column;
        screenContoller.updateScreen(parseInt(row), parseInt(column));
        gamePlay.playRound(parseInt(row), parseInt(column));
    })
})