const me = {
    name: "Тимофей",
    surname: "Тиунов",
};

const methods = {
    getFullName() {
        return `${this.name} ${this.surname}`;
    },
};

Object.setPrototypeOf(me, methods);
console.log(me.getFullName());
