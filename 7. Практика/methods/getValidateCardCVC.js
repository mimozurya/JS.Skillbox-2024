export function getValidateCardCVC(element) {
    let value = "";
    const setValue = (__value) => {
        value = __value;
    };

    element.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");
        if (inputValue.length <= 3) {
            setValue(inputValue);
        }
        e.target.value = value;
    });
}
