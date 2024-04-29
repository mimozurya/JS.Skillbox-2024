document.addEventListener("DOMContentLoaded", (event) => {
    const button = document.querySelector(".btn");
    const container = document.querySelector(".container");

    const inputName = document.querySelector(".inputName");
    const inputSurname = document.querySelector(".inputSurname");
    const inputMiddleName = document.querySelector(".inputMiddleName");
    const dictionary = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя- ";
    let newName, newSurname, newMiddleName;

    inputSurname.onblur = () => {
        inputSurname.value = doNewString(inputSurname, newSurname);
    };
    inputName.onblur = () => {
        inputName.value = doNewString(inputName, newName);
    };
    inputMiddleName.onblur = () => {
        inputMiddleName.value = doNewString(inputMiddleName, newMiddleName);
    };

    button.onclick = (e) => {
        let newElement = document.createElement("p");
        const data = [inputSurname.value, inputName.value, inputMiddleName.value];
        if (data.includes("")) return;
        newElement.textContent = data.join(" ");
        // inputName.value &&
        //     inputSurname.value &&
        //     inputMiddleName.value &&
        //     (newElement.textContent =
        //         inputSurname.value + " " + inputName.value + " " + inputMiddleName.value);

        container.append(newElement);
        e.preventDefault();
    };

    function doNewString(tempString, tempSupportString) {
        let _tempName = [];
        tempSupportString = tempString.value
            .toLowerCase()
            .trim()
            .replace(/[\s-]+/g, " ") // регулярные выражения
            .split("");

        tempSupportString.map((el) => {
            dictionary.includes(el) && _tempName.push(el);
        });
        tempSupportString = _tempName.join("");
        tempSupportString = tempSupportString.charAt(0).toUpperCase() + tempSupportString.slice(1);
        return tempSupportString;
    }
});
