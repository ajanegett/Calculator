let lowScreen = document.querySelector(".lower");
let upScreen = document.querySelector(".upper");
let calculator = document.querySelector(".Calculator");
let buttons = document.querySelectorAll("button");

function operate(x, y, operator) {
  if (operator == "+") {
    return x + y;
  }
  if (operator == "-") {
    return x - y;
  }
  if (operator == "*") {
    return x * y;
  } else {
    return x / y;
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
      if (lowScreen.textContent === "") {
        return "no num before, error thus";
      } else {
        upScreen.textContent = lowScreen.textContent + x.textContent;
        lowScreen.textContent = "";
      }
    });
  } else {
    x.addEventListener("click", () => {
      if (
        lowScreen.textContent === "" ||
        upScreen.textContent === "" ||
        Number.isInteger(+upScreen.textContent.slice(-1))
      ) {
        return;
      } else {
        let firstNum = Number(
          upScreen.textContent
            .split("")
            .splice(0, upScreen.textContent.length - 1)
            .join("")
        );
        let secondNum = Number(lowScreen.textContent);
        let operator = upScreen.textContent[upScreen.textContent.length - 1];
        upScreen.textContent += lowScreen.textContent;
        lowScreen.textContent = operate(firstNum, secondNum, operator);
      }
    });
  }
});
