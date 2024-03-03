import React, { Suspense } from "react";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Income from "./Pages/Income";
import Expenses from "./Pages/Expenses";
import PageNotFound from "./Pages/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Loader from "./Components/Loader";

function App() {
  return (
    <BrowserRouter>
    <Suspense  fallback={<Loader/>}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<Welcome/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="income" element={<Income />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
