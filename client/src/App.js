import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { Home, Login } from "./containers/public";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
