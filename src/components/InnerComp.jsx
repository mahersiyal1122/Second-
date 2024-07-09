import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import config from "../assets/config.json"
import SpanInput from './SpanInput'

const InnerComp = () => {
  const { resultData, textAnimation } = useContext(Context)
  const [dataArr, setDataArr] = useState([])


  const randomInputPlace = (arr) => {
    let max = config.textLength - 20
    let min = 30
    const rand = Math.ceil(min + Math.random() * (max - min))
    console.log(rand);
    arr.splice(rand, 0, <SpanInput key={"randomInput"} />)
    console.log(arr);
    return arr
  }
  useEffect(() => {
    const timeouts = [];
    resultData.split('').forEach((char, i) => {
      const timeout = setTimeout(() => {
        setDataArr((prevArray) => [...prevArray, char]);
      }, i * config.speed);
      timeouts.push(timeout);
    });
    return () => {
      timeouts.forEach(clearTimeout);
      setDataArr([]);
    }
  }, [resultData])

  useEffect(() => {
    if (textAnimation){
      if (dataArr.length === resultData.length) {
        setDataArr((prevArray) => randomInputPlace([...prevArray]));
      }
    }
  }, [dataArr, resultData]); 


  return (
    <div className={`${textAnimation ? "inputText" : ""} `}>
      {dataArr?.map((char, i) =>
        <span className={`${textAnimation && "subSpan mx-1"}`} key={i}>{char}</span>
      )}
    </div>
  )
}

export default InnerComp
