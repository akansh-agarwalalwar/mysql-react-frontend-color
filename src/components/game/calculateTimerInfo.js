const calculateTimerInfo = () => {
    const time = Date.now();
    const timeInSeconds = Math.floor(time / 1000);
    const timerNumber = Math.floor(timeInSeconds / 30);
    const countDown = Math.floor(30 - (timeInSeconds % 30));
    return {
        timerNumber,
        countDown,
    };
  };

  export default calculateTimerInfo