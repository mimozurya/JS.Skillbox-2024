function showPrototypeChain() {
    const className = document.querySelector("#classNameInput").value;
    const prototypeChainElem = document.querySelector("#prototypeChain");
    prototypeChainElem.innerHTML = "";

    if (typeof window[className] === "undefined") {
        document.getElementById("classNameInput").classList.add("error");
        return;
    } else {
        document.getElementById("classNameInput").classList.remove("error");
    }

    let currentPrototype = window[className].prototype;
    const prototypeChainList = document.createElement("ol");

    while (currentPrototype) {
        const prototypeItem = document.createElement("li");
        prototypeItem.textContent = currentPrototype.constructor.name || "[Без названия]";
        const propsList = document.createElement("ol");

        Object.entries(Object.getOwnPropertyDescriptors(currentPrototype)).forEach(
            ([prop, descriptor]) => {
                const propItem = document.createElement("li");
                propItem.textContent = `${prop}: ${typeof descriptor.value}`;
                propsList.appendChild(propItem);
            }
        );

        prototypeItem.appendChild(propsList);
        prototypeChainList.appendChild(prototypeItem);
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    prototypeChainElem.appendChild(prototypeChainList);
}
