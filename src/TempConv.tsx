import React, { useState } from 'react';
import type { FormEvent } from 'react';

function TempConv() {

    const [tempC, setTempC] = useState(0);
    const [tempF, setTempF] = useState(32);

    const c_changed = (evt: FormEvent<HTMLElement>) => {
        // console.log(evt.target)
        const { value } = evt.target as typeof evt.target & { value: number }
        console.log(value)
        setTempC(value)
        setTempF((value * (9 / 5)) + 32)
    }
    const f_changed = (evt: FormEvent<HTMLElement>) => {
        // console.log(evt.target)
        const { value } = evt.target as typeof evt.target & { value: number }
        console.log(value)
        setTempF(value)
        setTempC((value - 32) * (5 / 9))
    }

    return (
        <div className="thing">
            <label htmlFor="temp_c">Celsius</label>
            <input
                type="number"
                name="temp_c"
                value={tempC}
                onChange={c_changed}
            />
            <label htmlFor="temp_f">Fahrenheit</label>
            <input
                type="number"
                name="temp_f"
                value={tempF}
                onChange={f_changed}
            />
        </div>
    )
}

export default TempConv