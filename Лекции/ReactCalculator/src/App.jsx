import { useReducer } from "react";
import { reducer } from "./entities/reducers";
import { formatOperand } from "./shared/helpers";
import { calculatorButtonConfig } from "./entities/config";

import "./App.css";
import CalculatorButton from "./components/CalculatorButton";

const App = () => {
    const [state, dispatch] = useReducer(reducer, {});
    const { currentOperand, previousOperand, operation } = state;

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">
                    {formatOperand(previousOperand)} {operation}
                </div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            {calculatorButtonConfig.map((button) => (
                <CalculatorButton {...button} dispatch={dispatch} key={button.value} />
            ))}
        </div>
    );
};

export default App;
