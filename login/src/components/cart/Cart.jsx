import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

const cartItems = [
  {
    id: 1,
    name: "Asian Oranage Chicken",
    description: "Asian Oranage Chicken with Green Onions for Dinner",
    price: "$80",
    image: "1.jpg",
  },
  {
    id: 2,
    name: "Tender juicy beef slices and mixed vegetables ",
    description:
      "Close up view of tender beef slices, mushrooms, broccoli, peppers and peas in white plate. Selective focus on single piece held by chopsticks.",
    price: "$100",
    image: "2.jpg",
  },
  {
    id: 3,
    name: " Freshly cooked mixed vegetables",
    description:
      "Close up view of vegetable dish consisting of eggplant, cabbage, mushrooms, and peppers in white plate with tangy sauce. Selective focus on front part of dish.",
    price: "$120",
    image: "3.jpg",
  },
  {
    id: 4,
    name: "Mongolian Noodles",
    description: "Mongolian Shrimp with Udon Noodles",
    price: "$150",
    image: "4.jpg",
  },
  {
    id: 5,
    name: "Japanese dumplings",
    description:
      "Japanese dumplings - Gyoza with pork meat and vegetables on a plate",
    price: "$150",
    image: "5.jpg",
  },
  {
    id: 6,
    name: "Stir fried marinated tofu",
    description:
      "Stir fried marinated tofu with sesame seeds, soy sauce and scallions in a bowl,",
    price: "$150",
    image: "6.jpg",
  },
  {
    id: 7,
    name: "Tofu in teriyaki sauce",
    description:
      "Tofu in teriyaki sauce with green onions, chili peppers and sesame. Asian food. Vegetarian food. Healthy eating",
    price: "$150",
    image: "7.jpg",
  },
  {
    id: 8,
    name: "Ramen with steaming sizzle ",
    description:
      "Ramen, ramen, Chinese noodles, steam, hot, soy sauce, up, sizzle, ramen, close-up, freshly made, warm",
    price: "$150",
    image: "8.jpg",
  },
  {
    id: 9,
    name: "Sweet and sour chicken on rice",
    description: "sweet and sour chicken on rice, shot up close",
    price: "$150",
    image: "9.jpg",
  },
  {
    id: 10,
    name: "Asian soba noodle and teriyak",
    description:
      "asian soba noodle and teriyaki salmon in black bowl, selective focus",
    price: "$150",
    image: "10.jpg",
  },
  {
    id: 11,
    name: "Jajangmyeon",
    description: "Jajangmyeon, Korean noodles in black bean sauce",
    price: "$150",
    image: "11.jpg",
  },
  {
    id: 12,
    name: "Roasted sea bream fish",
    description:
      "delicious roasted dorado or sea bream fish with lemon and orange slices, spices, fresh parsley and spinach on white platter on old dark wooden table view from above",
    price: "$150",
    image: "12.jpg",
  },
  {
    id: 13,
    name: "Korean Bibimbap Dish",
    description:
      "Bibimbap is a classic Korean dish, it's a bowl of rice topped with assorted seasoned vegetables and meat. To finish it off, a fried egg sits on top and a spicy chili sauce can be added",
    price: "$150",
    image: "13.jpg",
  },
  {
    id: 14,
    name: "Bulgogi",
    description: "Korean Style BBQ, Sliced Beef Marinated with Soy sauce",
    price: "$150",
    image: "14.jpg",
  },
  {
    id: 15,
    name: "Korean Fried beef",
    description: "cooked beef cuisine",
    price: "$150",
    image: "15.jpg",
  },
];

const Cart = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    console.log("Auth State:", state.auth);
    return state.auth || {};
  });

  const navigate = useNavigate();

  const handleBuyClick = async (item) => {
    try {
      if (!isAuthenticated) {
        alert("You must be logged in to make a purchase.");
        navigate("/login");
        return;
      }
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3001/cart", {
        productId: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        username: user.name,
        email: user.email,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <Navigation />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-300 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{item.price}</span>
                  <button
                    onClick={() => handleBuyClick(item)}
                    className="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-600 transition duration-300"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Cart;
