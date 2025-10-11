import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext.jsx";


const Register = () => {
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    password: "",
  });

const {register,error} = useUser()
const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Username.trim()) newErrors.Username = "First name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if ( !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
    const userData ={
Username: formData.Username.trim(),
      email: formData.email.toLowerCase().trim(),
      password:formData.password,
    }

    const result = await register(userData)
      if(result){
        alert("Account created successfully")
navigate("/")
      }
    

      
      // setFormData({
      //   Username: "",
      //   email: "",
      //   password: "",
      // });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ apiError: "Failed to create account. Try again later." });
    }
  }
};



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-8">
          <h1 className="text-3xl font-bold text-center">CREATE ACCOUNT</h1>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
            Username
              </label>
              <input
                type="text"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Enter your first name"
              />
              {errors.Username && (
                <p className="mt-1 text-sm text-red-600">{errors.Username}</p>
              )}
            </div>

           

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
              CREATE
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
