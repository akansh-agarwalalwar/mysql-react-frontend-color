import React from 'react'
import { RxCross1 } from "react-icons/rx";

function ModalShow({selectedColor,selectedNumber,contractMoney,winAmount,balance,user}) {
  return (
    <div className=" bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto border-2 border-myblue-200 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedColor?.title}</h2>
            <button onClick={closePopup}>
              <RxCross1 />
            </button>
          </div>
          {/* User Balance */}
          <div className="mb-4">
            <p>{` Balance: ${user?.balance}`}</p>
          </div>
          {/* Input Field for Amount */}
          <div className="mb-4">
            <label htmlFor="amountInput">Enter Amount:</label>
            <input
              type="number"
              id="amountInput"
              min="10"
              value={contractMoney}
              onChange={(e) => handleContractMoneyChange(e.target.value)}
              className="p-2 border rounded-lg w-full mt-1"
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
                user?.balance < contractMoney * selectedNumber
              } // Disable if balance is insufficient
              className={`bg-myblue-200 p-2 rounded-lg w-full shadow-lg text-white ${
                contractMoney < 10 ||
                user?.balance < contractMoney * selectedNumber
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
  )
}

export default ModalShow
