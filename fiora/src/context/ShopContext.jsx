import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./UserContext";
import toast from "react-hot-toast";

import {
  getCart,
  AddToCart,
  decreaseCart,
  removeCart,
  clearCartitem,
} from "../api/cartApi";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useUser();

  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");



  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      setError("Failed to load cart");
    }
  };



  useEffect(() => {
    fetchCart();
  }, [user]);



  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await AddToCart(product.id);
      toast.success(`${product.name} added to cart`);
      fetchCart();
    } catch {
      toast.error("Failed to add item");
    }
  };



  const updateCartQuantity = async (productId, quantity) => {
    if (!user) return;

    try {
      if (quantity < 1) {
        await removeCart(productId);
      } else {
        await decreaseCart(productId);
      }

      fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };



  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await removeCart(productId);

      setCart((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );

      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };



  const clearCart = async () => {
    if (!user) return;

    try {
      await clearCartitem();
      setCart([]);
    } catch {
      toast.error("Failed to clear cart");
    }
  };



  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cart]
  );



  const cartItemsCount = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );



  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);