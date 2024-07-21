const calculateTimerInfoTwoMin = () => {
    const time = Date.now();
    const timeInSeconds = Math.floor(time / 1000);
    const timerNumber = Math.floor(timeInSeconds / 120);
    const countDown = Math.floor(120 - (timeInSeconds % 120));
    return {
        timerNumber,
        countDown,
    };
  };

export default calculateTimerInfoTwoMin