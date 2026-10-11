import { Calculator } from "./calculator.js";

const calContainer = document.querySelector(".calculators")!;
let cont = 0;

function createCalculator(): void {
  const id = `calc-${cont++}`;

  const divCal = document.createElement("div");
  divCal.innerHTML = `<h2>Calculator ${cont}</h2>
                      <div class="calculator" id="${id}"></div>`;
  calContainer.appendChild(divCal);

  new Calculator(`#${id}`);
}

document.addEventListener("DOMContentLoaded", () => {
  createCalculator();

  document
    .querySelector("#add-calc")
    ?.addEventListener("click", createCalculator);
});
