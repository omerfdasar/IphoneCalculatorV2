const currentElement = document.querySelector(".displayEntry");
const previousElement = document.querySelector(".operatorDisplay");
const acButton = document.querySelector(".AC");
const pmButton = document.querySelector(".plusMinus");
const percentButton = document.querySelector(".percent");

const divisionButton = document.querySelector(".division");
const multiplicationButton = document.querySelector(".multiplication");
const substractionButton = document.querySelector(".substraction");
const additionButton = document.querySelector(".addition");
const equalsButton = document.querySelector(".equal");

const numbers7 = document.querySelector(".numbers7");
const numbers8 = document.querySelector(".numbers8");
const numbers9 = document.querySelector(".numbers9");
const numbers4 = document.querySelector(".numbers4");
const numbers5 = document.querySelector(".numbers5");
const numbers6 = document.querySelector(".numbers6");
const numbers1 = document.querySelector(".numbers1");
const numbers2 = document.querySelector(".numbers2");
const numbers3 = document.querySelector(".numbers3");
const numbers0 = document.querySelector(".numbers0");

const decimalButton = document.querySelector(".coma");

const numberArray = [
  numbers0,
  numbers1,
  numbers2,
  numbers3,
  numbers4,
  numbers5,
  numbers6,
  numbers7,
  numbers8,
  numbers9,
];
let currentOperand = "";
let previousOperand = "";
let operation = undefined;
let temproraryOperand = "";
// functions
function displayNumbers() {
  if (operation) {
    previousElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousElement.innerText = previousOperand;
  }
  currentElement.innerText = currentOperand;
}
function appendNumber(number) {
  // in order not to add more zeroes when there is one
  if (number === 0 && currentOperand === "0") return;
  if (currentOperand.length > 6) {
    return;
  }
  currentOperand = currentOperand.toString() + number.toString();
  displayNumbers();
}
function chooseOperation(selectedOperation) {
  if (temproraryOperand) {
    previousOperand = temproraryOperand.toString();
    currentOperand = "";
    temproraryOperand = "";
    operation = selectedOperation;
    displayNumbers();
    return;
  }
  if (currentOperand === "") return;
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
  displayNumbers();
  currentElement.innerText = "0";
}
function compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  //   in order to prevent first equal to become undefined
  if (typeof previous == undefined || isNaN(previous) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "/":
      computation = previous / current;
      break;

    default:
      break;
  }
  currentOperand = computation;
  previousOperand = "";
  operation = undefined;
  displayNumbers();
  temproraryOperand = currentOperand;
  currentOperand = "";
}

// adding listeners to operators
additionButton.addEventListener("click", () => {
  chooseOperation("+");
});
substractionButton.addEventListener("click", () => {
  chooseOperation("-");
});
multiplicationButton.addEventListener("click", () => {
  chooseOperation("*");
});
divisionButton.addEventListener("click", () => {
  chooseOperation("/");
});
equalsButton.addEventListener("click", () => {
  compute();
});
// adding listeners to AC/PM/percent
acButton.addEventListener("click", () => {
  previousOperand = "";
  currentOperand = "";
  operation = undefined;
  displayNumbers();
  currentElement.innerText = "0";
});
pmButton.addEventListener("click", () => {
  currentOperand = currentOperand * -1;
  displayNumbers();
});
percentButton.addEventListener("click", () => {
  currentOperand = currentOperand / 100;
  displayNumbers();
});
// adding event listeners to numbers
for (let i = 0; i < numberArray.length; i++) {
  numberArray[i].addEventListener("click", () => {
    appendNumber(i);
    temproraryOperand = "";
  });
}
decimalButton.addEventListener("click", () => {
  if (!currentOperand.includes(".")) appendNumber(".");
});
// ----------------------------  setting Time
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const updateTime = () => {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  if (currentHour > 12) {
    currentHour -= 12;
  }
  hour.textContent = currentHour.toString();
  minute.textContent = currentMinute.toString().padStart(2, "0");
};

setInterval(updateTime, 1000);
updateTime();
// finish of setting Time
