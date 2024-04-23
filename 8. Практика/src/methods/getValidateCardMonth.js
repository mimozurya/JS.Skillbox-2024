export function getValidateCardMonth(element) {
    let value = "";
    const setValue = (__value) => {
        value = __value;
    };

    element.addEventListener("input", (e) => {
        element.classList.contains("alert") && element.classList.remove("alert");
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length <= 4) {
            inputValue = inputValue.replace(/(\d{2})(\d{1})/, "$1/$2");
            setValue(inputValue);
        }

        e.target.value = value;
        console.log(value);
    });

    element.addEventListener("change", () => {
        let month = parseInt(value.substring(0, 2), 10);
        if (month <= 0 || month > 12) {
            alert("Введите корректный месяц");
            element.classList.add("alert");
        }

        let year = parseInt(value.substring(3, 5), 10);
        if (year <= 23 || (year == 24 && month < 4)) {
            alert("Срок карты давненько истек, попробуйте другую карту");
            element.classList.add("alert");
        }
    });
}
