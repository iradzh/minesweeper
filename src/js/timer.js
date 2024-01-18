let counter = 0;
let timerInterval;
let isOver = false;

function startTimer() {
  isOver = false;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!isOver) {
    counter++;
    const minutes = Math.floor(counter / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (counter % 60).toString().padStart(2, "0");
    document.querySelector(".board__timer").innerText = `${minutes}:${seconds}`;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  counter = 0;
  document.querySelector(".board__timer").innerText = "00:00";
}

function stopTimer() {
  isOver = true;
  const minutes = Math.floor(counter / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (counter % 60).toString().padStart(2, "0");
  document.querySelector(".board__timer").innerText = `${minutes}:${seconds}`;
}

function getTimer() {
  return counter;
}

export { startTimer, resetTimer, stopTimer, getTimer };
