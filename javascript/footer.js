const footerBlock = document.querySelector("footer");

const keyboardItemsRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keyboardItemsRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keyboardItemsRow3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"];

function createKeyboardBlock(text) {
  const keyboardBlock = document.createElement("div");
  keyboardBlock.className = "keyboard-block";

  if (text === "ENTER") {
    keyboardBlock.style.width = "80px";
    keyboardBlock.innerText = text;
  } else if (text === "BACK") {
    keyboardBlock.style.width = "80px";
    const img = document.createElement("img");
    img.src = "assets/backspace.svg";
    img.alt = "backspace";
    img.style.width = "30px";
    keyboardBlock.appendChild(img);
  } else {
    keyboardBlock.style.width = "50px";
    keyboardBlock.innerText = text;
  }

  return keyboardBlock;
}

function createKeyboardRow(items) {
  const keyboardRow = document.createElement("div");
  keyboardRow.className = "keyboard-row";

  for (let i = 0; i < items.length; i++) {
    keyboardRow.appendChild(createKeyboardBlock(items[i]));
  }
  return keyboardRow;
}

footerBlock.appendChild(createKeyboardRow(keyboardItemsRow1));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow2));
footerBlock.appendChild(createKeyboardRow(keyboardItemsRow3));
