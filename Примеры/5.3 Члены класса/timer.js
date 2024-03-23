export default class TimerDisplay {
    constructor(seconds) {
        if (typeof seconds !== "number" || seconds < 1) {
            throw new TypeError("Кол-во секунд должно быть числом больше нуля");
        }
        this.startTime = seconds;
        this.currentTime = seconds;
    }

    set currentTime(time) {
        this._currentTime = time;
        if (this.displayElement) {
            this.displayElement.textContent = time;
        }
    }

    get currentTime() {
        return this._currentTime;
    }

    get elapsedTime() {
        return this.startTime - this.currentTime;
    }

    start() {
        // запуск таймера
        this.interval = setInterval(() => this.tick(), 1000);
    }

    pause() {
        // пауза таймера
        clearInterval(this.interval);
    }

    reset() {
        // сброс таймера
        this.pause();
        this.currentTime = this.startTime;
    }

    tick() {
        if (this.currentTime <= 1) {
            this.currentTime = 0;
            this.pause();
            return;
        }
        --this.currentTime;
    }

    getComponentElement() {
        if (this.rootElement) return this.rootElement;

        const root = document.createElement("div");
        const currentTimeDisplay = document.createElement("div");
        const startButton = document.createElement("button");
        const pauseButton = document.createElement("button");
        const resetButton = document.createElement("button");

        root.classList.add("timer-display");
        currentTimeDisplay.classList.add("timer-display__current");
        startButton.classList.add("timer-display__start");
        pauseButton.classList.add("timer-display__pause");
        resetButton.classList.add("timer-display__reset");

        root.append(currentTimeDisplay);
        root.append(startButton);
        root.append(pauseButton);
        root.append(resetButton);

        startButton.textContent = "Старт";
        pauseButton.textContent = "Пауза";
        resetButton.textContent = "Сброс";

        startButton.addEventListener("click", () => this.start());
        pauseButton.addEventListener("click", () => this.pause());
        resetButton.addEventListener("click", () => this.reset());

        this.rootElement = root;
        this.displayElement = currentTimeDisplay;
        this.displayElement.textContent = this.currentTime;

        return root;
    }
}
