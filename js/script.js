const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperantTextElement = document.querySelector('[data-previous-operand]');
const currentOperantTextElement = document.querySelector('[data-current-operand]');

class Calculator{
  constructor(previousOperantTextElement, currentOperantTextElement){
    this.previousOperantTextElement = previousOperantTextElement;
    this.currentOperantTextElement = currentOperantTextElement;
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
    this.operation = operation;
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
    this.previousOperand = '';
    this.currentOperand = computation;
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperantTextElement.innerText = this.currentOperand;
    this.previousOperantTextElement.innerText = this.previousOperand;
  }
}

const calculator = new Calculator(previousOperantTextElement, currentOperantTextElement);

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