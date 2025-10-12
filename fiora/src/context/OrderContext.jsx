import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useShop } from "./ShopContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user, setUser } = useUser();
  const [error, setError] = useState("");
  const { cart, cartTotal, clearCart } = useShop();

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

  const createOrder = async (orderData) => {
    if (!user) {
      setError("please login to create order");
      return null;
    }

    try {
      const order = {
        id: Date.now(),
        userId: user.id,
        items: cart,
        total: cartTotal,
        status: "pending",
        shippingAddress: orderData.shippingAddress || "",
        paymentMethod: orderData.paymentMethod || "",
        paymentStatus: "pending",
        customerInfo: orderData.customerInfo|| {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const currentOrders = user.orders || [];
      const newOrders = [...currentOrders, order];
      const updatedUser = await UpdateDb({
        orders: newOrders,
        cart: [],
      });
      return order;
    } catch (err) {
      setError("failed to create order");
      return null;
    }
  };

  const processUPIPayment = async (orderId, upiId) => {
    if (!user) return null;
    try {
      const orders = user.orders || [];
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            paymentMethod: "UPI",
            paymentStatus: "paid",
            status: "confirmed",
            paidAt: new Date().toISOString,
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      });
      const updatedUser = await UpdateDb({ orders: updatedOrders });
      return updatedUser;
    } catch (err) {
      setError("UPI payment failed");
      alert("UPI payment failed");
      return null;
    }
  };

  const cashOnDelivery = async (orderId) => {
    if (!user) return null;
    try {
      const orders = user.orders || [];
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            paymentMethod: "cash on delivery",
            paymentStatus: "pending",
            status: "confirmed",
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      });
      const updatedUser = await UpdateDb({ orders: updatedOrders });
      return updatedUser;
    } catch (err) {
      setError("failed to confirm");
      alert("failed to confirm");
      return null;
    }
  };





const cancelOrder = async (orderId) => {
  if (!user) return null;

  try {
    const orders = user.orders || [];
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'cancelled',
          paymentStatus: order.paymentStatus === 'paid' ? 'refunded' : 'cancelled',
          cancelledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    });

    const updatedUser = await UpdateDb({ orders: updatedOrders });
    return updatedUser;
  } catch (err) {
    setError('Failed to cancel order');
    return null;
  }
};





  const getUserOrders = () => {
    if (!user) return [];
    return user.orders || [];
  };

  const getOrderById = (orderId) => {
    if (!user) return null;
    const orders = user.orders || [];
    return orders.find((order) => order.id === orderId) || null;
  };

  return (
    <OrderContext.Provider value={{ createOrder, getUserOrders, getOrderById , cashOnDelivery,processUPIPayment,cancelOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
