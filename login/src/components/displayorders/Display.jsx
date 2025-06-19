import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";

const Display = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${user.email}`);
          setOrders(response.data); 
        } catch (err) {
          setError("Failed to fetch orders. Please try again.");
        } finally {
          
        }
      } else {
        setError("User not authenticated.");
      }
    };

    fetchOrders();
  }, [isAuthenticated, user?.email]);

 
  return (
    <>
     <Navigation />
      <div className="container mx-auto p-6 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Order Records</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border border-gray-300">Product ID</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Description</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
              <th className="py-2 px-4 border border-gray-300">Image</th>
              <th className="py-2 px-4 border border-gray-300">Username</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border border-gray-300">{order.productId}</td>
                <td className="py-2 px-4 border border-gray-300">{order.name}</td>
                <td className="py-2 px-4 border border-gray-300">{order.description}</td>
                <td className="py-2 px-4 border border-gray-300">{order.price}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <img src={order.image} alt={order.name} className="w-16 h-16" />
                </td>
                <td className="py-2 px-4 border border-gray-300">{order.username}</td>
                <td className="py-2 px-4 border border-gray-300">{order.email}</td>
                <td className="py-2 px-4 border border-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Display;
