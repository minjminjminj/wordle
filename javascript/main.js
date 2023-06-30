const rowLen = 6; // row length
const colLen = 5; // column length
const answer = "APPLE"; // wordle answer

const mainBlock = document.querySelector("main");
const footerBlock = document.querySelector("footer");

// .keyboard-column innerText 초기화를 위한 배열
const keyboardItemsRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keyboardItemsRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keyboardItemsRow3 = [
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACKSPACE",
];

// 한글 자판 입력시 영어 자판으로 매핑하기 위한 객체
const keyboardMap = {
  ㅂ: "Q",
  ㅈ: "W",
  ㄷ: "E",
  ㄱ: "R",
  ㅅ: "T",
  ㅛ: "Y",
  ㅕ: "U",
  ㅑ: "I",
  ㅐ: "O",
  ㅔ: "P",
  ㅁ: "A",
  ㄴ: "S",
  ㅇ: "D",
  ㄹ: "F",
  ㅎ: "G",
  ㅗ: "H",
  ㅓ: "J",
  ㅏ: "K",
  ㅣ: "L",
  ㅋ: "Z",
  ㅌ: "X",
  ㅊ: "C",
  ㅍ: "V",
  ㅠ: "B",
  ㅜ: "N",
  ㅡ: "M",
};
const timerElement = document.querySelector(".timer");
const startTime = new Date();

// game timer
function setTime() {
  const currentTime = new Date();
  const elapsedTime = new Date(currentTime - startTime);
  const min = elapsedTime.getMinutes().toString().padStart(2, "0");
  const sec = elapsedTime.getSeconds().toString().padStart(2, "0");
  timerElement.innerText = `${min}:${sec}`;
}
const timerInterval = setInterval(setTime, 1000);

// .board-column 동적 생성 함수
function createBoardColumn(rowIdx, colIdx) {
  const boardColumn = document.createElement("div");
  boardColumn.className = "board-column";
  boardColumn.setAttribute("data-index", String(rowIdx) + String(colIdx));
  return boardColumn;
}

// .board-row 동적 생성 함수
function createBoardRow(rowIdx) {
  const boardRow = document.createElement("div");
  boardRow.className = "board-row";
  boardRow.setAttribute("row-index", rowIdx);

  for (let i = 0; i < colLen; i++) {
    boardRow.appendChild(createBoardColumn(rowIdx, i));
  }
  return boardRow;
}

// main에 board 추가
for (let i = 0; i < rowLen; i++) {
  mainBlock.appendChild(createBoardRow(i));
}

// .keyboard-column 동적 생성 함수
function createKeyboardColumn(text) {
  const keyboardColumn = document.createElement("div");
  keyboardColumn.className = "keyboard-column";
  keyboardColumn.setAttribute("data-key", text);

  if (text === "ENTER") {
    keyboardColumn.className = "keyboard-column wide";
    keyboardColumn.innerText = text;
  } else if (text === "BACKSPACE") {
    keyboardColumn.className = "keyboard-column wide";
    const img = document.createElement("img");
    img.src = "assets/backspace.svg";
    img.alt = "backspace";
    keyboardColumn.appendChild(img);
  } else {
    keyboardColumn.innerText = text;
  }

  return keyboardColumn;
}

// .keyboard-row 동적 생성 함수
function createKeyboardRow(items) {
  const keyboardRow = document.createElement("div");
  keyboardRow.className = "keyboard-row";

  for (let i = 0; i < items.length; i++) {
    keyboardRow.appendChild(createKeyboardColumn(items[i]));
  }
  return keyboardRow;
}

// footer에 keyboard 추가
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow1));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow2));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow3));
