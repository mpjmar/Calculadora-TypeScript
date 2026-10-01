export class Calculator {
  firstNumber = 0;
  operation = "";
  secondNumber = 0;
  hasDecimal = false;
  sign = "";

  display = this.calculator.querySelector(".display");
  buttons = this.calculator.querySelectorAll(".btn");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      if (this.display) {
        if (button.textContent === "C") {
          this.firstNumber = 0;
          this.operation = "";
          this.secondNumber = 0;
          this.display.textContent = "0";
        } else if (button.textContent === "CE") {
            this.display.textContent = "0";
        } else if (button.textContent === "<-") {
            this.display.textContent = this.display.textContent.slice(0, -1);
            if (this.display.textContent.length === 0) {
              this.display.textContent = "0";
          }
        } else if (BasicCalculator.operations.includes(button.textContent)) {
            this.operation = button.textContent;
            this.firstNumber = Number(this.display.textContent);
            this.hasDecimal = false;
            this.display.textContent = this.operation;
        } else if (button.textContent === "=") {
            this.secondNumber = Number(this.display.textContent);
            displayResult(this.operation);
        } else if (this.display.textContent === "0") {
            this.display.textContent = button.textContent;
        } else if (BasicCalculator.operations.includes(this.display.textContent)) {
            this.display.textContent = button.textContent;
        } else {
            this.display.textContent += button.textContent;
        }
      }
    });
  }
}

export class BasicCalculator extends Calculator {
  operations: string[] = ["+", "-", "x", "÷"];

  sumar = (): number => this.firstNumber + this.secondNumber;
  restar = (): number => this.firstNumber - this.secondNumber;
  multiplicar = (): number => this.firstNumber * this.secondNumber;
  dividir = (): number => this.firstNumber / this.secondNumber;
}

function displayResult(operation: string) {
  switch (operation) {
    case "+":
      display!.textContent = String(calculator.sumar());
      break;
    case "-":
      display!.textContent = String(calculator.restar());
      break;
    case "x":
      display!.textContent = String(calculator.multiplicar());
      break;
    case "÷":
      if (calculator.secondNumber === 0) {
        display!.textContent = "Error";
      } else {
        display!.textContent = String(calculator.dividir());
      }
      break;
    default:
      display!.textContent = "Error";
      break;
  }
}
