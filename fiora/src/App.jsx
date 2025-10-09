import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";


function App() {
 
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path ="/products/:id" element={<ProductDetails/>}/>
        <Route path ="/cart" element={<Cart/>}/>

      </Routes>
      < Footer/>
    
    </div>
  );
}

export default App;
