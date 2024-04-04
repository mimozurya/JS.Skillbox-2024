import "./style.css";
import { getValidateCardNumber } from "./methods/getValidateCardNumber.js";
import { getValidateCardMonth } from "./methods/getValidateCardMonth.js";
import { getValidateCardCVC } from "./methods/getValidateCardCVC.js";
import { getValidateCardEmail } from "./methods/getValidateCardEmail.js";

document.querySelector("#app").innerHTML = `
    <form class="form" action="index.html">
        <label for="cardNumber">Номер карты</label>
        <input type="text" id="cardNumber" name="card_number" placeholder="Номер карты">

        <label for="cardMonthYear">Дата окончания действия карты</label>
        <input type="text" id="cardMonthYear" name="card_month_year" placeholder="Дата окончания действия карты">

        <label for="cardCVC">CVC/CVV</label>
        <input type="text" id="cardCVC" name="card_CVC" placeholder="CVC/CVV">

        <label for="cardEmail">Email</label>
        <input type="email" id="cardEmail" name="card_email" placeholder="Email">
    </form>
`;

getValidateCardNumber(document.querySelector("#cardNumber"));
getValidateCardMonth(document.querySelector("#cardMonthYear"));
getValidateCardCVC(document.querySelector("#cardCVC"));
getValidateCardEmail(document.querySelector("#cardEmail"));
