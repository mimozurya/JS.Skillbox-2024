const me = Object.create(
    {
        getFullName() {
            return `${this.name} ${this.surname}`;
        },
    },
    {
        name: {
            value: "Тимофей",
            writable: true,
            configurable: true,
            enumerable: true,
        },
        surname: {
            value: "Тиунов",
            writable: true,
            configurable: true,
            enumerable: true,
        },
    }
);
console.log(me.getFullName());
