import React from "react";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className="w-full h-full bg-gray-100 min-h-screen">
      <Navigation />

      <section className="relative w-full h-screen text-white">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://videos.pexels.com/video-files/2620043/2620043-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Asian Food</h2>
          <p className="mb-8">
            Discover the best Chinese and Korean at unbeatable prices!
          </p>
          <Link
            to="/cart"
            className="text-slate-800 bg-white border border-slate-400 px-5 py-2 rounded-lg font-bold hover:text-white hover:bg-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
