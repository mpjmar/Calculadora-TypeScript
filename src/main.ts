import { Calculator } from "./calculator.js";
import { Watch } from "./watch.js";
import { Timer } from "./timer.js";

const watchContainer = document.querySelector(".watch-container")!;
const calContainer = document.querySelector(".calcs-container")!;
let cont = 0;

const time = document.querySelector(".time")!;
const start = document.querySelector(".start")!;
const pause = document.querySelector(".pause")!;
const reset = document.querySelector(".reset")!;
const timer = document.querySelector(".timer")!;

function createWatch(): void {
  const watch = new Watch();
  const time = document.createElement("p");
  time.classList.add("time");

  watch.watch$.subscribe((value) => {
    const date = new Date(value);
    const hours = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds().toString().padStart(2, "0");

    time.textContent = `${hours}:${min}:${sec}`;
  });
  watchContainer.appendChild(time);
}

function createTimer(): void {
  const chrono = new Timer();
  time.textContent = "00:00:00";

  start.addEventListener("click", () => {
    chrono.startCounter();
  });
  pause.addEventListener("click", () => {
    chrono.pauseCounter();
  });
  reset.addEventListener("click", () => {
    chrono.resetCounter();
  });
  timer.addEventListener("click", () => {
    chrono.toggleCountdown();
  });

  chrono.timer$.subscribe((value) => {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor(value / 1000) % 60;
    const decimal = Math.floor(value / 10) % 100;

    const min = minutes.toString().padStart(2, "0");
    const sec = seconds.toString().padStart(2, "0");
    const dec = decimal.toString().padStart(2, "0");

    time.textContent = `${min}:${sec}:${dec}`;
  });
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
  createTimer();
  createCalculator();

  document
    .querySelector(".addNew")
    ?.addEventListener("click", createCalculator);
});
