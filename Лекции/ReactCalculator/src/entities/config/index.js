import { ACTIONS } from "../../shared/constants";

export const calculatorButtonConfig = [
    { value: "AC", spanTwo: true, type: ACTIONS.CLEAR },
    { value: "DEL", type: ACTIONS.DELETE_DIGIT },
    { value: "/", type: ACTIONS.CHOOSE_OPERATION },
    { value: "1", type: ACTIONS.ADD_DIGIT },
    { value: "2", type: ACTIONS.ADD_DIGIT },
    { value: "3", type: ACTIONS.ADD_DIGIT },
    { value: "*", type: ACTIONS.CHOOSE_OPERATION },
    { value: "4", type: ACTIONS.ADD_DIGIT },
    { value: "5", type: ACTIONS.ADD_DIGIT },
    { value: "6", type: ACTIONS.ADD_DIGIT },
    { value: "+", type: ACTIONS.CHOOSE_OPERATION },
    { value: "7", type: ACTIONS.ADD_DIGIT },
    { value: "8", type: ACTIONS.ADD_DIGIT },
    { value: "9", type: ACTIONS.ADD_DIGIT },
    { value: "-", type: ACTIONS.CHOOSE_OPERATION },
    { value: ".", type: ACTIONS.ADD_DIGIT },
    { value: "0", type: ACTIONS.ADD_DIGIT },
    { value: "=", spanTwo: true, type: ACTIONS.EVALUATE },
];
