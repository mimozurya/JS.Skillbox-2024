import "./style.css";
import { getValidateCardNumber } from "./src/methods/getValidateCardNumber.js";
import { getValidateCardMonth } from "./src/methods/getValidateCardMonth.js";
import { getValidateCardCVC } from "./src/methods/getValidateCardCVC.js";
import { getValidateCardEmail } from "./src/methods/getValidateCardEmail.js";

document.querySelector("#app").innerHTML = `
    <form class="form" action="index.html">
        <div>
            <label for="cardNumber">Номер карты</label>
            <input type="text" id="cardNumber" name="card_number" placeholder="Номер карты">
            <img id="paymentImage" src="./src/assets/quest.png" alt="payment"></img>
        </div>

        <label for="cardMonthYear">Дата окончания действия карты</label>
        <input type="text" id="cardMonthYear" name="card_month_year" placeholder="Дата окончания действия карты">

        <label for="cardCVC">CVC/CVV</label>
        <input type="text" id="cardCVC" name="card_CVC" placeholder="CVC/CVV">

        <label for="cardEmail">Email</label>
        <input type="email" id="cardEmail" name="card_email" placeholder="Email">
    </form>
`;

getValidateCardNumber(
    document.querySelector("#cardNumber"),
    document.querySelector("#paymentImage")
);
getValidateCardMonth(document.querySelector("#cardMonthYear"));
getValidateCardCVC(document.querySelector("#cardCVC"));
getValidateCardEmail(document.querySelector("#cardEmail"));
