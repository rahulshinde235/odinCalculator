//Your calculator should not evaluate more than a single pair of numbers at a time.

let operand1 = null;
let operand2 = null;
let operator = null;
let isFirstNumber = true;
let isCalculate = false;
const sumElem = document.querySelector(".calculate");
const container = document.querySelector(".container");
const display = document.querySelector(".display");

const operatorConst = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
  "%": (a, b) => a % b,
};

function calculate(operand1, operand2, operator) {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  if (operand2 === 0 && operator === "/") {
    //Handle divide by zero exception
    return "Lmao do better";
  }
  if (operatorConst[operator]) {
    return operatorConst[operator](operand1, operand2);
  } else {
    console.error("Invalid operator");
    return 0;
  }
}
sumElem.addEventListener("click", (e) => {
  e.stopPropagation();

  if (operand1 != null && operand2 != null && operator != null) {
    const sum = calculate(operand1, operand2, operator);

    if (typeof sum === "string") {
      updateDisplay(sum);
      resetState(true);
    } else {
      operand1 = Number.isInteger(sum) ? sum : sum.toFixed(1);
      operand2 = null;
      operator = null;
      updateDisplay(`${operand1} `);
    }
  }
});
container.addEventListener("click", function (e) {
  //AC button reset state
  if (e.target.hasAttribute("data-reset")) {
    resetState();
    return;
  }

  const value = e.target.value;
  const isNumberElement = e.target.hasAttribute("data-number");
  const isOperatorElement = e.target.hasAttribute("data-operator");

  if (isNumberElement) {
    if (isFirstNumber && operator === null) {
      if (value === "." && (operand1 === null || operand1.includes("."))) {
        return;
      }
      operand1 = operand1 ? operand1 + value : value;
      updateDisplay(`${operand1} `);
    } else if (operator !== null) {
      if (value === "." && (operand2 === null || operand2.includes("."))) {
        return;
      }
      operand2 = operand2 ? operand2 + value : value;
      updateDisplay(`${operand1} ${operator} ${operand2}`);
    }
  } else if (isOperatorElement) {
    if (operator !== null && operand2 !== null) {
      sumElem.click();
      return;
    }

    operator = value;
    isFirstNumber = false;
    updateDisplay(`${operand1}${operator ? ` ${operator} ` : ""}`);
  }
});

function resetState(keepMsg = false) {
  operand1 = null;
  operand2 = null;
  operator = null;
  isFirstNumber = true;
  updateDisplay(keepMsg ? display.innerText : "");
}

function updateDisplay(str) {
  display.innerText = str;
}
