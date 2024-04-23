export function getValidateCardNumber(element, paymentImage) {
    let value = "";
    const setValue = (__value) => {
        value = __value;
    };

    const detectCardType = (firstDigit) => {
        let cardType = "";
        switch (firstDigit) {
            case "2":
                cardType = "МИР";
                break;
            case "4":
                cardType = "Visa";
                break;
            case "5":
                cardType = "MasterCard";
                break;
            case "6":
                cardType = "Discover";
                break;
            default:
                cardType = "Unknown";
        }
        return cardType;
    };

    const setSrc = (__src) => {
        src = __src;
    };

    detectCardType(element.value[0]);

    element.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length <= 16) {
            inputValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();
            setValue(inputValue);
        }

        e.target.value = value;

        const paymentSystem = detectCardType(e.target.value[0]);
        if (paymentSystem === "Visa") {
            paymentImage.src = "./src/assets/visa.png";
        } else if (paymentSystem === "MasterCard") {
            paymentImage.src = "./src/assets/mastercard.png";
        } else if (paymentSystem === "МИР") {
            paymentImage.src = "./src/assets/mir.png";
        } else if (paymentSystem === "Discover") {
            paymentImage.src = "./src/assets/discover.png";
        } else {
            paymentImage.src = "./src/assets/quest.png";
        }
    });
}
