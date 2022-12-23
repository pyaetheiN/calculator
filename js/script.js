const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = ''; // used as a reference
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  
  chooseOperation(operation) {
    if (this.currentOperand === '') return 
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation; // *
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default: // else
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString(); // convert an object into a string for split function to work
    const integarDigits = parseFloat(stringNumber.split('.')[0]); // numbers before split / need to be parsed to check isNaN()
    const decimalDigits = stringNumber.split('.')[1]; // numbers after split / don't need to be a parsed
    // summary: converting number to string first for split function to work then parsing it to check isNaN()
    let integarDisplay;
    if (isNaN(integarDigits)) { // if there aren't numbers
      integarDisplay = ''; // then show nothing eg. -> .1 or 0.1
    } else {
      integarDisplay = integarDigits.toLocaleString('en');
    }
    if (decimalDigits != null) {
      return `${integarDisplay}.${decimalDigits}`;
    } else {
      return integarDisplay;
    }
  }
  

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) { // undefined == null -> true / undefined === null -> false
      this.previousOperandTextElement.innerText = `
        ${this.getDisplayNumber(this.previousOperand)} ${this.operation}
      `;
    } else { // if operation is null
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})