import { Provider } from "react-redux";
import "./App.css";
import Cart from "./components/cart/Cart";
import Contact from "./components/contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import store from "../src/components/Redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from "./components/displayorders/Display";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/display" element={<Display />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
