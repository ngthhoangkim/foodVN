import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { Home, Login, Menu, ShoppingCart } from "./containers/public";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.SHOPPING_CART} element={<ShoppingCart />} />
        <Route path={path.MENU} element={<Menu />} />
      </Routes>
    </div>
  );
}
export default App;
