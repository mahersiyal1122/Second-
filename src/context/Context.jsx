import { createContext, useEffect, useRef, useState } from "react";
import config from "../assets/config.json"
import runChat from "../config/gemini";
export const Context = createContext(null)

const ContextProvider = (props) => {

    const [onInputClick, setOnInputClick] = useState(false)
    const [inputVal, setInputVal] = useState("Ask me this: Alright, what's your name?")
    const [resultData, setResultData] = useState("")
    const [textAnimation,setTextAnimation]=useState(false)
    const [saveInputVal, setSaveInputVal] = useState("")
    const [onEnter, setOnEnter] = useState(false)
    const [spanDisplay, setSpanDisplay] = useState(false)
    const timeoutsRef = useRef([]);

    useEffect(() => {
        const timer = async () => {
            const timeout = setTimeout(() => {
                setInputVal("")
                setOnEnter(false)
                setSpanDisplay(true)
            }, resultData.length * (config.speed + 4));
            timeoutsRef.current.push(timeout);
        }
        timer()
        return () => { 
            timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutsRef.current = [];
        setSpanDisplay(false)
         }
    }, [resultData])

    const getResponseFromGemini=async()=>{
        let response=await runChat(inputVal)
        response=response.split("*").join("")
        response=response.split("#").join("")
        response=response.trim().slice(0,config.textLength)

        if (response.length>0){
            setResultData(response)
            // console.log(response);
        }else{
            setResultData(()=>{
                return "Data not Fetched"
            })
        }
    }
    useEffect(()=>{
        getResponseFromGemini()
    },[])
    

    const ContextValue = { 
        inputVal,
        setInputVal,
        resultData,
        setResultData,
        getResponseFromGemini,
        onInputClick,
        setOnInputClick,
        textAnimation,
        setTextAnimation,
        saveInputVal,
        setSaveInputVal,
        onEnter,
        setOnEnter,
        spanDisplay,
        setSpanDisplay
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider
