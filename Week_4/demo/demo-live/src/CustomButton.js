import React, { useState } from 'react';

function CustomButton(props) {

    const [count, setCount] = useState(0);
    
    const incrementCount = () => {
        setCount(count + 1)
    }

    return (
        <button onClick={incrementCount}>{count}</button>
    )
}

export function CustomButtonTwo(props) {
    return (
        <button {...props}>This is a 2nd button</button>
    )
}

export default CustomButton;