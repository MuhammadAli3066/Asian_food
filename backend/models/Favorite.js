import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
