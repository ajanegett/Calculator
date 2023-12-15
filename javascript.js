let lowScreen = document.querySelector(".lower");
let upScreen = document.querySelector(".upper");
let calculator = document.querySelector(".Calculator");
let buttons = document.querySelectorAll("button");

function operate(x, y, operator) {
  if (operator == "+") {
    return (x + y).toFixed(2);
  }
  if (operator == "-") {
    return (x - y).toFixed(2);
  }
  if (operator == "*") {
    return (x * y).toFixed(2);
  } else {
    return (x / y).toFixed(2);
  }
}
function equals(firstNum, secondNum, operator, isTheEqualsButton = true) {
  if (
    lowScreen.textContent === "" ||
    upScreen.textContent === "" ||
    Number.isInteger(+upScreen.textContent.slice(-1)) ||
    !Number.isInteger(+lowScreen.textContent.slice(-1)) ||
    !Number(lowScreen.textContent)
  ) {
    return;
  } else {
    if (secondNum === 0 && operator === "/") {
      alert("Can't divide by zero!");
      return;
    }
    if (isTheEqualsButton) {
      upScreen.textContent += lowScreen.textContent;
      lowScreen.textContent = operate(firstNum, secondNum, operator);
    } else {
      upScreen.textContent = operate(firstNum, secondNum, operator);
      lowScreen.textContent = "";
    }
  }
}

function numberFunc(x) {
  lowScreen.textContent += x.target.textContent;
}

function clear() {
  lowScreen.textContent = "";
  upScreen.textContent = "";
}

function btnDel() {
  let text = lowScreen.textContent;
  lowScreen.textContent = text.slice(0, text.length - 1);
}

function forOperators(e) {
  let x = e.target;
  if (lowScreen.textContent === "" || !Number(lowScreen.textContent)) {
    return;
  } else if (!Number.isInteger(+upScreen.textContent.slice(-1))) {
    // if not integer
    let firstNum = Number(
      upScreen.textContent
        .split("")
        .splice(0, upScreen.textContent.length - 1)
        .join("")
    );
    let secondNum = Number(lowScreen.textContent);
    let operator = upScreen.textContent.slice(-1);
    equals(firstNum, secondNum, operator, false);
    upScreen.textContent += x.textContent;
  } else {
    upScreen.textContent = lowScreen.textContent + x.textContent;
    lowScreen.textContent = "";
  }
}

function forEquals() {
  let firstNum = Number(
    upScreen.textContent
      .split("")
      .splice(0, upScreen.textContent.length - 1)
      .join("")
  );
  let secondNum = Number(lowScreen.textContent);
  let operator = upScreen.textContent[upScreen.textContent.length - 1];
  equals(firstNum, secondNum, operator);
}

buttons.forEach((x) => {
  if (!isNaN(Number(x.textContent)) || x.textContent === ".") {
    // is number or dot (.)
    x.addEventListener("click", numberFunc);
  } else if (x.textContent === "Clear") {
    x.addEventListener("click", clear);
  } else if (x.textContent === "Delete") {
    x.addEventListener("click", btnDel);
  } else if (
    x.textContent === "-" ||
    x.textContent === "+" ||
    x.textContent === "*" ||
    x.textContent === "/"
  ) {
    x.addEventListener("click", forOperators);
  } else {
    x.addEventListener("click", forEquals);
  }
});

const timer = document.querySelector(".timer");
timer.textContent = "";

function setTime() {
  const d = new Date();
  timer.textContent = d.toLocaleTimeString();
}
setTime();
setInterval(setTime, 1000);

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (!isNaN(Number(e.key)) || e.key === ".") {
    console.log(e.key);
    lowScreen.textContent += e.key;
  }
  if (
    e.key === "-" ||
    e.key === "+" ||
    e.key === "*" ||
    (e.shiftKey && e.key === "/")
  ) {
    if (lowScreen.textContent === "" || !Number(lowScreen.textContent)) {
      return;
    } else if (!Number.isInteger(+upScreen.textContent.slice(-1))) {
      // if not integer
      let firstNum = Number(
        upScreen.textContent
          .split("")
          .splice(0, upScreen.textContent.length - 1)
          .join("")
      );
      let secondNum = Number(lowScreen.textContent);
      let operator = upScreen.textContent.slice(-1);
      equals(firstNum, secondNum, operator, false);
      upScreen.textContent += e.key;
    } else {
      upScreen.textContent = lowScreen.textContent + e.key;
      lowScreen.textContent = "";
    }
  }
  if (e.key === "Enter") {
    forEquals();
  }
  if (e.key === "Backspace") {
    btnDel();
  }
  if (e.key === "c") {
    clear()
  }
});
