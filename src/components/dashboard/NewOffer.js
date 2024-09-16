import React from 'react';
import slider2 from "../../images/newBanner.png";

function NewOffer() {
  return (
    <div className="flex justify-center items-center mx-3 mt-4">
      <img 
        src={slider2} 
        alt="New Offer" 
        className=" rounded-lg shadow-lg" 
      />
    </div>
  );
}

export default NewOffer;
