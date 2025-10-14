import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { CounterState } from "../../store";
import { counterActions } from "../../store";

const Counter: React.FC = () => {
    const counterState = useSelector((state: { counter: CounterState }) => state.counter);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<number>(0);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Counter: {counterState.value}</h2>
            <div>
                <button onClick={() => dispatch(counterActions.decrement())}>-</button>
                <button onClick={() => dispatch(counterActions.increment())}>+</button>
            </div>
            <div style={{ marginTop: 16 }}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={e => setInputValue(Number(e.target.value))}
                />
                <button onClick={() => dispatch(counterActions.increase(inputValue))}>Add Value</button>
            </div>
        </div>
    );
};

export default Counter;