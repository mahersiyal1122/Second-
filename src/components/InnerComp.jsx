import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import config from "../assets/config.json";
import SpanInput from './SpanInput';

const InnerComp = () => {
  const { resultData, textAnimation } = useContext(Context);
  const [dataArr, setDataArr] = useState([]);
  const [inputIndex, setInputIndex] = useState(null);

  // Function to find all indices of spaces in the resultData
  const findSpaceIndices = (data) => {
    return data.split('').reduce((indices, char, i) => {
      if (char === ' ') {
        indices.push(i);
      }
      return indices;
    }, []);
  };

  // // Function to determine the random position for SpanInput
  // const determineRandomInputPlace = () => {
  //   let max = config.textLength - 20;
  //   let min = 30;
  //   return Math.ceil(min + Math.random() * (max - min));
  // };

  // Function to choose a random index from an array
  const getRandomIndexFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  useEffect(() => {
    // const randomIndex = determineRandomInputPlace();
    // setInputIndex(randomIndex);

    const spaceIndices = findSpaceIndices(resultData);
    const randomSpaceIndex = textAnimation ? getRandomIndexFromArray(spaceIndices) : null;
    const timeouts = [];

    resultData.split('').forEach((char, i) => {
      const timeout = setTimeout(() => {
        setDataArr((prevArray) => {
          // Insert a placeholder for SpanInput at the random index
          if (textAnimation && i === randomSpaceIndex) {
            return [...prevArray, <SpanInput key={"randomInput"} />, char];
          } else {
            return [...prevArray, char];
          }
        });
      }, i * config.speed);
      timeouts.push(timeout);
    });

    // Cleanup function to clear timeouts and reset dataArr
    return () => {
      timeouts.forEach(clearTimeout);
      setDataArr([]);
    };
  }, [resultData,textAnimation]);

  return (
    <div className={`${textAnimation ? "inputText" : ""}`}>
      {dataArr.map((char, i) =>
        <span className={`${textAnimation && "subSpan mx-1"}`} key={i}>{char}</span>
      )}
    </div>
  );
};

export default InnerComp;
