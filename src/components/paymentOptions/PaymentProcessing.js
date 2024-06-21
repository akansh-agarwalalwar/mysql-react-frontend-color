import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PaymentProcessing({ userId, amount }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      setShowPopup(true);
    } else {
      alert('Please upload a valid image file.');
    }
  };
  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('amount', amount);

      await axios.post('https://color-server.onrender.com/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Request submitted');
      setShowPopup(false);
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  const handleReload = () => {
    setUploadedImage(null);
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-lg mb-4">Payment Processing</h2>
      {!uploadedImage && (
        <div className="h-[125px] w-[230px] flex items-center justify-center border-2 mb-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="upload-image"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="upload-image"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          >
            Upload Image
          </label>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h3 className="font-bold mb-2">Image Uploaded!</h3>
            <p className="mb-4">Please confirm or reload the image.</p>
            <button
              className="bg-green-500 border text-black p-2 rounded-md mr-2"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-orange-500 border text-black p-2 rounded-md"
              onClick={handleReload}
            >
              Reload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentProcessing;
