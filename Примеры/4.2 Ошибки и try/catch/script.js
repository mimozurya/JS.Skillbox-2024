// function getJsonProperty(json, prop) {
//     try {
//         const obj = JSON.parse(json);
//         return obj[prop];
//     } catch (error) {
//         console.log(`Возникла ошибка ${error.name}: ${error.message}`);
//     }
// }
function getJsonProperty(json, prop) {
    try {
        const obj = JSON.parse(json);
        return obj[prop];
    } catch (error) {
        switch (error.name) {
            case "SyntaxError":
                console.log("Не удалось разобрать JSON строку");
                break;
            case "TypeError":
                console.log("В JSON содержится пустое значение");
                break;
            default:
                throw error;
        }
    }
}

getJsonProperty("Я не JSON :((", "prop");
getJsonProperty("null", "name");
