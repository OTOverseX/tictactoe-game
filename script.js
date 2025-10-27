function Cell(){
  let value = "";

  const getValue = () => value;

  const addToken = (player) => {
    value = player;
  }

  return {getValue, addToken};
}

const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
}

  

  const pasteToken = (row, column, player) => {

    const availableCell = board[row][column];
    if (availableCell.getValue() === ""){
      availableCell.addToken(player);
    }
  }

  const printBoard = () => {
      const boardWithCellValue = board.map((row) => row.map((cell) => cell.getValue()));
      console.log(boardWithCellValue);
    }

  return {pasteToken, printBoard};
})();





const gamePlay = ((firstPlayerName = "Player1", secondPlayerName = "Player2") => {

  const players = [
    {
      "name" : firstPlayerName,
      "token" : "X"
    },

    {
      "name" : secondPlayerName,
      "token" : "O"
    }

    
  ]

  let activePlayer = players[0];

  const changePlayerTurn = () => {
    activePlayer =  activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewBoard = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name} turn`);
  }

  const playRound = (row, column) => {
    gameBoard.pasteToken(row, column, getActivePlayer().token);
    console.log(`${getActivePlayer().name} has played on ${row} row ${column} column`);

    /* Check for a winner at this area else it will keep changing playerTurn
     and printNewBoard*/
    changePlayerTurn();
    printNewBoard();
  }


  printNewBoard();

  return {playRound, getActivePlayer };


})();



