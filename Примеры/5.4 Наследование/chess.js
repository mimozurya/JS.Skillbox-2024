class ChessFigure {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    set position(position) {
        if (!Array.isArray(position) || position.length !== 2) {
            throw new TypeError("Позиция должна быть массивом из 2-х чисел");
        }
        position = position.map((pos) => {
            pos = Number(pos);
            if (pos < 0) return 0;
            if (pos > 7) return 7;
            return pos;
        });
        this._x = position[0];
        this._y = position[1];
    }

    get position() {
        return [this._x, this._y];
    }
}

class Pawn extends ChessFigure {
    // пешки, extends - родительский
    constructor(x, color) {
        const pos = [x, color === "white" ? 1 : 6];
        super(pos, color); // super - обращение к членам родительского класса
    }
    move() {
        const move = this.color === "white" ? 1 : -1;
        this.position = [this.position[0], this.position[1] + move];
    }
}
