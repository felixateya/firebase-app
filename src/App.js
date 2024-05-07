import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Components/Loader";
// Lazy Loading Pages
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Profile = lazy(() => import("./Pages/Profile"));
const Income = lazy(() => import("./Pages/Income"));
const Expenses = lazy(() => import("./Pages/Expenses"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
// const Welcome = lazy(() => import("./Pages/Welcome"));

const style = {
  backgroundColor: "#926049",
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader style={style} />}>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Welcome />} /> */}
            <Route index element={<Dashboard />} />
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
