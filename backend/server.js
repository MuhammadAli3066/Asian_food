import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employee from "./models/Employee.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Favorite from "./models/Favorite.js";
import Favoritebook from "./models/Favoritebook.js";
//.....................................................
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["PUT", "POST", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET_alikhan");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

// mongoose.connect("mongodb://localhost:27017/Employee");

mongoose
  .connect("mongodb://localhost:27017/Employee", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process if the connection fails
  });
//..................Login.................................

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  Employee.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ id: user._id }, "JWT_SECRET_alikhan", {
            expiresIn: "1d",
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          });

          res.status(200).json({
            status: "success",
            token,
            user: { name: user.name, email: user.email },
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Incorrect password",
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "Record not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "An error occurred on the server",
      });
    });
});

//..............................................................................................................//

//.........................register...............................

app.post("/register", (req, res) => {
  Employee.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//...............................................................................................................//

app.post("/favorites", async (req, res) => {
  try {
    const { name, rating, description, link, email } = req.body;

    // Create new favorite entry
    const newFavorite = new Favorite({
      name,
      rating,
      description,
      link,
      email,
    });

    // Save to database
    await newFavorite.save();

    res
      .status(201)
      .json({ message: "Favorite added successfully", newFavorite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//........................favbooks.................................//

app.post("/books", async (req, res) => {
  const { name, rating, description, image, link, email } = req.body;

  try {
    // Check if the book already exists for the user to avoid duplicates
    const existingBook = await Favoritebook.findOne({ name, email });
    if (existingBook) {
      return res.status(400).json({ message: "Book already in favorites." });
    }

    // Create and save the new book to the database
    const newBook = new Favoritebook({
      name,
      rating,
      description,
      image,
      link,
      email,
    });
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    console.error("Error adding book to favorites:", error);
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
});
//......................get for favorites......................//
app.get("/favorites", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Debugging: Log email to check the request
    console.log("Fetching favorites for email:", email);

    const favorites = await Favorite.find({ email });

    // Debugging: Log fetched favorites
    console.log("Fetched favorites:", favorites);

    if (!favorites.length) {
      return res
        .status(404)
        .json({ message: "No favorites found for this email" });
    }

    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
//.................get req for books ...............//

app.get("/books", async (req, res) => {
  const { email } = req.query;
  try {
    const favoriteBooks = await Favoritebook.find({ email });
    res.status(200).json(favoriteBooks);
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    res.status(500).json({ message: "Error fetching favorite books" });
  }
});
//................delete router....................//
app.delete("/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Favoritebook.findByIdAndDelete(id);
    res.status(200).json({ message: "Book removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite book:", error);
    res.status(500).json({ message: "Error removing favorite book" });
  }
});
//............................................................//
app.listen(3001, () => {
  console.log("server is running");
});
