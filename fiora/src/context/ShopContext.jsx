import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

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





// const UpdateProductStock = async (updatedProduct) => {
//   try {
    
//     await axios.patch(`http://localhost:5000/products/${updatedProduct.id}`, updatedProduct);

  
//   } catch (err) {
//     console.error("Failed to update product stock", err);
//     toast.error("Failed to update stock");
//   }
// };





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







  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      setError("please login");
      return null;
    }

    if(product.stock<quantity){
      toast.error("not enough stock is available")
    }

    const currentCart = user.cart || [];
    const existingItem = currentCart.find((item) => item.id === product.id);

    let newCart;
    if (existingItem) {
if(existingItem.quantity>product.stock){
  toast.error("not enough stock is available")
}

      newCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity }];
    }

  //   const updatedProduct = { ...product, stock: product.stock - quantity };
  // await UpdateProductStock(updatedProduct); 

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




  
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const clearCart = async () => {
    if (!user) return;

    return await UpdateDb({ cart: [] });
  };





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
        
       
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
