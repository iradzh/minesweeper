export function setMines(firstClickCoordinate, gameState) {
  let minesLeft = gameState.minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * gameState.size);
    let c = Math.floor(Math.random() * gameState.size);
    let id = r.toString() + "-" + c.toString();

    if (!gameState.minesLocation.includes(id) && firstClickCoordinate != id) {
      gameState.minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

export function revealMines(gameState) {
  for (let r = 0; r < gameState.size; r++) {
    for (let c = 0; c < gameState.size; c++) {
      let tile = gameState.board[r][c];
      if (gameState.minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "#ec3e2a";
      }
    }
  }
}
