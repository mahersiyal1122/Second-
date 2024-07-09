import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'

const SpanInput = () => {
    const { inputVal, setInputVal, getResponseFromGemini, setTextAnimation, textAnimation, setSaveInputVal, setOnEnter, onEnter } = useContext(Context)
    
    const [enterPresses, setEnterPresses] = useState(1);
    // const [inputRandomPlace, setInputRandomPlace] = useState(1)

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
        }
    };
    // const inputPlace = () => {
    //     if (textAnimation) {
    //         const random = Math.ceil(Math.random() * 5)
    //         if (random === 1) {
    //             setInputRandomPlace(1)
    //         }
    //         else if (random === 2) {
    //             setInputRandomPlace(2)
    //         }
    //         else if (random === 3) {
    //             setInputRandomPlace(3)
    //         }
    //         else if (random === 4) {
    //             setInputRandomPlace(4)
    //         }
    //         else {
    //             setInputRandomPlace(5)
    //         }
    //     }
    // }
    // useEffect(() => {
    //     inputPlace()
    // }, [textAnimation, enterPresses])
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
        <span className={` mx-2 inline px-3 ${textAnimation ? "" : ''} transition-all`}>
            { !onEnter && <input 
            ref={inputRef} 
            value={inputVal} 
            style={{ 
                // width: `${inputVal.length + 1}ch`,
             minWidth: '15ch'
             }} 
            onChange={handleChange} onKeyDown={handleEnterKey} 
            className={`spanInput bg-transparent outline-none text-2xl auto-width-input placeholder:text-white break-all`} 
            type="text" 
            placeholder='Type your answer' />}
        </span>
    )
}

export default SpanInput
