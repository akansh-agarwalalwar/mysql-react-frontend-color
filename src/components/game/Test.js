import React, { useState, useEffect } from 'react';

const TestCounter = () => {
  const [counter, setCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      setCounter(prevCounter => prevCounter + 1);
      setTimeLeft(30);
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-5xl font-bold mb-4">Countdown: {timeLeft}s</h1>
      <h1 className="text-5xl font-bold">Counter: {counter}</h1>
    </div>
  );
};

export default TestCounter;
