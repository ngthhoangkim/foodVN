import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { Home, Login, Menu, ShoppingCart } from "./containers/public";
import { Admin } from "./containers/admin";
import HomePage from "./containers/public/homePage";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/*các trang dành cho user */}
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SHOPPING_CART} element={<ShoppingCart />} />
          <Route path={path.MENU} element={<Menu />} />
        </Route>
        {/* các trang dành cho admin */}
        <Route path={path.ADMIN} element={<Admin />}> 
          
        </Route>
      </Routes>
    </div>
  );
}
export default App;
