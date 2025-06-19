import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Favorites = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch favorite anime
    axios
      .get(`http://localhost:3001/favorites?email=${user.email}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFavoriteAnimes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite anime:", error);
      });

    // Fetch favorite books
    axios
      .get(`http://localhost:3001/books?email=${user.email}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFavoriteBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite books:", error);
      });
  }, [isAuthenticated, user.email]);

  // Remove favorite

  const removeFavorite = async (id, type) => {
    try {
      console.log("Removing:", id, "Type:", type); // Debugging
  
      if (type === "anime") {
        await axios.delete(`http://localhost:3001/favorites/${id}`, { withCredentials: true });
        setFavoriteAnimes((prev) => prev.filter((anime) => anime._id !== id));
      } else {
        await axios.delete(`http://localhost:3001/books/${id}`, { withCredentials: true });
        setFavoriteBooks((prev) => prev.filter((book) => book._id !== id));
      }
  
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navigation />

      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6">Your Favorite Items</h1>

        {/* Favorite Anime Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Favorite Anime</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteAnimes.length > 0 ? (
              favoriteAnimes.map((anime) => (
                <div key={anime._id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mt-2">{anime.name}</h3>
                  <p className="text-gray-400">{anime.description}</p>
                  <p className="text-yellow-400">Rating: {anime.rating}</p>
                  <button
                    onClick={() => removeFavorite(anime._id, "anime")}
                    className="mt-3 text-red-500"
                  >
                    <FaHeart />
                  </button>
                </div>
              ))
            ) : (
              <p>No favorite anime found.</p>
            )}
          </div>
        </section>

        {/* Favorite Books Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Favorite Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteBooks.length > 0 ? (
              favoriteBooks.map((book) => (
                <div key={book._id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                  <p className="text-gray-400">{book.description}</p>
                  <p className="text-yellow-400">Rating: {book.rating}</p>
                  <button
                    onClick={() => removeFavorite(book._id, "book")}
                    className="mt-3 text-red-500"
                  >
                    <FaHeart />
                  </button>
                </div>
              ))
            ) : (
              <p>No favorite books found.</p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
