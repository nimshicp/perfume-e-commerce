import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { registerUser, loginUser } from "../api/authApi";

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data) => {
  try {

    const res = await loginUser(data);

    const token = res.data.access;

    localStorage.setItem("access_token", token);

    
    const userData = {
      username: res.data.username
    };

    setUser(userData);

    localStorage.setItem("currentUser", JSON.stringify(userData));

    toast.success("Login successful");

    return userData;

  } catch (err) {

    toast.error("Invalid credentials");

    return null;

  }
};

  const register = async (userData) => {

    try {

      const res = await registerUser(userData);

      toast.success("Account created successfully");

      return res.data;

    } catch (err) {

      setError("Registration failed");

      toast.error("Registration failed");

      return null;

    }

  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("currentUser");

    localStorage.removeItem("access_token");

  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);