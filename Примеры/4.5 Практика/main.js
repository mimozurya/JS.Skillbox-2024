const form = document.querySelector("#user-create-form");
const formError = document.querySelector("#user-create-form-error");

async function createUser(data) {
    const errors = [];

    if (!data.email)
        errors.push({
            name: "email",
            message: "E-mail обязателен для заполнения",
        });
    else if (!data.email.includes("@") || !data.email.includes(".")) {
        errors.push({
            name: "email",
            message: "E-mail имеет неверный формат",
        });
    }

    if (!data.name.trim()) {
        errors.push({
            name: "name",
            message: "Имя обязательно для заполнения",
        });
    }
    if (!data.status) {
        errors.push({
            name: "status",
            message: "Статус обязателен для заполнения",
        });
    }
    if (!data.gender) {
        errors.push({
            name: "gender",
            message: "Гендер обязателен для заполнения",
        });
    }
    if (errors.length) {
        const err = new TypeError();
        err.errorMessages = errors;
        throw err;
    }

    const responce = await fetch("https://gorest.co.in/public/v2/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
                "Bearer 7e60dac7c098b3c391ff073e174e71868552323485b0a5692c18313323bac913",
        },
    }).then((res) => res.json());

    if (responce.code === 200 || responce.code === 201) {
        return responce.data;
    }
    if (responce.data) {
        const err = new TypeError();
        err.errorMessages = responce.data.map((err) => ({
            name: err.field,
            message: err.message,
        }));
        throw err;
    }

    throw new Error("Не удалось создать нового пользователя");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {};
    const inputs = {};
    const spinner = form.querySelector("button .spinner-border");

    for (let i = 0; i < form.elements.length; ++i) {
        const input = form.elements[i];
        if (!input.name) continue;
        data[input.name] = input.value;
        inputs[input.name] = input;
        input.classList.remove("is-invalid");
    }

    formError.textContent = "";

    try {
        spinner.style.display = "";
        await createUser(data);
    } catch (err) {
        if (err.name !== "TypeError") throw err;
        if (err.errorMessages) {
            for (const errorMessage of err.errorMessages) {
                inputs[errorMessage.name].classList.add("is-invalid");
            }
            formError.textContent = err.errorMessages
                .map((errorMessage) => errorMessage.message)
                .join(". ");
        }
    } finally {
        spinner.style.display = "none";
    }
});
