import { settings } from './js/settings';
import { resetTimer } from './js/timer';
import { createTiles } from './js/tiles';
import { toggleVolume } from './js/sound';

let gameState = {
  board: [],
  size: 10,
  minesCount: 10,
  minesLocation: [],
  tilesClicked: 0,
  flagEnabled: 0,
  gameOver: false,
  isInitialised: false,
  flagCounter: 0
};

let byeMessage = document.createElement('div');
byeMessage.classList.add('end_message');

let messageContent = document.createElement('div');
messageContent.classList.add('end_message__content');
byeMessage.appendChild(messageContent);

let messageText = document.createElement('p');
messageText.classList.add('end_message__text');
messageContent.appendChild(messageText);

let closeButton = document.createElement('span');
closeButton.classList.add('end_message__close');
closeButton.innerHTML = '&times;';
closeButton.addEventListener('click', function () {
  document.querySelector('.end_message').style.display = 'none';
});
messageContent.appendChild(closeButton);
document.body.append(byeMessage);

window.onload = function () {
  setFavicon('assets/emoji/favicon.png');
  settings();

  const levelContainer = document.getElementById('level-container');

  levelContainer.addEventListener('change', handleLevelChange);
  const boardContainer = document.createElement('div');
  boardContainer.classList.add('board__container');
  document.body.append(boardContainer);

  const countersContainer = document.createElement('div');
  countersContainer.classList.add('counters-container');

  const flagCounterCountainer = document.createElement('p');
  flagCounterCountainer.classList.add('flag-counter');
  flagCounterCountainer.innerHTML = '🚩 0';
  countersContainer.append(flagCounterCountainer);

  const minesLeftCounter = document.createElement('p');
  minesLeftCounter.classList.add('mines-left-counter');
  minesLeftCounter.innerText = '💣 ' + gameState.minesCount;
  countersContainer.append(minesLeftCounter);

  document.body.append(countersContainer);

  const flagButton = document.createElement('button');
  flagButton.id = 'flag-button';
  flagButton.innerText = '🚩';
  document.body.append(flagButton);

  let selectedValue = document.getElementById('selectedValue');

  function minesCounter() {
    selectedValue.textContent = document.getElementById('bombCount').value;
    gameState.minesCount = document.getElementById('bombCount').value;
    minesLeftCounter.innerText = document.getElementById('bombCount').value;
  }

  document.getElementById('bombCount').addEventListener('input', minesCounter);

  document
    .querySelector('.board__button__icon')
    .addEventListener('click', restartGame);

  document.body.append(byeMessage);
  createGame(gameState.size);

  let volumeButton = document.getElementById('volumeButton');
  volumeButton.addEventListener('click', toggleVolume);
};

function handleLevelChange(event) {
  const selectedLevel = event.target.value;
  createGame(parseInt(selectedLevel));
}

function cleanBoard() {
  document.querySelector('.board__container').innerHTML = '';
  gameState.board = [];
}

function createGame(levelSize) {
  cleanBoard();
  document.getElementById('flag-button').addEventListener('click', setFlag);
  gameState.size = levelSize;

  createTiles(gameState);
}

function setFlag() {
  if (gameState.flagEnabled) {
    gameState.flagEnabled = false;
    document.getElementById('flag-button').style.backgroundColor = '#f7f7f7';
  } else {
    gameState.flagEnabled = true;
    document.getElementById('flag-button').style.backgroundColor = '#e0bdc5';
  }
}

function restartGame() {
  document.querySelector('.end_message').style.display = 'none';
  gameState.minesLocation = [];
  gameState.tilesClicked = 0;
  gameState.flagCounter = 0;
  document.querySelector('.flag-counter').innerText =
    '🚩 ' + gameState.flagCounter;
  gameState.gameOver = false;
  gameState.isInitialised = false;
  document.querySelector('.board__button__icon').src = 'assets/emoji/smile.png';
  resetTimer();

  document.querySelector('.board__clicks').innerText = '0';
  createGame(gameState.size);
}

function setFavicon(url) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = url;
  document.head.appendChild(link);
}
