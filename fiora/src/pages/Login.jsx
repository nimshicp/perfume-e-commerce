import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {

    const navigate =useNavigate()
    const {login,user} = useUser()
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usernameOrEmail) newErrors.usernameOrEmail = "Username or Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;


      const foundUser = users.find(
        (u) =>
          (u.Username === formData.usernameOrEmail ||
            u.email === formData.usernameOrEmail) &&
          u.password === formData.password
      );

      
      if (foundUser) {
    
        if (foundUser.isBlock) {
          toast.error("Your account has been blocked by the admin!");
          setFormData({
            usernameOrEmail: "",
    password: "",
          })

          return; 
        }

        
        toast.success("Login successful!");
        login(foundUser); 
        navigate("/");
      } else {
        toast.error("Invalid username/email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Server error! Please try again later.");
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-8">
          <h1 className="text-3xl font-bold text-center">LOGIN</h1>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Enter your username or email"
              />
              {errors.usernameOrEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.usernameOrEmail}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-900 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;