class Human {
    static x = 10;
    static get y() {
        return 42;
    }
    static getKindName() {
        return "Человек";
    }
}

// -----------------------------------------------

function Human() {}

Human.getKindName = function () {
    return "Человек";
};

Human.x = 10;

Object.defineProperty(Human, "y", {
    get() {
        return 42;
    },
});
