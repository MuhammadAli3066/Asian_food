import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
});

const Favoritebook = mongoose.model("Favoritebook", favoriteSchema);

export default Favoritebook;
