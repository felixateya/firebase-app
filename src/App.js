import React from "react";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />}>
          <Route index element ={<Navigate replace to="dashboard"/>}/>
          <Route path="dashboard" element ={<Dashboard/>}/>
          <Route path="profile" element ={<Profile/>}/>
        </Route> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
