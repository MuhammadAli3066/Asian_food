import { Provider } from "react-redux";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import About from "./components/About/About";
import store from "../src/components/Redux/store";
import Contact from "./components/Contact/Contact";
import Capture from "./components/Capture/Capture";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState for managing theme state
import Favorites from "./components/Favorite/Favorite";

function App() {
  const [theme, setTheme] = useState("purple"); // Default theme

  // Function to toggle the theme
  const changeTheme = () => {
    if (theme === "purple") {
      setTheme("blue");
    } else if (theme === "blue") {
      setTheme("grey");
    } else if (theme === "grey") {
      setTheme("pink");
    } else {
      setTheme("purple");
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Pass theme and changeTheme function as props */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home theme={theme} changeTheme={changeTheme} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About theme={theme} changeTheme={changeTheme} />} />
          <Route path="/contact" element={<Contact theme={theme} changeTheme={changeTheme} />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
