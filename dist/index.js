"use strict";
class Calculadora {
    firstNumber = 0;
    operation = "";
    secondNumber = 0;
    hasDecimal = false;
}
class CalculadoraBasica extends Calculadora {
    operations = ["+", "-", "x", "÷"];
    sumar = () => this.firstNumber + this.secondNumber;
    restar = () => this.firstNumber - this.secondNumber;
    multiplicar = () => this.firstNumber * this.secondNumber;
    dividir = () => this.firstNumber / this.secondNumber;
}
const calculadora = new CalculadoraBasica();
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
for (const button of buttons) {
    button.addEventListener("click", () => {
        if (display) {
            if (button.textContent === "C") {
                calculadora.firstNumber = 0;
                calculadora.operation = "";
                calculadora.secondNumber = 0;
                display.textContent = "0";
            }
            else if (button.textContent === "CE") {
                display.textContent = "0";
            }
            else if (button.textContent === "<-") {
                display.textContent = display.textContent.slice(0, -1);
                if (display.textContent.length === 0) {
                    display.textContent = "0";
                }
            }
            else if (calculadora.operations.includes(button.textContent)) {
                calculadora.operation = button.textContent;
                calculadora.firstNumber = Number(display.textContent);
                calculadora.hasDecimal = false;
                display.textContent = calculadora.operation;
            }
            else if (button.textContent === "=") {
                calculadora.secondNumber = Number(display.textContent);
                displayResult(calculadora.operation);
                /* switch (calculadora.operation) {
                  case "+":
                    display.textContent = String(calculadora.sumar());
                    break;
                  case "-":
                    display.textContent = String(calculadora.restar());
                    break;
                  case "x":
                    display.textContent = String(calculadora.multiplicar());
                    break;
                  case "÷":
                    if (calculadora.secondNumber === 0) {
                      display.textContent = "Error";
                    } else {
                      display.textContent = String(calculadora.dividir());
                    }
                    break;
                  default:
                    display.textContent = "Error";
                    break;
                } */
            }
            else if (display.textContent === "0") {
                display.textContent = button.textContent;
            }
            else if (calculadora.operations.includes(display.textContent)) {
                display.textContent = button.textContent;
            }
            else {
                display.textContent += button.textContent;
            }
        }
    });
}
function displayResult(operation) {
    switch (operation) {
        case "+":
            display.textContent = String(calculadora.sumar());
            break;
        case "-":
            display.textContent = String(calculadora.restar());
            break;
        case "x":
            display.textContent = String(calculadora.multiplicar());
            break;
        case "÷":
            if (calculadora.secondNumber === 0) {
                display.textContent = "Error";
            }
            else {
                display.textContent = String(calculadora.dividir());
            }
            break;
        default:
            display.textContent = "Error";
            break;
    }
}
