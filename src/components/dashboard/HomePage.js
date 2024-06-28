import React,{useState} from 'react'
import BottomNav from './BottomNav'
import Body from './Body';
import TopBody from './TopBody';
import Reward from './Reward';

export default function HomePage() {
    const [activeButton, setActiveButton] = useState("Home");
  return (
    <div className='overflow-y-auto bg-myblue-500 h-screen'>
        <TopBody/>
        <Reward/>
        <Body/>
        <BottomNav activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>
    
  )
}
