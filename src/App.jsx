import React, { useContext } from 'react'
// import data from "./assets/reply.json";
// import config from "./assets/config.json"
import { Context } from './context/Context';
import Navbar from './components/Navbar';
import InnerComp from './components/InnerComp';
import InnerInput from './components/InnerInput';
import BackgroundVideo from './components/BackgroundVideo';
import DisplayInput from './components/DisplayInput';
const App = () => {

  const { textAnimation } = useContext(Context)


  return (
    <div className='w-screen h-screen relative mainContainer'>
      <div className={`w-screen ${!textAnimation ? "flex items-center min-h-[80vh]" : "h-[90vh] flex items-start justify-normal"} `}>
        <div className={`subContainer1 ${!textAnimation ? "w-1/2 flex justify-center" : ""} p-2 pt-3`}><InnerComp /></div>
        <div className={`${!textAnimation ? "w-1/2" : ""}`}><InnerInput /></div>
      </div>
      {textAnimation && <div className='subContainer2'><DisplayInput /></div>}
      <div className='absolute top-0 z-[-20]'><BackgroundVideo /></div>
    </div>
  )
}

export default App
