const key = document.getElementById("char");
const displayElement = document.getElementById("main-display");
const inputElement = document.getElementById("input");
const operationButtons = document.querySelectorAll("[data-operation]");
window.addEventListener("keydown", animateButton);

let firstOperand = "";
let secondOperand = "";
let lastOperation = 0;
let ansOperation = 0;
let currentOperation = null;
const operators = ["+", "-", "x", "÷", "EXP"];

//operation buttons listeners
operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {
    getOperation(operation.innerText);
  });
});

function getOperation(operator) {
  currentOperation = operator;
  console.log(operator);
  firstOperand = inputElement.innerText.split(operator).join("");
  if (!!lastOperation) inputElement.innerText = lastOperation;
}

//Operations
function add(a, b) {
  lastOperation = Number.isInteger(Number(a) + Number(b))
    ? Number(a) + Number(b)
    : (Number(a) + Number(b)).toPrecision(4);
  ansOperation = lastOperation;
  displayElement.innerText = lastOperation;
}

function subtract(a, b) {
  lastOperation = Number.isInteger(Number(a) - Number(b))
    ? Number(a) - Number(b)
    : (Number(a) - Number(b)).toPrecision(4);
  ansOperation = lastOperation;
  displayElement.innerText = lastOperation;
}

function multiply(a, b) {
  lastOperation = Number.isInteger(Number(a) * Number(b))
    ? Number(a) * Number(b)
    : (Number(a) * Number(b)).toPrecision(4);
  ansOperation = lastOperation;
  displayElement.innerText = lastOperation;
}

function divide(a, b) {
  lastOperation = Number.isInteger(Number(a) / Number(b))
    ? Number(a) / Number(b)
    : (Number(a) / Number(b)).toPrecision(4);
  ansOperation = lastOperation;
  displayElement.innerText = lastOperation;
}

function exponentiatial(a, b) {
  lastOperation = Number(a || 1)
    .toExponential(Number(b))
    .toPrecision(10);
  displayElement.innerText = lastOperation;
}

// !Not implemented
function multipleMultiply(array) {
  let result = 1;

  for (let arr of array) {
    result = result * arr;
  }

  return result;
}

// !Not implemented
function sum(array) {
  let counter = 0;

  for (let arr of array) {
    counter += arr;
  }

  return counter;
}

// !Not implemented
function power(a, b) {
  return Math.pow(a, b);
}

// !Not implemented
function factorial(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorial(num - 1);
  }
}

//UI
key.onclick = function (e) {
  e.preventDefault();
  e = e || window.event;

  if (!!e.srcElement.attributes["data-key"]) {
    let keyCode = e.srcElement.attributes["data-key"].nodeValue;

    const key = document.querySelector(`button[data-key="${keyCode}"`);
    if (key === null) return;

    key.classList.add("active");
    setTimeout(() => {
      removeTransition();
    }, 200);

    setDisplay(key.innerText);
  }
};

function deleteLastChar() {
  inputElement.innerText = inputElement.innerText.slice(0, -1);
}

function clearDisplay() {
  (inputElement.innerText = ""), (displayElement.innerText = "0");
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
  lastOperation = 0;
}

function addDot(str, input) {
  let inputSecondOperand = input.split(currentOperation);

  if (str === "." && !input.includes(".")) {
    //If first operand does not includes dot
    inputElement.innerText = inputElement.innerText + ".";
  } else if (
    str === "." &&
    firstOperand.includes(".") &&
    !inputSecondOperand[inputSecondOperand.length - 1].includes(".")
  ) {
    //If first operand already includes dot and second operand does not includes dot
    inputElement.innerText = inputElement.innerText + ".";
  } else {
    inputElement.innerText = inputElement.innerText;
  }
}

function operate() {
  inputSecondOperand = input.innerText.split(currentOperation);
  secondOperand = inputSecondOperand[inputSecondOperand.length - 1];

  if (currentOperation === operators[0]) add(firstOperand, secondOperand);
  if (currentOperation === operators[1]) subtract(firstOperand, secondOperand);
  if (currentOperation === operators[2]) multiply(firstOperand, secondOperand);
  if (currentOperation === operators[3]) divide(firstOperand, secondOperand);
  if (currentOperation === operators[4]) {
    inputSecondOperand = input.innerText.split("E");
    secondOperand = inputSecondOperand[inputSecondOperand.length - 1];
    exponentiatial(firstOperand, secondOperand);
  }
  operateDisplay();
}

function operateDisplay() {
  if (!currentOperation && firstOperand === "")
    return (displayElement.innerText = `${input.innerText.slice(0, 13)}`);
  if (!currentOperation)
    return (displayElement.innerText = displayElement.innerText);
  if (currentOperation && (!secondOperand || !firstOperand))
    return (displayElement.innerText = "Syntax ERROR");

  return (input.innerText = `${input.innerText}`);
}

function operateAns() {
  displayElement.innerText = `${ansOperation}`;
}

function setDisplay(str) {
  let input = document.getElementById("input").innerText;
  let displayInnerText = document.getElementById("main-display").innerText;

  if (displayInnerText.length > 0) {
    if (str === "DEL") return deleteLastChar();
    if (str === "Ans") return operateAns();
    if (str === "EXP")
      return (inputElement.innerText = inputElement.innerText + "E");
    if (str === "AC") return clearDisplay();
    if (str === ".") return addDot(str, input);
    if (str === "=") return operate();

    if (input.length <= 13) {
      inputElement.innerText += str;
    } else {
      inputElement.innerText = inputElement.innerText;
    }
  }
}

function removeTransition() {
  const activeButton = document.querySelector(".active");
  if (activeButton === null) return;
  activeButton.classList.remove("active");
}

function animateButton(e) {
  e.preventDefault();

  const key = document.querySelector(`button[data-key="${e.keyCode}"`);
  if (key === null) return;
  key.classList.add("active");

  for (const keyOp of operators) {
    key.innerText.includes(keyOp) ? getOperation(key.innerText) : false;
  }

  setDisplay(key.innerText);
  setTimeout(() => {
    removeTransition();
  }, 200);
}

function turnOn() {
  let displayInnerText = document.getElementById("main-display").innerText;

  if (displayInnerText.length > 0) {
    displayElement.innerText = "CAS10";
    setTimeout(() => {
      displayElement.innerText = "";
      inputElement.classList.remove("input");
      inputElement.innerText = "";
    }, 500);
  } else {
    clearDisplay();
    inputElement.classList.add("input");
  }
}

window.onload = () => {
  turnOn();
};
