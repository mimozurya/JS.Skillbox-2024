class TodoItem {
    done = false;
    createdAt = new Date();

    constructor(title = "Новое дело") {
        this.title = title;
    }
}

const todoItem = new TodoItem("Купить хлеб");
