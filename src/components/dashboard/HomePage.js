import React,{useState} from 'react'
import BottomNav from './BottomNav'
import Body from './Body';
import TopBody from './TopBody';
import Reward from './Reward';

export default function HomePage() {
  return (
    <div className='overflow-y-auto bg-myblue-500 h-screen max-w-md mx-auto'>
        <TopBody/>
        {/* <Reward/> */}
        <Body/>
    </div>
    
  )
}
