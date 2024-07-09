import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'

const DisplayInput = () => {

    const {setSaveInputVal, saveInputVal}=useContext(Context)
    const [displayInputParts, setDisplayInputParts] = useState([])

    function splitStringIntoFourParts() {
        let words=saveInputVal.split(' ')
        let partSize=Math.ceil(words.length / 5)
        let parts = [];
        for (let i = 0; i < words.length; i += partSize) {
            parts.push(words.slice(i, i + partSize).join(' '));
        }
    
        // Ensure we have exactly 4 parts by merging the last part if necessary
        while (parts.length > 4) {
            let lastPart = parts.pop();
            parts[parts.length - 1] += ' ' + lastPart;
        }
        
        return parts
    }
    useEffect(()=>{
        setDisplayInputParts(splitStringIntoFourParts())
    },[saveInputVal])

  return (
    <div className=''>
      {displayInputParts?.map((part,i)=><span className={`absolute z-50  text-xl font-semibold  ${i===0?"top-0 left-0":i===1?"top-0 right-0":i===2?"bottom-0 left-0":"bottom-0 right-0"} p-2`} key={i}>{part}</span>
    )}
    </div>
  )
}

export default DisplayInput
