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

function createKeyboardColumn(rowIdx, colIdx) {
  const boardColumn = document.createElement("div");
  boardColumn.className = "board-column";
  boardColumn.setAttribute("row-index", rowIdx);
  boardColumn.setAttribute("col-index", colIdx);
  return boardColumn;
}

function createKeyboardRow(rowIdx) {
  const boardRow = document.createElement("div");
  boardRow.className = "board-row";

  for (let i = 0; i < 5; i++) {
    boardRow.appendChild(createKeyboardColumn(rowIdx, i));
  }
  return boardRow;
}

for (let i = 0; i < 6; i++) {
  mainBlock.appendChild(createKeyboardRow(i));
}
