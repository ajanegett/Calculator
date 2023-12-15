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

function clear() {
  lowScreen.textContent = "";
  upScreen.textContent = "";
}

buttons.forEach((x) => {
  if (!isNaN(Number(x.textContent)) || x.textContent === ".") {
    // is number or dot (.)
    x.addEventListener("click", () => {
      lowScreen.textContent += x.textContent;
    });
  } else if (x.textContent === "Clear") {
    x.addEventListener("click", () => {
      clear();
    });
  } else if (x.textContent === "Delete") {
    x.addEventListener("click", () => {
      let text = lowScreen.textContent;
      lowScreen.textContent = text.slice(0, text.length - 1);
    });
  } else if (
    x.textContent === "-" ||
    x.textContent === "+" ||
    x.textContent === "*" ||
    x.textContent === "/"
  ) {
    x.addEventListener("click", () => {
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
    });
  } else {
    x.addEventListener("click", () => {
      let firstNum = Number(
        upScreen.textContent
          .split("")
          .splice(0, upScreen.textContent.length - 1)
          .join("")
      );
      let secondNum = Number(lowScreen.textContent);
      let operator = upScreen.textContent[upScreen.textContent.length - 1];
      equals(firstNum, secondNum, operator);
    });
  }
});