import React from "react";
import maintain from "../../images/maintain.mp4"
function Maintainance() {
  return (
    <div className="h-screen max-w-md mx-auto relative">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source 
          src={maintain}
          type="video/mp4"
        />
      </video>
      <div className="absolute top-2 left-0 w-full h-screen flex text-white">
        <div className="text-center">
          <p className="text-lg mb-4 text-black">
            Our website is currently undergoing scheduled maintenance. We apologize
            for any inconvenience this may cause and appreciate your patience.
            Please check back soon. Thank you for your understanding.
          </p>
          </div>
          <div className="absolute bottom-10 text-black mx-3">
            <div className="w-full font-bold justify-center items-center flex size-30 text-3xl text-red-100">
            <p >UNDER MAINTAINANCE</p>
            </div>
          <p className="text-lg">
            Perfectorse is currently undergoing scheduled maintenance. We apologize
            for any inconvenience this may cause and appreciate your patience.
            Please check back soon. Thank you for your understanding.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Maintainance;