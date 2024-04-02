const operationDictionary = {
    "+": (prev, current) => prev + current,
    "-": (prev, current) => prev - current,
    "*": (prev, current) => prev * current,
    "/": (prev, current) => prev / current,
};

export function evaluate(state) {
    const { currentOperand, previousOperand, operation } = state;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(current) || isNaN(prev)) return "";
    const computation = operationDictionary[operation](prev, current);
    return `${computation}`;
}
