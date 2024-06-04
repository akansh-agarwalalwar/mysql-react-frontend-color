import React,{useState} from 'react'
import BottomNav from './BottomNav'
import Body from './Body';
import TopBody from './TopBody';
import Reward from './Reward';

export default function HomePage() {
    const [activeButton, setActiveButton] = useState("Home");
  return (
    <div>
        <TopBody/>
        <Reward/>
        <Body/>
        <BottomNav activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>
    
  )
}
