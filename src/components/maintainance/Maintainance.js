import React from "react";
import maintain from "../../images/maintain.mp4";
import { FaTelegramPlane } from "react-icons/fa";
const handleButton = () => {
  window.open("https://t.me/Perfectorse", "_blank");
};
function Maintainance() {
  return (
    <div className="h-screen max-w-md mx-auto relative">
      <video
        autoPlay
        loop
        muted
        className="h-screen justify-center items-center"
      >
        <source src={maintain} type="video/mp4" />
      </video>
      <div className="absolute top-2 left-0 w-full h-screen flex text-white">
        {/* <div className="text-center">
          <p className="text-lg mb-4 text-black">
            Our website is currently undergoing scheduled maintenance. We
            apologize for any inconvenience this may cause and appreciate your
            patience. Please check back soon. Thank you for your understanding.
          </p>
        </div> */}
        <div className="absolute bottom-14 text-black mx-3">
          <div className="w-full font-bold justify-center items-center flex size-30 text-3xl text-red-100">
            <p>UNDER MAINTAINANCE</p>
          </div>
          <p className="text-lg">
            Perfectorse is currently undergoing scheduled maintenance. We
            apologize for any inconvenience this may cause and appreciate your
            patience. Please check back soon. Thank you for your understanding.
          </p>
          <div className="w-full flex justify-center items-center">
            <button
              className=" h-16 w-80 border-2 rounded-3xl mt-4 flex flex-row justify-center items-center text-2xl bg-myblue-200"
              onClick={handleButton}
            ><FaTelegramPlane className=" bg-blue-50 rounded-full w-12 h-12 justify-center items-center mr-5" />
              Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintainance;
