import React, { useContext } from 'react';
import UserContext from '../login/UserContext';

export default function TopBody() {
  const { user } = useContext(UserContext);

  return (
    <div className="relative flex flex-col items-center py-8">
      <div className="absolute top-4 right-4">
        User ID: {user ? user.userId : 'Not Logged In'}
      </div>
      <h1 className="text-2xl font-bold mb-4">Welcome {user ? user.username : ''}</h1>
      <div className="flex items-center">
        <div className="mr-4">Balance Amount:</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Recharge</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Withdraw</button>
      </div>
    </div>
  );
}
