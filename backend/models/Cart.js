import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  username: {
    type: String,
  },
  email:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
