import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Products from "./pages/Products";


function App() {
 
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
      < Footer/>
    
    </div>
  );
}

export default App;
