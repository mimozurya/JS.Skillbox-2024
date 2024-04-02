const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });
export function formatOperand(operand) {
    if (!operand) return "";
    const [integer, decimal] = operand.split(".");
    if (!decimal) return `${INTEGER_FORMATTER.format(integer)}${operand.includes(".") ? "." : ""}`;
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
