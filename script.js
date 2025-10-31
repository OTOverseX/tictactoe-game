
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

    if (availableCell.getValue() !== "") return;

    availableCell.addToken(player)
  }
 
  const printBoard = () => {
      const boardWithCellValue = board.map((row) => row.map((cell) => cell.getValue()));
      console.log(boardWithCellValue);
    }

  const getBoard = () => board.map((row) => row.map((cell) => cell.getValue()));

  const clearBoard = () => {
    for (let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        board[i][j] = Cell();
      }
    }
  };
  
  return {pasteToken, printBoard, getBoard, clearBoard};

  
})();





const gamePlay = ((firstPlayerName = "", secondPlayerName = "") => {
  
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
  
  const setPlayerNames = (first, second) => {
    players[0].name = first;
    players[1].name = second;
  }

  
  const changePlayerTurn = () => {
    activePlayer =  activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  

  const printNewBoard = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name} turn`);
  }

  const printBoard = () => {
    gameBoard.printBoard();
  }

  const getFlatBoard = () => {
    return gameBoard.getBoard().flat();
  }
  
  const checkWinning = () => {
    const board = gameBoard.getBoard();
    
    //Check for row winning
    
    for (let i = 0; i <  3; i++){
      if (board[i].every((cell) => cell == getActivePlayer().token ) == true){
        console.log(`${getActivePlayer().name} is the winner`);
        return true;
      }
    }
    // Check for colum winning
    let columnFlip = [];
    for (let i = 0; i < 3; i++){
      columnFlip.push(board.map((row) => row[i]))
    }

    for (let i = 0; i < 3; i++){
      if (columnFlip[i].every((cell) => cell == getActivePlayer().token ) == true){
        console.log(`${getActivePlayer().name} is the winner`);
        return true;
      }
    }

    //Check for Diagonal winning

    if ((board[0][0] ==  board[1][1]) && (board[0][0] ==  board[2][2])  && (board[0][0] != "")){
      console.log(`${getActivePlayer().name} is the winner`);
      return true;
      
    }

    if ((board[0][2] ==  board[1][1]) && (board[0][2] ==  board[2][0]) && (board[0][2] != "") ){
      console.log(`${getActivePlayer().name} is the winner`);
      return true;
    }



  }


  const playRound = (row, column) => {
    gameBoard.pasteToken(row, column, getActivePlayer().token);
    console.log(`${getActivePlayer().name} has played on ${row} row ${column} column`);
    
    if (!checkWinning()){
      changePlayerTurn();
      printNewBoard();
    }

    else{
      printBoard();
    }
    
  }
const resetGameBoard = () => {
  gameBoard.clearBoard();
  activePlayer = players[0];
}

  printNewBoard();

  return {resetGameBoard,setPlayerNames,playRound, getActivePlayer, checkWinning, getFlatBoard};


})();

