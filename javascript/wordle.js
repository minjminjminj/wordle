const toast = document.querySelector(".toast");
const gameOverPopup = document.querySelector(".game-over-popup");
const gameOverMsg = document.querySelector(".game-over-popup__msg");
const gameTimeMsg = document.querySelector(".game-over-popup__time");
const popupExitBtn = document.querySelector(".game-over-popup__exit-btn");
let answerCnt = 0;
let isGameOver = false;
let rowIdx = 0;
let colIdx = 0;
let preBoardItemColIdx = -1; // backspace 입력 시 pre-boardItem 찾기 위한 column index
const boardItemAnimationDuration = 350;
const gameOverToastDuration = 3000;
const wrongMsgToastDuration = 1500;

// .keyboard-column에 click 이벤트 리스너 등록
const keyboardColumns = document.querySelectorAll(".keyboard-column");
for (let keyboardColumn of keyboardColumns) {
  keyboardColumn.addEventListener("click", (e) => handleKeyboard(e, ""));
}

// keydown 이벤트 리스너 등록
document.addEventListener("keydown", (e) => {
  const convertedKey = keyboardMap[e.key] || e.key.toUpperCase();

  if (
    keyboardItemsRow1.includes(convertedKey) ||
    keyboardItemsRow2.includes(convertedKey) ||
    keyboardItemsRow3.includes(convertedKey)
  ) {
    handleKeyboard(e, convertedKey);
  }
});

// .game-over-popup__exit-btn 클릭 시 popup display: none
popupExitBtn.addEventListener("click", () => {
  gameOverPopup.style.display = "none";
});

// toast animation
function animateToast(text, duration) {
  toast.innerText = text;
  toast.animate(
    [
      {
        opacity: "0",
      },
      {
        opacity: "1",
      },
      {
        opacity: "1",
      },
      {
        opacity: "0",
      },
    ],
    duration
  );
}

// 글자 수가 부족할 때 ENTER 입력 시 .boardRow 좌우로 떨리는 animation
function animateBoardRow(boardRow) {
  boardRow.animate(
    [
      {
        transform: "translate(0, 0)",
      },
      {
        transform: "translate(-8px, 0)",
      },
      {
        transform: "translate(8px, 0)",
      },
      {
        transform: "translate(-6px, 0)",
      },
      {
        transform: "translate(6px, 0)",
      },
      {
        transform: "translate(-6px, 0)",
      },
      {
        transform: "translate(6px, 0)",
      },
      {
        transform: "translate(-4px, 0)",
      },
      {
        transform: "translate(4px, 0)",
      },
      {
        transform: "translate(0px, 0)",
      },
    ],
    boardItemAnimationDuration * 2
  );
}

// 정답 입력 시 board item이 위로 튀어오르는 animation
function animateAnswer(boardItems) {
  for (let i = 0; i < boardItems.length; i++) {
    boardItems[i].animate(
      [
        {
          transform: "translate(0, 0)",
        },
        {
          transform: "translate(0, -15px)",
        },
        {
          transform: "translate(0, 5px)",
        },
        {
          transform: "translate(0, 0)",
        },
      ],
      {
        duration: boardItemAnimationDuration * 2,
        delay: boardItemAnimationDuration * (colLen + i),
      }
    );
  }
}

// ENTER 시 board item 순차적으로 뒤집히는 animation -> 글자가 뒤집히지 않게 하기 위해 span 태그로 감싸서 구현
function animateBoardItem(boardItem, idx) {
  boardItem.style.animation = `rotate-boardItem ${
    boardItemAnimationDuration * 2 * 0.001
  }s ease-in-out`;

  boardItem.style.animationDelay =
    idx * boardItemAnimationDuration * 0.001 + "s";

  boardItem.firstChild.style.animation = `rotate-span ${
    boardItemAnimationDuration * 2 * 0.001
  }s ease-in-out`;

  boardItem.firstChild.style.animationDelay =
    idx * boardItemAnimationDuration * 0.001 + "s";
}

// game over toast, game over popup
function gameOver(msg, time) {
  clearInterval(timerInterval);

  setTimeout(
    animateToast,
    boardItemAnimationDuration * (colLen + 1),
    msg === "YOU LOSE!" ? answer : msg,
    gameOverToastDuration
  );

  setTimeout(
    showGameOverPopup,
    boardItemAnimationDuration * (colLen + 2) + gameOverToastDuration,
    msg,
    time
  );
}

function showGameOverPopup(msg, time) {
  gameOverPopup.style.display = "block";
  gameOverMsg.innerText = msg;
  gameTimeMsg.innerText = "Time Taken: " + time;
}

// 정답 확인 후 board item 색상 return
function getBoardItemColor(idx, boardItem) {
  if (answer.charAt(idx) === boardItem) {
    return "green";
  } else if (answer.includes(boardItem)) {
    return "yellow";
  } else {
    return "gray";
  }
}

// board item color 변경
function changeBoardItemColor(boardItem, color) {
  boardItem.style.backgroundColor = `var(--color-${color})`;
  boardItem.style.borderColor = `var(--color-${color})`;
  boardItem.style.color = "white";
}

// keyboard item color 변경
function changeKeyboardItemColor(boardItem, color) {
  const keyboardItem = document.querySelector(
    `[data-key="${boardItem.firstChild.innerText}"]`
  );
  if (keyboardItem.style.backgroundColor !== `var(--color-green)`) {
    keyboardItem.style.backgroundColor = `var(--color-${color})`;
    keyboardItem.style.color = "white";
  }
}

// 정답 검사 후 애니메이션 효과와 board & keyboard 색상 변경
function handleEnter(rowIdx) {
  isGameOver = false;
  answerCnt = 0;

  const boardItems = []; // 입력된 row의 board item 배열
  for (let i = 0; i < colLen; i++) {
    boardItems[i] = document.querySelector(`[data-index="${rowIdx}${i}"]`);
  }

  for (let i = 0; i < colLen; i++) {
    animateBoardItem(boardItems[i], i);

    // board item 뒤집힐 때 board 색상 변경
    // board item animation 끝나면 keyboard 색상 변경
    const color = getBoardItemColor(i, boardItems[i].firstChild.innerText);
    setTimeout(
      changeBoardItemColor,
      boardItemAnimationDuration * (i + 1),
      boardItems[i],
      color
    );
    setTimeout(
      changeKeyboardItemColor,
      boardItemAnimationDuration * (colLen + 1),
      boardItems[i],
      color
    );

    if (color === "green") {
      answerCnt++;
    }
  }

  // 정답 입력 시 game over toast & popup
  if (answerCnt === answer.length) {
    animateAnswer(boardItems);
    gameOver("YOU WIN!", timerElement.innerText);
    isGameOver = true;
  }
}

// board item update
function updateBoardItem(input) {
  const boardItem = document.querySelector(`[data-index="${rowIdx}${colIdx}"]`);
  if (!boardItem.hasChildNodes()) {
    boardItem.style.borderColor = "var(--color-gray)";
    const textSpan = document.createElement("span");
    textSpan.innerText = input;
    boardItem.appendChild(textSpan);
    preBoardItemColIdx = colIdx;
    colIdx++;
  }
}

// pre board item remove
function removePreBoardItem() {
  const preBoardItem = document.querySelector(
    `[data-index="${rowIdx}${preBoardItemColIdx}"]`
  );
  if (preBoardItem.hasChildNodes()) {
    preBoardItem.removeChild(preBoardItem.firstChild);
    preBoardItem.style.borderColor = "var(--color-lightgray)";
    preBoardItemColIdx--;
    colIdx--;
  }
}

// keyboard handler
function handleKeyboard(e, key) {
  if (rowIdx > rowLen - 1 || colIdx > colLen || isGameOver) return;

  let input;

  if (e.type === "keydown") {
    input = key;
  } else if (e.type === "click") {
    input = e.currentTarget.getAttribute("data-key");
  }

  const currentBoardRow = document.querySelector(`[row-index="${rowIdx}"]`);

  if (input === "ENTER") {
    // ENTER 입력 시
    if (colIdx === colLen) {
      // 글자 수 맞으면 정답 검사
      if (rowIdx === rowLen - 1) {
        gameOver("YOU LOSE!", timerElement.innerText);
      }
      handleEnter(rowIdx);
      rowIdx++;
      colIdx = 0;
    } else {
      // 글자 수 부족하면 toast
      animateToast("Not enough letters", wrongMsgToastDuration);
      animateBoardRow(currentBoardRow);
    }
  } else if (input === "BACKSPACE") {
    // BACKSPACE 입력 시
    if (preBoardItemColIdx < 0) return;
    removePreBoardItem();
  } else {
    // 유효한 키 입력 시 board item에 text span 추가
    if (colIdx > colLen - 1) return;
    updateBoardItem(input);
  }
}
