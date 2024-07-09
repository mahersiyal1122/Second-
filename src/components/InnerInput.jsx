import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'

const InnerInput = () => {

  const { inputVal, setInputVal, onInputClick, setOnInputClick, getResponseFromGemini, setTextAnimation, textAnimation,setSaveInputVal, setOnEnter, onEnter } = useContext(Context)
  const [enterPresses, setEnterPresses] = useState(0);
  const [inputRandomPlace, setInputRandomPlace] = useState(1)
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
  const inputPlace=()=>{
    if (textAnimation){
      const random=Math.ceil(Math.random()*5)
      if (random === 1){
        setInputRandomPlace(1)
      }
      else if (random===2){
        setInputRandomPlace(2)
      }
      else if (random===3){
        setInputRandomPlace(3)
      }
      else if (random===4){
        setInputRandomPlace(4)
      }
      else{
        setInputRandomPlace(5)
      }
    }
  }
  useEffect(()=>{
    inputPlace()
  },[textAnimation,enterPresses])
  useEffect(() => {
    if (enterPresses > 0) {
      setTextAnimation(true);
    } else {
      setTextAnimation(false);
    }
  }, [enterPresses]);

  return (
    <div className={`${textAnimation && (inputRandomPlace ===1 ?'inputPlace-1':inputRandomPlace ===2 ?'inputPlace-2':inputRandomPlace ===3 ?'inputPlace-3':inputRandomPlace ===4 ?'inputPlace-4':inputRandomPlace ===5 ?'inputPlace-5':'w-full flex justify-center')} ${!textAnimation && "flex w-full justify-center" } transition-all`}>
      {!onInputClick && <p onClick={() => {
        setOnInputClick(true)
        setInputVal("")
      }} className={`bg-transparent outline-none ${textAnimation ? "text-center text-xl -mt-12 ": ""}  ${textAnimation && (inputRandomPlace ===1 ?'-mt-12':inputRandomPlace ===2 ?'-mt-5':inputRandomPlace ===3 ?'mb-7':inputRandomPlace ===4 ?'-mt-12':inputRandomPlace ===5 ?'-mt-7':'')} `}>Type your answer</p>}
      {onInputClick && !onEnter && <textarea autoFocus value={inputVal} onChange={handleChange} onKeyDown={handleEnterKey} className={`bg-transparent outline-none text-center text-xl -mt-3`} type="text" placeholder='Type your answer' />}
    </div>
  )
}

export default InnerInput
