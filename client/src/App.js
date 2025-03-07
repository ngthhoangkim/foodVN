import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { FoodDetail, Home, HomePage, Login, Menu, Profile, ShoppingCart } from "./containers/public";
import { Admin, AdminHome, ChefStaff, Customer, DetailFood, Food, Order, OrderStaff, Table } from "./containers/admin";


function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/*các trang dành cho user */}
        <Route path={path.HOME} element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SHOPPING_CART} element={<ShoppingCart />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.MENU} element={<Menu />} />
          <Route path={path.DETAIL} element={<FoodDetail />} />
        </Route>
        {/* các trang dành cho admin */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route index element={<AdminHome />} />
          <Route path={path.ADMIN_ORDER} element={<Order />} />
          <Route path={path.ADMIN_FOOD} element={<Food />} />
          <Route path={path.ADMIN_CUSTOMER} element={<Customer />} />
          <Route path={path.ADMIN_EMPLOYEE} element={<OrderStaff />} />
          <Route path={path.ADMIN_CHEF} element={<ChefStaff />} />
          <Route path={path.ADMIN_TABLE} element={<Table />} />
          <Route path={path.DETAIL_FOOD} element={<DetailFood />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
