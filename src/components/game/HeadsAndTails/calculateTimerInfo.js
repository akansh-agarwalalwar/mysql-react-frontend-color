const calculateTimerInfo = () => {
    const time = Date.now();
    const timeInSeconds = Math.floor(time / 1000);
    const timerNumber = Math.floor(timeInSeconds / 25);
    const countDown = Math.floor(25 - (timeInSeconds % 25));
    return {
        timerNumber,
        countDown,
    };
  };

  export default calculateTimerInfo