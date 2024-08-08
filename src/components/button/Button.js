import React from "react";

function Button({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-myblue-200 p-3 w-full flex rounded-full justify-center items-center text-l font-semibold text-white ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;