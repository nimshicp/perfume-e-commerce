import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const { user, setUser } = useUser();
  const [error,setError]=useState("")
   
  
  

  const UpdateDb = async (update) => {
    if (!user) {
      return null;
    }
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${user.id}`,
        update
      );
      const updatedUser = response.data;

      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError("failed to update");
    }
  };





useEffect(() => {
  const syncUser = (e) => {
    if (e.key === "currentUser") {
      const updatedUser = JSON.parse(e.newValue);
      setUser(updatedUser);
    }
  };

  window.addEventListener("storage", syncUser);

  return () => window.removeEventListener("storage", syncUser);
}, [setUser]);







  const addToWishList = async (product) => {
    if (!user) return;

    const currentWishList = user.wishlist || [];
    const existing = currentWishList.find((item) => item.id === product.id);

    if (existing) {
      setError("item is already included");
      
      return;
    }

    const newWishList = [...currentWishList, product];
    return await UpdateDb({ wishlist: newWishList });
  };

  const removeFromWishList = async (productId) => {
    if (!user) return;
    const currentWishList = user.wishlist || [];
    const newWishList = currentWishList.filter((item) => item.id !== productId);
    return await UpdateDb({ wishlist: newWishList });
  };

  const isWishList = (productId) => {
    return user?.wishlist?.some((item) => item.id === productId) || false;
  };
  const wishlist = user?.wishlist || [];








  return (
    <WishlistContext.Provider
      value={{ addToWishList, removeFromWishList, isWishList, wishlist}}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
