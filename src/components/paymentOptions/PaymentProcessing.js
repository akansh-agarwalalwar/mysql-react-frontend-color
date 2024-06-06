import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function PaymentProcessing() {
  const [progress, setProgress] = useState({
    uploadImage: false,
    serverProcessing: false,
    processCompleted: false,
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(URL.createObjectURL(file));
      setProgress((prevProgress) => ({
        ...prevProgress,
        uploadImage: true,
      }));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleServerProcessing = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      serverProcessing: true,
    }));
    // Simulate server processing
    setTimeout(() => {
      setProgress((prevProgress) => ({
        ...prevProgress,
        processCompleted: true,
      }));
    }, 2000);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-lg mb-4">Progress</h2>
        <ul className=" flex justify-between flex-col h-[350px]">
          <li
            className={`mb-4 flex items-center ${
              progress.uploadImage ? "text-green-500" : "text-gray-500"
            }`}
          >
            {progress.uploadImage ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaTimesCircle className="mr-2" />
            )}
            Upload Image
          </li>
          <li
            className={`mb-4 flex items-center ${
              progress.serverProcessing ? "text-green-500" : "text-gray-500"
            }`}
          >
            {progress.serverProcessing ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaTimesCircle className="mr-2" />
            )}
            Processing
          </li>
          <li
            className={`mb-4 flex items-center ${
              progress.processCompleted ? "text-green-500" : "text-gray-500"
            }`}
          >
            {progress.processCompleted ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaTimesCircle className="mr-2" />
            )}
            Process Completed
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <div>
          <h2 className="font-bold text-lg mb-4">Payment Processing</h2>
          <div className="h-[125px] w-[230px] items-center justify-center flex border-2 ">
            <div className=" items-center justify-center flex">
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
          </div>
          {uploadedImage && (
            <div className="mb-4">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          {progress.uploadImage && !progress.processCompleted && (
            <div className="mb-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleServerProcessing}
              >
                Processing
              </button>
            </div>
          )}
          {progress.processCompleted && (
            <div className="text-green-500 font-bold">
              Process Completed Successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessing;
