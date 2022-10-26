import React, { useState } from 'react';

function Counter() {

    const [counter, setCounter] = useState(0);

    return (
        <div className="thing">
            <input
                type="number"
                name="counter"
                value={counter}
                readOnly={true}
            />
            <button onClick={() => setCounter(counter + 1)}> Increment </button>
            <button onClick={() => setCounter(0)}> Reset </button>
            <button onClick={() => location.reload()}> Refresh Page</button>
        </div>
    )
}

export default Counter