import { evaluate } from "../methods";
import { ACTIONS } from "../../shared/constants";

export function reducer(state, { type, payload }) {
    const { operation, currentOperand, previousOperand } = state;
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite)
                return { ...state, currentOperand: payload.value, overwrite: false };
            if (payload.value === "0" && currentOperand === "0") return state;
            if (payload.value === "." && currentOperand?.includes(".")) return state;
            return {
                ...state,
                currentOperand: `${currentOperand || ""}${payload.value}`,
            };
        case ACTIONS.CLEAR:
            return {};
        case ACTIONS.CHOOSE_OPERATION:
            if (!(currentOperand || previousOperand)) return state;
            if (!currentOperand) return { ...state, operation: payload.value };
            return {
                currentOperand: null,
                operation: payload.value,
                previousOperand: previousOperand ? evaluate(state) : currentOperand,
            };
        case ACTIONS.EVALUATE:
            if ([operation, currentOperand, previousOperand].some((el) => !el)) return state;
            return {
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
                overwrite: true,
            };
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite)
                return {
                    ...state,
                    currentOperand: null,
                    overwrite: false,
                };
            if (!currentOperand) return state;
            if (state.currentOperand === 1) return { ...state, currentOperand: null };
            return { ...state, currentOperand: currentOperand.slice(0, -1) };
    }
}
