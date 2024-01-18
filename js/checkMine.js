export function checkMine(r, c, gameState) {
  if (r < 0 || r >= gameState.size || c < 0 || c >= gameState.size) {
    return;
  }
  if (gameState.board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  gameState.board[r][c].classList.add("tile-clicked");

  let minesFound = 0;

  //top 3
  minesFound += checkTile(r - 1, c - 1, gameState); //top left
  minesFound += checkTile(r - 1, c, gameState); //top
  minesFound += checkTile(r - 1, c + 1, gameState); //top right

  //left and right
  minesFound += checkTile(r, c - 1, gameState); //left
  minesFound += checkTile(r, c + 1, gameState); //right

  //bottom 3
  minesFound += checkTile(r + 1, c - 1, gameState); //bottom left
  minesFound += checkTile(r + 1, c, gameState); //bottom
  minesFound += checkTile(r + 1, c + 1, gameState); //bottom right

  if (minesFound > 0) {
    gameState.board[r][c].innerText = minesFound;
    gameState.board[r][c].classList.add("x" + minesFound.toString());
  } else {
    //top 3
    checkMine(r - 1, c - 1, gameState); //top left
    checkMine(r - 1, c, gameState); //top
    checkMine(r - 1, c + 1, gameState); //top right

    //left and right
    checkMine(r, c - 1, gameState); //left
    checkMine(r, c + 1, gameState); //right

    //bottom 3
    checkMine(r + 1, c - 1, gameState); //bottom left
    checkMine(r + 1, c, gameState); //bottom
    checkMine(r + 1, c + 1, gameState); //bottom right
  }
}

function checkTile(r, c, gameState) {
  if (r < 0 || r >= gameState.size || c < 0 || c >= gameState.size) {
    return 0;
  }
  if (gameState.minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}
