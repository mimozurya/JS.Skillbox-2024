function TimerDisplay(seconds) {
    // функция конструктор
    if (typeof seconds !== "number" || seconds < 1) {
        throw new TypeError("Кол-во секунд должно быть числом больше нуля");
    }
    this.startTime = seconds;
    this.currentTime = seconds;
}

const methods = {
    start() {
        // запуск таймера
        this.interval = setInterval(() => this.tick(), 1000);
    },

    pause() {
        // пауза таймера
        clearInterval(this.interval);
    },

    reset() {
        // сброс таймера
        this.pause();
        this.currentTime = this.startTime;
    },

    tick() {
        if (this.currentTime <= 1) {
            this.currentTime = 0;
            this.pause();
            return;
        }
        --this.currentTime;
    },
};

Object.assign(TimerDisplay.prototype, methods); // перемещаем методы в прототип таймера
Object.defineProperty(TimerDisplay.prototype, "currentTime", {
    // самый надежный способ добавления get, set
    set(time) {
        this._currentTime = time;
        if (this.displayElement) {
            this.displayElement.textContent = time;
        }
    },

    get() {
        return this._currentTime;
    },
});
