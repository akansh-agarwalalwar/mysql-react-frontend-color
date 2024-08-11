import React, { useState, useEffect } from 'react';
import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider2.png";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [slider1, slider2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  return (
    <div className="mx-3 mt-6">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} className="w-full h-auto" alt={`Slide ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 shadow-lg">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${currentSlide === index ? 'bg-myblue-200' : 'bg-myblue-300'}`}
            onClick={() => setCurrentSlide(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
