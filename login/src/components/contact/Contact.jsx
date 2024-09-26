import React, { useState } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/contact",
        formData
      );

      if (response.status === 201) {
        setIsSubmitted(true);

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Please enter another email");
    }
  };

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-400 via-slate-500 to-slate-300 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Contact Us
          </h2>
          {isSubmitted && (
            <p className="text-green-600 text-center mb-4">
              Thank you for contacting us!
            </p>
          )}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}{" "}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200 ease-in-out"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 focus:bg-blue-800 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
