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
import Wishlist from "./pages/WishList";
import CheckOut from "./pages/CheckOut";
import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About";
import  Contact  from  "./pages/Contact";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";




function App() {
 
  return (
    <div>
    
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/about" element={<About/>}/>
        <Route path = "/contact" element={<Contact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path ="/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/wishlist" element ={<Wishlist/>}/>
        <Route path="/checkout" element = {<CheckOut/>}/>
        <Route path="/payment/:orderId" element={<PaymentPage/>}/>
        <Route path ="/order-confirmation/:orderId" element={<OrderConfirmation/>}/>
        <Route path="/orders" element={<OrderHistory/>}/>
        

      </Routes>
      < Footer/>
    
    </div>
  );
}

export default App;
