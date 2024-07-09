import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'

const SpanInput = () => {
    const { inputVal, setInputVal, getResponseFromGemini, setTextAnimation, textAnimation, setSaveInputVal, setOnEnter, spanDisplay } = useContext(Context)

    const [enterPresses, setEnterPresses] = useState(1);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        setInputVal(e.target.value)
    }

    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            setEnterPresses(prevPresses => prevPresses + 1);
            getResponseFromGemini();
            setOnEnter(true)
            setSaveInputVal(e.target.value)
            setInputVal("")
        }
    };

    useEffect(() => {
        if (enterPresses > 0) {
            setTextAnimation(true);
        } else {
            setTextAnimation(false);
        }
    }, [enterPresses]);



    useEffect(() => {
        if (inputRef.current) {
            // Calculate the new width based on the value length and set it
            const newWidth = Math.max(inputVal.length + 1, 10);
            inputRef.current.style.width = `${newWidth}ch`;
        }
    }, [inputVal]);

    return (
        <span className={`${spanDisplay?"visible":"invisible"} mx-2 inline px-3 ${textAnimation ? "" : ''} transition-all`}>
            {  <input
                ref={inputRef}
                value={inputVal}
                style={{
                    // width: `${inputVal.length + 1}ch`,
                    minWidth: '15ch'
                }}
                onChange={handleChange} onKeyDown={handleEnterKey}
                className={`spanInput bg-transparent outline-none text-2xl auto-width-input placeholder:text-white break-all`}
                type="text"
                placeholder='Type your answer' />
            }
        </span>
    )
}

export default SpanInput


