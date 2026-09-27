"use strict";
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
let firstNumber = 0;
let operation = "";
let secondNumber = 0;
const operations = ["+", "-", "x", "÷"];
for (const button of buttons) {
    button.addEventListener("click", () => {
        if (display) {
            if (button.textContent === "C") {
                firstNumber = 0;
                operation = "";
                secondNumber = 0;
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
            else if (operations.includes(button.textContent)) {
                operation = button.textContent;
                firstNumber = Number(display.textContent);
                display.textContent = operation;
            }
            else if (button.textContent === "=") {
                secondNumber = Number(display.textContent);
                switch (operation) {
                    case "+":
                        display.textContent = String(firstNumber + secondNumber);
                        break;
                    case "-":
                        display.textContent = String(firstNumber - secondNumber);
                        break;
                    case "x":
                        display.textContent = String(firstNumber * secondNumber);
                        break;
                    case "÷":
                        display.textContent = String(firstNumber / secondNumber);
                        break;
                    default:
                        display.textContent = "Error";
                        break;
                }
            }
            else if (display.textContent === "0") {
                display.textContent = button.textContent;
            }
            else if (operations.includes(display.textContent)) {
                display.textContent = button.textContent;
            }
            else {
                display.textContent += button.textContent;
            }
        }
    });
}
