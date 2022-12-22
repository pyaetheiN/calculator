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
  }

  clear() {

  }

  delete() {

  }

  appendNumber(number) {

  }
  
  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
    
  }
}