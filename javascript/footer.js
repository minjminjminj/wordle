const footerBlock = document.querySelector("footer");

const keyboardItemsRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keyboardItemsRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keyboardItemsRow3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"];

function createKeyboardColumn(text) {
  const keyboardColumn = document.createElement("div");
  keyboardColumn.className = "keyboard-column";
  keyboardColumn.setAttribute("data-key", text);

  if (text === "ENTER") {
    keyboardColumn.className = "keyboard-column wide";
    keyboardColumn.innerText = text;
  } else if (text === "BACK") {
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

function createKeyboardRow(items) {
  const keyboardRow = document.createElement("div");
  keyboardRow.className = "keyboard-row";

  for (let i = 0; i < items.length; i++) {
    keyboardRow.appendChild(createKeyboardColumn(items[i]));
  }
  return keyboardRow;
}

footerBlock.appendChild(createKeyboardRow(keyboardItemsRow1));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow2));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow3));
