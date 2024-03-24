const form = document.querySelector("#form");

class ValidationError extends TypeError {
    constructor(fieldErrors) {
        this.fieldErrors = fieldErrors;
        super("Ошибка проверки данных формы");
    }
}

function sendForm() {
    const fields = {};
    const errors = {};

    for (const input of form.elements) {
        fields[input.name] = input.value;
    }

    if (fields.email.includes("@")) {
        errors.email = "E-mail имеет неверный формат";
    }
    if (fields.name.trim().length === 0) {
        errors.name = "Вы не указали имя";
    }
    if (fields.password.length < 6) {
        errors.password = "Пароль должен содержать не менее 6 символов";
    }

    if (Object.keys(errors).length > 0) {
        throw new TypeError();
    }

    return fetch("/api/register", {
        body: JSON.stringify(fields),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const result = await sendForm();
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(error.fieldErrors);
        } else if (error instanceof TypeError) {
            console.log(error.message);
        } else throw error;
    }
});
