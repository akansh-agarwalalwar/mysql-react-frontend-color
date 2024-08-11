import React from 'react';
import BottomNav from './BottomNav';
import Body from './Body';
import TopBody from './TopBody';
import Reward from './Reward';
import Slider from './Slider';
import background from '../../images/background.png';

export default function HomePage() {
  return (
    <div
      className='overflow-y-auto bg-myblue-500 h-screen max-w-md mx-auto'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TopBody />
      <Slider />
      {/* <Reward/> */}
      <Body />
    </div>
  );
}
