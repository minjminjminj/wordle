const mainBlock = document.querySelector("main");

const timerElement = document.querySelector(".timer");
const startTime = new Date();

function setTime() {
  const currentTime = new Date();
  const elapsedTime = new Date(currentTime - startTime);
  const min = elapsedTime.getMinutes().toString().padStart(2, "0");
  const sec = elapsedTime.getSeconds().toString().padStart(2, "0");
  timerElement.innerText = `${min}:${sec}`;
}

setInterval(setTime, 1000);

function createKeyboardBlock() {
  const boardBlock = document.createElement("div");
  boardBlock.className = "board-block";
  return boardBlock;
}

function createKeyboardRow() {
  const boardRow = document.createElement("div");
  boardRow.className = "board-row";

  for (let i = 0; i < 5; i++) {
    boardRow.appendChild(createKeyboardBlock());
  }
  return boardRow;
}

for (let i = 0; i < 6; i++) {
  mainBlock.appendChild(createKeyboardRow());
}
