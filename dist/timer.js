import { interval, map } from "rxjs";
export class Timer {
    startTime = 0;
    stopTime = 0;
    isRunning = false;
    isTimerOn = false;
    countdownStart = 0;
    timer$ = interval(10).pipe(map(() => {
        if (!this.isRunning)
            return this.stopTime;
        else if (this.isRunning && !this.isTimerOn)
            return Date.now() - this.startTime;
        else {
            const timeLeft = Math.max(this.countdownStart - (Date.now() - this.startTime), 0);
            if (timeLeft === 0) {
                this.isRunning = false;
                this.stopTime = 0;
                this.countdownStart = 0;
            }
            return timeLeft;
        }
    }));
    startCounter() {
        if (!this.isRunning) {
            if (!this.isTimerOn) {
                this.startTime = Date.now() - this.stopTime;
            }
            else {
                if (this.stopTime === 0)
                    return;
                this.countdownStart = this.stopTime;
                this.startTime = Date.now();
            }
            this.isRunning = true;
        }
    }
    pauseCounter() {
        if (this.isRunning) {
            if (!this.isTimerOn) {
                this.stopTime = Date.now() - this.startTime;
            }
            else {
                this.stopTime = this.countdownStart - (Date.now() - this.startTime);
            }
            this.isRunning = false;
        }
    }
    resetCounter() {
        this.stopTime = 0;
        this.countdownStart = 0;
        this.isRunning = false;
    }
    toggleCountdown() {
        if (!this.isTimerOn) {
            // Pasamos de cronómetro a Countdown
            if (this.isRunning) {
                this.countdownStart = Date.now() - this.startTime;
                this.startTime = Date.now();
            }
            else {
                this.countdownStart = this.stopTime;
            }
            this.isTimerOn = true;
        }
        else {
            // Pasamos de Countdown a cronómetro
            if (this.isRunning) {
                const timeLeft = Math.max(this.countdownStart - (Date.now() - this.startTime), 0);
                this.stopTime = timeLeft;
                this.startTime = Date.now() - this.stopTime;
            }
            this.isTimerOn = false;
        }
    }
}
