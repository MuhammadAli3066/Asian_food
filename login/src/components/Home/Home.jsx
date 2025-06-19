import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Heart icons for favorite/unfavorite
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [api2List, setApi2List] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState("purple"); // State for theme
  const [favorites, setFavorites] = useState([]); // State for favorites
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [popupMessage, setPopupMessage] = useState("");
  useEffect(() => {
    // Fetch anime data from Api.json
    fetch("/Api.json")
      .then((response) => response.json())
      .then((data) => setAnimeList(data))
      .catch((error) => console.error("Error fetching anime data:", error));

    // Fetch data from Api2.json (this could be the books data)
    fetch("/Api2.json")
      .then((response) => response.json())
      .then((data) => setApi2List(data))
      .catch((error) => console.error("Error fetching Api2 data:", error));
  }, []);

  // Slider automatic transition for Anime List
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically move to the next slide
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide, animeList]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + 1 >= Math.ceil(animeList.length / 3) ? 0 : prevSlide + 1
    );
  };

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide - 1 < 0 ? Math.ceil(animeList.length / 3) - 1 : prevSlide - 1
    );
  };

  // Helper function to split the animeList into groups of 3
  const chunkAnimeList = (list) => {
    const chunks = [];
    for (let i = 0; i < list.length; i += 3) {
      chunks.push(list.slice(i, i + 3));
    }
    return chunks;
  };

  // Handle theme change
  const changeTheme = () => {
    if (theme === "purple") {
      setTheme("blue");
    } else if (theme === "blue") {
      setTheme("grey");
    } else if (theme === "grey") {
      setTheme("pink");
    } else if (theme === "pink") {
      setTheme("red");
    } else if(theme === "red"){
      setTheme("yellow")
    }
     else {
      setTheme("purple");
    }
  };

  // Toggle favorite status


  const toggleFavorite = async (anime) => {
    const favoriteData = {
      name: anime.name,
      rating: anime.rating,
      description: anime.description,
      link: anime.link,
      email: user.email,
    };
  
    // Check if the anime is already in favorites
    const isFavorited = favorites.some((fav) => fav.id === anime.id);
  
    if (isFavorited) {
      // If the anime is already in favorites, do nothing
      setPopupMessage("Already in favorites!");
      setTimeout(() => setPopupMessage(""), 3000);
      return;
    }
  
    try {
      // Send the POST request to save the anime to favorites
      await axios.post("http://localhost:3001/favorites", favoriteData, {
        withCredentials: true,
      });
  
      // Add the anime to the favorites list
      setFavorites((prevFavorites) => [...prevFavorites, anime]);
  
      // Show success message
      setPopupMessage("Added to favorites!");
      setTimeout(() => setPopupMessage(""), 3000); // Hide message after 3 seconds
    } catch (err) {
      console.error("Error saving favorite:", err);
    }
  };
  
  //toggle favoritebooks//

  const toggleFavoriteBook = async (book) => {
    console.log("Book object:", book);

    const favoriteData1 = {
      name: book.name,
      rating: book.rating,
      description: book.description,
      image: book.image,
      link: book.link,
      email: user.email,
    };

    try {
      // Send the POST request to save the book to favorites
      await axios.post("http://localhost:3001/books", favoriteData1, {
        withCredentials: true,
      });

      // Update the state by including the whole book object instead of just the ID
      setFavorites((prevFavorites) => {
        // If the book is already in favorites, remove it
        const isBookFavorited = prevFavorites.some(
          (favBook) => favBook.id === book.id
        );

        if (isBookFavorited) {
          return prevFavorites.filter((favBook) => favBook.id !== book.id); // Remove the book
        } else {
          return [...prevFavorites, book]; // Add the entire book object
        }
      });
      setPopupMessage(
        favorites.some((favBook) => favBook.id === book.id)
          ? "Removed from favorites!"
          : "Added to favorites!"
      ); // Show message
      setTimeout(() => setPopupMessage(""), 3000); // Hide message after 3 seconds
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  // Determine theme styles
  const themeStyles = {
    purple: {
      bgColor: "bg-purple-950",
      textColor: "text-purple-200",
      buttonColor: "bg-purple-500",
      buttonHoverColor: "hover:bg-purple-600",
      sliderBgColor: "bg-purple-900",
    },
    pink: {
      bgColor: "bg-pink-600",
      textColor: "text-white",
      buttonColor: "bg-pink-500",
      buttonHoverColor: "hover:bg-pink-600",
      sliderBgColor: "bg-pink-800",
    },
    blue: {
      bgColor: "bg-blue-900",
      textColor: "text-white",
      buttonColor: "bg-blue-500",
      buttonHoverColor: "hover:bg-blue-600",
      sliderBgColor: "bg-blue-800",
    },
    grey: {
      bgColor: "bg-gray-800",
      textColor: "text-gray-200",
      buttonColor: "bg-gray-500",
      buttonHoverColor: "hover:bg-gray-600",
      sliderBgColor: "bg-gray-700",
    },
    red: {
      bgColor: "bg-red-800",
      textColor: "text-red-200",
      buttonColor: "bg-red-500",
      buttonHoverColor: "hover:bg-red-600",
      sliderBgColor: "bg-red-700",
    },
    yellow: {
      bgColor: "bg-yellow-800",
      textColor: "text-yellow-200",
      buttonColor: "bg-yellow-500",
      buttonHoverColor: "hover:bg-yellow-600",
      sliderBgColor: "bg-yellow-700",
    },
  };

  return (
    <div
      className={`${themeStyles[theme].bgColor} ${themeStyles[theme].textColor} min-h-screen flex flex-col transition-colors duration-500`}
    >
      {/* Navbar Component */}
      <Navigation />
      {popupMessage && (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white p-4 rounded-md shadow-md z-50"
          style={{ width: "auto", maxWidth: "300px", textAlign: "center" }}
        >
          {popupMessage}
        </div>
      )}
      {/* Main Content */}
      <div className="flex-grow container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* this is my left side div */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-200">
            Capture Your Mood
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Discover the beauty of self-expression and connect with your inner
            emotions. Let Mood Conexus guide you through your journey.
          </p>
          <Link
            to="/capture"
            className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} text-white text-center px-6 py-3 rounded-lg text-lg font-bold transition duration-300`}
            aria-label="Capture Mood"
          >
            Capture Mood
          </Link>
        </div>
        {/* this is right side of home div */}
        <div className="flex items-center justify-center">
          <img
            src="gif.gif" // Change this path to your GIF location
            alt="Your GIF description"
            className="w-full h-full rounded-l-full object-fill"
          />
        </div>
      </div>

      {/* Anime Slider */}
      <div
        className={`relative w-full mt-8 overflow-hidden ${themeStyles[theme].sliderBgColor}`}
      >
        {animeList.length > 0 && (
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {chunkAnimeList(animeList).map((animeGroup, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex items-center justify-center"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {animeGroup.map((anime) => (
                    <div key={anime.id} className="text-center p-6">
                      <img
                        src={anime.image}
                        alt={anime.name}
                        className="w-48 h-48 object-center rounded-lg mb-4 mx-auto"
                      />
                      <h2
                        className={`text-2xl font-bold ${themeStyles[theme].textColor} mb-2`}
                      >
                        {anime.name}
                      </h2>
                      <p
                        className={`text-sm mb-2 ${themeStyles[theme].textColor}`}
                      >
                        Rating: {anime.rating}
                      </p>
                      <p className="text-gray-400 mb-4">{anime.description}</p>
                      <Link
                        to={anime.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} text-white px-4 py-2 rounded-lg transition duration-300`}
                      >
                        Watch Now
                      </Link>
                      <button
                        onClick={() => toggleFavorite(anime)}
                        className="text-xl mt-2 ml-3"
                      >
                        {favorites.includes(anime.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full`}
          onClick={handlePrevious}
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        <button
          className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full`}
          onClick={handleNext}
          aria-label="Next Slide"
        >
          &gt;
        </button>
      </div>

      {/* Book Slider */}
      <div
        className={`relative w-full mt-8 overflow-hidden ${themeStyles[theme].sliderBgColor}`}
      >
        {api2List.length > 0 && (
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {chunkAnimeList(api2List).map((bookGroup, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex items-center justify-center"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookGroup.map((book) => (
                    <div key={book.id} className="text-center p-6">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-48 h-48 object-center rounded-lg mb-4 mx-auto"
                      />
                      <h2
                        className={`text-2xl font-bold ${themeStyles[theme].textColor} mb-2`}
                      >
                        {book.name}
                      </h2>
                      <p
                        className={`text-sm mb-2 ${themeStyles[theme].textColor}`}
                      >
                        Author: {book.rating}
                      </p>
                      <p className="text-gray-400 mb-4">{book.description}</p>
                      <Link
                        to={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} text-white px-4 py-2 rounded-lg transition duration-300`}
                      >
                        Read Now
                      </Link>
                      <button
                        onClick={() => toggleFavoriteBook(book)}
                        className="text-xl mt-2 ml-3"
                      >
                        {favorites.includes(book.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full`}
          onClick={handlePrevious}
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        <button
          className={`${themeStyles[theme].buttonColor} ${themeStyles[theme].buttonHoverColor} absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full`}
          onClick={handleNext}
          aria-label="Next Slide"
        >
          &gt;
        </button>
      </div>

      {/* Change Theme Button */}
      <button
        onClick={changeTheme}
        className="fixed bottom-8 right-8  bg-white text-purple-950 font-bold rounded-md hover:bg-black hover:text-white p-2"
      >
        Click me
      </button>

      <Footer />
    </div>
  );
};

export default Home;
