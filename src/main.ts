import { Calculator } from "./calculator";
import { BasicCalculator } from "./calculator";

const container = document.querySelector(".calculators");
let counter = 0;

function create(): void {
  const id = `calc-${counter++}`;

  const divCal = document.createElement("div");
  divCal.innerHTML = `<h2>Calculadora ${counter}</h2>`;
}
