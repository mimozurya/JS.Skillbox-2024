export function getValidateCardNumber(element) {
    let value = "";
    const setValue = (__value) => {
        value = __value;
    };

    element.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length <= 16) {
            inputValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();
            setValue(inputValue);
        }

        e.target.value = value;
    });
}
