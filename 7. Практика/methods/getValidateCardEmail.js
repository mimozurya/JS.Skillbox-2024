const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
// https://ru.hexlet.io/blog/posts/validatsiya-email-na-javascript

function validateEmail(email) {
    return EMAIL_REGEXP.test(email);
}

export function getValidateCardEmail(element) {
    let value = "";
    const setValue = (__value) => {
        value = __value;
    };

    element.addEventListener("input", (e) => {
        element.classList.contains("alert") && element.classList.remove("alert");
        let inputValue = e.target.value;
        setValue(inputValue);
        e.target.value = value;
    });

    element.addEventListener("change", () => {
        if (!validateEmail(value)) {
            alert("Введите корректный email");
            element.classList.add("alert");
        }
    });
}
