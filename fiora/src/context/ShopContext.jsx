import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user, setUser } = useUser();
  const [error, setError] = useState("");

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

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      setError("please login");
      return null;
    }

    const currentCart = user.cart || [];
    const existingItem = currentCart.find((item) => item.id === product.id);

    let newCart;
    if (existingItem) {
      newCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity }];
    }
    return await UpdateDb({ cart: newCart });
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    const currentCart = user.cart || [];
    const newCart = currentCart.filter((item) => item.id !== productId);
    return await UpdateDb({ cart: newCart });
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    if (!user) return;

    if (newQuantity < 1) {
      return await removeFromCart(productId);
    }

    const currentCart = user.cart || [];
    const newCart = currentCart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    return await UpdateDb({ cart: newCart });
  };

  const cart = user?.cart || [];
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = async () => {
    if (!user) return;

    return await UpdateDb({ cart: [] });
  };



  const addToWishList = async (product) => {
    if (!user) return;

    const currentWishList = user.wishlist || [];
    const existing = currentWishList.find(item => item.id ===product.id);

    if(existing){
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
    return user?.wishlist?.some(item => item.id ===productId) || false;
  };
const wishlist = user?.wishlist || [];


  return (
    <ShopContext.Provider
      value={{
        addToCart,
        cart,
        removeFromCart,
        updateCartQuantity,
        cartTotal,
        cartItemsCount,
        clearCart,
        addToWishList,
        removeFromWishList,
        isWishList,
        wishlist
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
