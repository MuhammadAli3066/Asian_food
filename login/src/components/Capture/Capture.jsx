import React, { useState, useRef, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

const Capture = () => {
  const [cameraActive, setCameraActive] = useState(false); // Tracks if the camera is active
  const [stream, setStream] = useState(null); // Stores the media stream object
  const videoRef = useRef(null); // Ref for the video element

  // Function to open the laptop camera
  const handleOpenCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera Stream:", mediaStream); // Log the media stream

      setStream(mediaStream);
      setCameraActive(true);
      // Set video element source inside useEffect after component mounts
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  // Function to stop the camera
  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  };

  // Effect to set video stream when component mounts and ref is available
  useEffect(() => {
    if (videoRef.current && stream && cameraActive) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      console.log("Video stream set to video element.");
    }
  }, [cameraActive, stream]); // Runs when cameraActive or stream changes

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-200">
      {/* Navigation Bar */}
      <nav className="bg-dark-blue py-4 px-6 shadow-md">
        <Navigation />
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        {/* Scanning Mode Information */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-100">Scanning Mode</h1>
          <p className="text-gray-400 mt-2">
            Activate your laptop's camera to start scanning.
          </p>
        </div>

        {/* Camera Area */}
        <div className="w-full max-w-md h-72 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
          {cameraActive ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg border-4 border-white"
              autoPlay
              playsInline
              style={{ border: "2px solid red" }} // Add border to check if video element is rendered
            />
          ) : (
            <p className="text-gray-500">Camera is currently inactive.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          {!cameraActive ? (
            <button
              onClick={handleOpenCamera}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition duration-300 hover:bg-blue-800"
            >
              Open Camera
            </button>
          ) : (
            <button
              onClick={handleCloseCamera}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition duration-300 hover:bg-red-800"
            >
              Close Camera
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-blue py-4 text-center text-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default Capture;
