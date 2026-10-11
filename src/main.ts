import { Calculator } from "./calculator.js";
import { Watch } from "./watch.js";
import { Timer } from "./timer.js";

const watchContainer = document.querySelector(".watch-container")!;
const timerContainer = document.querySelector(".timer-container")!;
const calContainer = document.querySelector(".calcs-container")!;
let cont = 0;

function createWatch(): void {
  const watch = new Watch();
  const time = document.createElement("p");
  time.classList.add("time");

  watch.watch$.subscribe((value) => {
    const date = new Date(value);
    const hours = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds().toString().padStart(2, "0");

    time.innerText = `${hours}:${min}:${sec}`;
  });
  watchContainer.appendChild(time);
}

function createCalculator(): void {
  const id = `calc-${cont++}`;

  const divCal = document.createElement("div");
  divCal.innerHTML = `<h2>Calculator ${cont}</h2>
                      <div class="calculator" id="${id}"></div>`;
  calContainer.appendChild(divCal);

  new Calculator(`#${id}`);
}

document.addEventListener("DOMContentLoaded", () => {
  createWatch();
  // createTimer();
  createCalculator();

  document
    .querySelector(".addNew")
    ?.addEventListener("click", createCalculator);
});
