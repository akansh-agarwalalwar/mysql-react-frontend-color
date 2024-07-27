import { motion } from 'framer-motion';

const generateRandomBets = () => {
  const newBets = [];
  const colors = ["Red", "Violet", "Green"];
  const amounts = [100, 200, 500, 1000];

  for (let i = 0; i < 15; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
    newBets.push({
      color: randomColor,
      amount: randomAmount,
      userNumber: randomUserNumber,
    });
  }

  setNewBets(newBets);
};

useEffect(() => {
  const intervalId = setInterval(() => {
    generateRandomBets();
  }, 3000);

  return () => {
    clearInterval(intervalId);
  };
}, []);

return (
  <div>
    {newBets.map((bet, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex flex-col items-center">
          <div
            className={`w-7 h-7 rounded-full border ${getColorClass(bet.color)}`}
          ></div>
          <span className="text-xs mt-1">{bet.userNumber}</span>
        </div>
      </motion.div>
    ))}
  </div>
);