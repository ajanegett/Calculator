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

buttons.forEach((x) => {
  if (!isNaN(Number(x.textContent)) || x.textContent === ".") {
    x.addEventListener("click", () => {
      lowScreen.textContent += x.textContent;
    });
  }
  else if (x.textContent === "Clear"){
    x.addEventListener("click", () => {
      lowScreen.textContent= ""
    })
  }
});
