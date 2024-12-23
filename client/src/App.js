
import React from "react";
import { Route, Routes } from "react-router-dom"; 
import Nav from "./components/nav"; 
import "./css/App.css";
import Home from "./pages/home"; 
import ShoppingCart from "./pages/shoppingCart"; 


function App() {
  return (
    <div>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/shopping-cart" element={<ShoppingCart />} /> 
      </Routes>
    </div>
  );
}
export default App;
