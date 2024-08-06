// PopupContent.jsx
import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const PopupContent = ({
  selectedColor,
  data,
  closePopup,
  user,
  handlePresetAmountClick,
  decreaseMultiplier,
  increaseMultiplier,
  multiplier,
  contractMoney,
  handleContractMoneyChange,
  winAmount,
  handleConfirm,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-myblue-200 mx-auto w-full">
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-xl font-bold w-full text-center">
          {selectedColor?.title}
        </h2>
        <button onClick={closePopup} className="ml-auto">
          <RxCross1 />
        </button>
      </div>
      {/* User Balance */}
      <div className="mb-4">
        <p>{`Balance: ${user?.balance}`}</p>
      </div>
      {/* Preset Amount Buttons */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row mb-4 space-x-2 gap-2">
          {[10, 100, 200, 500].map((amount) => (
            <button
              key={amount}
              onClick={() => handlePresetAmountClick(amount)}
              className="border-myblue-200 p-2 border-2 rounded-lg text-myblue-200"
            >
              {amount}
            </button>
          ))}
        </div>
        {/* Multiplier Controls */}
        <div className="flex flex-row items-center mb-4 space-x-2">
          <button
            onClick={decreaseMultiplier}
            className="border-myblue-200 p-3 border-2 rounded-lg text-myblue-200"
          >
            -1
          </button>
          <p className="text-xl p-2">{multiplier}</p>
          <button
            onClick={increaseMultiplier}
            className="border-myblue-200 p-3 border-2 rounded-lg text-myblue-200"
          >
            +1
          </button>
        </div>
      </div>
      {/* Input Field for Amount */}
      <div className="mb-4">
        <label htmlFor="amountInput">Enter Amount:</label>
        <input
          type="number"
          id="amountInput"
          min="10"
          value={contractMoney * multiplier}
          onChange={(e) =>
            handleContractMoneyChange(
              Number(e.target.value),
              selectedColor?.title
            )
          }
          className="p-2 border rounded-lg w-full mt-1"
          readOnly
        />
      </div>
      {/* Possible Payout */}
      <div className="mb-4 text-sm">
        <p>Possible Payout: {winAmount?.toFixed(2)}</p>
      </div>
      {/* Confirm Button */}
      <div className="mb-4">
        <button
          onClick={handleConfirm}
          disabled={
            contractMoney < 10 ||
            user?.balance < contractMoney ||
            contractMoney > user?.balance
          }
          className={`bg-myblue-200 p-2 rounded-lg w-full shadow-lg text-white ${
            contractMoney < 10 ||
            user?.balance < contractMoney ||
            contractMoney > user?.balance
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PopupContent;
