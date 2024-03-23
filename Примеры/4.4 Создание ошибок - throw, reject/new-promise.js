function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.addEventListener("load", resolve);
        script.addEventListener("error", () => {
            reject(new Error("Не удалось загрузить скрипт"));
        });
        document.head.append(script);
    });
}
