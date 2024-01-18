import { checkMine } from "./checkMine";
import { startTimer, stopTimer, getTimer } from "./timer";
import { setMines, revealMines } from "./mines";

import { playSound } from "./sound";

export function createTiles(gameState) {
  for (let r = 0; r < gameState.size; r++) {
    let row = [];
    for (let c = 0; c < gameState.size; c++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");

      if (gameState.size === 15) {
        tile.classList.add("tile-medium");
      } else if (gameState.size === 25) {
        tile.classList.add("tile-hard");
      }
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener("click", () => {
        clickTile(gameState, tile);
      });
      document.querySelector(".board__container").append(tile);
      row.push(tile);
    }
    gameState.board.push(row);
  }
}

function clickTile(gameState, tile) {
  if (gameState.gameOver || tile.classList.contains("tile-clicked")) {
    return;
  }

  if (gameState.flagEnabled) {
    if (tile.innerText == "" && gameState.flagCounter < gameState.minesCount) {
      gameState.flagCounter += 1;
      document.querySelector(".flag-counter").innerText =
        "🚩 " + gameState.flagCounter;
      document.querySelector(".mines-left-counter").innerText = `💣 ${
        gameState.minesCount - gameState.flagCounter
      }`;

      playSound("./assets/sound/put-flag.mp4");
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      gameState.flagCounter -= 1;
      document.querySelector(".flag-counter").innerText =
        "🚩 " + gameState.flagCounter;
      document.querySelector(".mines-left-counter").innerText = `💣 ${
        gameState.minesCount - gameState.flagCounter
      }`;
      tile.innerText = "";
    }
    return;
  }

  if (!gameState.isInitialised) {
    setMines(tile.id, gameState);
    startTimer();
    gameState.isInitialised = true;
  } else if (gameState.minesLocation.includes(tile.id)) {
    loseGame(gameState);
    return;
  }
  playSound("./assets/sound/click-tile.mp4");
  let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  gameState.tilesClicked += 1;
  document.querySelector(".board__clicks").innerText = gameState.tilesClicked;

  checkMine(r, c, gameState);
  let openTiles = document.querySelectorAll(".tile-clicked").length;
  if (openTiles == gameState.size * gameState.size - gameState.minesCount) {
    winGame(gameState);
  }
}

function winGame(gameState) {
  playSound("./assets/sound/win.mp4");
  gameState.gameOver = true;
  endGame(
    `Hooray! You found all mines \n in ${getTimer()} seconds and ${
      gameState.tilesClicked
    } moves!`
  );
  stopTimer();
  revealMines(gameState);
}

function loseGame(gameState) {
  playSound("./assets/sound/mine.mp4");
  stopTimer();
  gameState.gameOver = true;
  revealMines(gameState);

  document.querySelector(".board__button__icon").src =
    "assets/emoji/sad-face.png";
  endGame("Game Over! \n Start again");
}

function endGame(message) {
  document.querySelector(".end_message__text").innerText = message;
  document.querySelector(".end_message").style.display = "block";
}
