import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employee from "./models/Employee.js";
import Contact from "./models/Contact.js";
import jwt from "jsonwebtoken";
import Cart from "./models/Cart.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//.....................................................
const app = express();
app.use(express.json());
app.use(cookieParser()); 

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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


mongoose.connect(process.env.MONGO_URL);  


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

//......................... CONTACT ...............................
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact data saved successfully!" });
  } catch (error) {
    console.error("Error saving contact data:", error.message);
    res
      .status(500)
      .json({ error: "Failed to save contact data. Please try again later." });
  }
});

//.....................................................................................................................//

//...............cart...................................

app.post("/cart", async (req, res) => {
  try {
    const { productId, name, description, price, image, username, email } =
      req.body;
      console.log(req.cookies.token); 
    if (!productId || !name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCartItem = new Cart({
      productId,
      name,
      description,
      price,
      image,
      username,
      email,
    });

    await newCartItem.save();

    res.status(201).json({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding cart item:", error.message);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});


//............................get.....................
app.get("/orders/:userEmail", async (req, res) => {
  try {
    // Fetch all orders for the specified user from the database
    const orders = await Cart.find({ email: req.params.userEmail }); // Match the schema field
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});




//...............................................................................................................//
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server is running on port", port);
});
