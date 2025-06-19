import React from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

<<<<<<< HEAD
const Contact = ({ theme, changeTheme }) => {
  // Define theme-specific styles
  const themeStyles = {
    purple: "text-purple-400 bg-purple-900",
    blue: "text-blue-400 bg-blue-900",
    grey: "text-gray-400 bg-gray-800",
    pink: "text-pink-400 bg-pink-900",
=======
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
        `${import.meta.env.VITE_API_URL}/contact`,
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
>>>>>>> 1a720f295611f49ac384cc01492b372ddc21057e
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeStyles[theme]}`}>
      {/* Navbar Component */}
      <Navigation />

      {/* Floating Theme Toggle Button */}
      <button
        onClick={changeTheme}
        className="fixed bottom-8 right-8  bg-white text-purple-950 font-bold rounded-md hover:bg-black hover:text-white p-2"
        aria-label="Change Theme"
      >
        Click me
      </button>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
          <p className="text-lg md:text-xl mt-4">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-black"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-black"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-black"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-purple-950 font-bold rounded-md hover:bg-black hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;
