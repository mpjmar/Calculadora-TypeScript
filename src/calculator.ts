export class Calculator {
  // --- Estado (propiedades) -------------------
  private actValue: string = "0";
  private prevValue: string | null = null;
  private actOperator: string | null = null;
  private displResult: boolean = false;
  private decPoint: boolean = true;

  // --- Referencias al DOM ---------------------
  private calculator!: HTMLDivElement;
  private display!: HTMLDivElement;
  private buttons!: HTMLDivElement;
  private backspace!: HTMLButtonElement;
  private deleteEntry!: HTMLButtonElement;
  private deleteAll!: HTMLButtonElement;
  private operationButtons: HTMLButtonElement[] = [];
  private numberButtons: HTMLButtonElement[] = [];
  private equalsButton!: HTMLButtonElement;
  private decimalButton!: HTMLButtonElement;

  constructor(div: string) {
    this.calculator = document.querySelector<HTMLDivElement>(div)!;
    this.displayCalculator();
    this.cacheElements();
    this.setupEventListeners();
  }

  private displayCalculator(): void {
    this.calculator.innerHTML = `
      <div class="display">0</div>
        <div class="buttons">
          <button class="btn backspace"><-</button>
          <button class="btn delete-entry">CE</button>
          <button class="btn delete-all">C</button>
          <button class="btn operation">÷</button>

          <button class="btn number">7</button>
          <button class="btn number">8</button>
          <button class="btn number">9</button>
          <button class="btn operation">x</button>

          <button class="btn number">4</button>
          <button class="btn number">5</button>
          <button class="btn number">6</button>
          <button class="btn operation">-</button>

          <button class="btn number">1</button>
          <button class="btn number">2</button>
          <button class="btn number">3</button>
          <button class="btn operation">+</button>

          <button class="btn number">0</button>
          <button class="btn decimal">.</button>
          <button class="btn equals">=</button>
        </div>`;
  }

  private cacheElements(): void {
    this.display = this.calculator.querySelector<HTMLDivElement>(".display")!;
    this.numberButtons = [
      ...this.calculator.querySelectorAll<HTMLButtonElement>(".number"),
    ];
    this.operationButtons = [
      ...this.calculator.querySelectorAll<HTMLButtonElement>(".operation"),
    ];
    this.equalsButton =
      this.calculator.querySelector<HTMLButtonElement>(".equals")!;
    this.decimalButton =
      this.calculator.querySelector<HTMLButtonElement>(".decimal")!;
    this.deleteEntry =
      this.calculator.querySelector<HTMLButtonElement>(".delete-entry")!;
    this.deleteAll =
      this.calculator.querySelector<HTMLButtonElement>(".delete-all")!;
    this.backspace =
      this.calculator.querySelector<HTMLButtonElement>(".backspace")!;
  }

  // ─── Asignación de eventos ───────────────────────────
  private setupEventListeners(): void {
    this.numberButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.displayNumber(button.textContent ?? "0"),
      );
    });
    this.operationButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.handleOperator(button.textContent ?? "+"),
      );
    });
    this.equalsButton.addEventListener("click", () =>
      this.calculateOperation(),
    );
    this.decimalButton.addEventListener("click", () =>
      this.displayDecimalPoint(),
    );
    this.deleteEntry.addEventListener("click", () => this.deleteLastEntrie());
    this.deleteAll.addEventListener("click", () => this.deleteAllEntries());
    this.backspace.addEventListener("click", () => this.goBackspace());
  }

  // ─── Funciones ───────────────────────────
  private updateDisplay(): void {
    while (this.actValue.length > 12)
      this.actValue = this.actValue.slice(0, -1);

    if (this.actValue.includes(".")) {
      this.decimalButton.classList.add("disabled");
      this.decPoint = false;
    } else {
      this.decimalButton.classList.remove("disabled");
      this.decPoint = true;
    }
    this.display.textContent = this.actValue;
  }

  private displayNumber(num: string): void {
    if (this.displResult) {
      this.actValue = num;
      this.displResult = false;
      this.actOperator = null;
      this.prevValue = null;
    } else if (this.actValue === "0") {
      this.actValue = num;
    } else {
      this.actValue += num;
    }
    this.updateDisplay();
  }

  private handleOperator(operator: string): void {
    if (
      this.actOperator !== null &&
      this.prevValue !== null &&
      !this.displResult
    ) {
      this.calculateOperation();
    }
    this.prevValue = this.actValue;
    this.actOperator = operator;
    this.actValue = "0";
    this.displResult = false;

    this.display.textContent = `${this.prevValue}${operator}`;

    // this.updateDisplay();
  }

  private calculateOperation(): void {
    if (this.actOperator === null || this.prevValue === null) return;

    const num1 = Number.parseFloat(this.prevValue);
    const num2 = Number.parseFloat(this.actValue);
    let result = 0;

    switch (this.actOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
      case "*":
        result = num1 * num2;
        break;
      case "÷":
      case "/":
        if (num2 === 0) {
          this.actValue = "Error";
          this.actOperator = null;
          this.prevValue = null;
          this.displResult = true;
          this.display.textContent = this.actValue;
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    this.actValue = String(this.round(result));
    this.displResult = true;
    this.actOperator = null;
    this.prevValue = null;

    this.updateDisplay();
  }

  private displayDecimalPoint(): void {
    if (!this.decPoint) return;
    this.actValue += ".";
    this.updateDisplay();
  }

  private deleteLastEntrie(): void {
    this.actValue = "0";
    this.updateDisplay();
  }

  private deleteAllEntries(): void {
    this.actValue = "0";
    this.prevValue = null;
    this.actOperator = null;
    this.displResult = false;
    this.updateDisplay();
  }

  private goBackspace(): void {
    this.actValue = this.actValue.slice(0, -1);
    if (this.actValue === "") this.actValue = "0";
    this.updateDisplay();
  }

  private round(n: number, dec: number = 10): number {
    return Number(n.toFixed(dec));
  }
}
