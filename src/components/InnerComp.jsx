import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import config from "../assets/config.json"

const InnerComp = () => {
     const { resultData, textAnimation } = useContext(Context)
     const [dataArr, SetArr] = useState([])
     useEffect(() => {
        const timeouts = [];
        resultData.split('').forEach((char, i) => {
            const timeout = setTimeout(() => {
                SetArr((prevArray) => [...prevArray, char]);
            }, i * config.speed);
            timeouts.push(timeout);
        });

        return () => { 
            timeouts.forEach(clearTimeout); 
            SetArr([]);
        }
    }, [resultData])
  return (
    <div className={`${textAnimation?"inputText":""} `}>
      {dataArr?.map((char,i)=>
      <span key={i}>{char}</span>
      )}
    </div>
  )
}

export default InnerComp
