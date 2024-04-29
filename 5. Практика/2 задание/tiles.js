class Card {
    constructor(container, cardNumber, tilesArray) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.tilesArray = tilesArray;
        this.tileElement = this.createElement(tilesArray);
    }
    createElement(tilesArray) {
        let tile = document.createElement("div");
        tile.innerHTML = tilesArray[this.cardNumber];
        tile.classList.add("tile", "close");
        this.container.appendChild(tile);
        return tile;
    }

    set open(value) {
        console.log(value, "open");
        if (value) {
            this.tileElement.classList.remove("close");
        } else {
            this.tileElement.classList.add("close");
        }
    }
    get open() {
        return !this.tileElement.classList.contains("close");
    }

    set success(value) {
        console.log(value, "success");
        if (value) {
            this.tileElement.classList.add("open");
        } else {
            this.tileElement.classList.remove("open");
        }
    }
    get success() {
        return this.tileElement.classList.contains("open");
    }
}

class AmazingCard extends Card {
    constructor(container, cardNumber, tilesArray) {
        super(container, cardNumber, tilesArray);
        this.tileElement.innerHTML = `<img src="icon/${
            tilesArray[this.cardNumber]
        }.png" alt="card image">`;
    }
    createElement(tilesArray) {
        let tile = document.createElement("div");
        tile.innerHTML = `<img src="icon/${tilesArray[this.cardNumber]}.png" alt="card image">`;
        tile.classList.add("tile", "close");
        this.container.appendChild(tile);
        return tile;
    }
}

(function () {
    function createNumbersArray(count) {
        array = [];
        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < 2; j++) {
                array.push(i);
            }
        }
        return array;
    }

    function shuffle(arr) {
        arr.sort(() => Math.random() - 0.5);
        return arr;
    }

    function startGame(container, count) {
        let tilesArray = createNumbersArray(count);
        tilesArray = shuffle(tilesArray);
        let arrOfTiles = [];
        for (let cardNumber = 0; cardNumber < tilesArray.length; cardNumber++) {
            arrOfTiles[cardNumber] = new AmazingCard(container, cardNumber, tilesArray);
        }
        Game(count, arrOfTiles);
    }

    function Game(count, arrOfTiles) {
        let index = 0;
        let tempVariable = 0;
        let counter = 0;

        arrOfTiles.forEach((tile) => {
            tile.tileElement.addEventListener("click", () => {
                if (!index) {
                    tile.open = true;
                    console.log(tile);
                    tempVariable = tile;
                    index++;
                } else {
                    if (index > 0 && tile !== tempVariable) {
                        tile.open = true;
                        if (tile.tileElement.innerHTML === tempVariable.tileElement.innerHTML) {
                            index = 0;
                            tile.success = true;
                            tempVariable.success = true;
                            counter += 2;
                            if (counter === count * 2) {
                                repeatGame();
                            }
                        } else {
                            index = -1; // чтобы не кликали на другие кнопки пока можно посмотреть на две выбранные
                            tile.open = true;
                            tempVariable.open = true;
                            setTimeout(() => {
                                tile.open = false;
                                tempVariable.open = false;
                                index = 0;
                            }, 500);
                        }
                    }
                }
            });
        });
    }

    function repeatGame() {
        let button = document.createElement("button");
        button.textContent = "Сыграть еще раз";
        button.classList.add("btn");
        document.body.append(button);
        let input = document.querySelector(".input");
        input.value = "Успел!";

        button.onclick = function () {
            window.location.reload();
        };
    }

    function createNumbers() {
        let form = document.querySelector(".form");
        let input = document.createElement("input");
        let text = document.querySelector(".text");
        input.classList.add("input");
        form.append(input);

        input.onchange = function () {
            const value = input.value;
            if (+value > 1 && +value < 11 && +value % 2 === 0) {
                startGame(document.getElementById("signs"), +value);

                text.textContent = "Осталось времени:";
                input.value = 60;
                let counter = setInterval(timer, 1000);
                function timer() {
                    if (!isNaN(value)) input.value--;
                    if (input.value <= 0 && input.value !== "Успел!") {
                        clearInterval(counter);
                        input.value = "Вы не успели!";
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }
            } else if (+value % 2 !== 0) {
                value = "";
                input.placeholder = "Чётное!";
            } else {
                value = "";
                input.placeholder = "Значение от 2 до 10!";
            }
        };
    }

    window.startGame = startGame;
    window.createNumbers = createNumbers;
})();
