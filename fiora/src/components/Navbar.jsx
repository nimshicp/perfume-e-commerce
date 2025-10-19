import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";
import { useUser } from "../context/userContext";
import { useShop } from "../context/ShopContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItemsCount } = useShop();
  const { wishlist } = useWishlist();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 tracking-wider"
            >
              FIORA SCENTS.
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-900 text-gray-600">
              HOME
            </Link>
            <Link to="/products" className="hover:text-gray-900 text-gray-600">
              PRODUCTS
            </Link>
            <Link to="/about" className="hover:text-gray-900 text-gray-600">
              ABOUT
            </Link>
            <Link to="/contact" className="hover:text-gray-900 text-gray-600">
              CONTACT
            </Link>
          </div>

          {/* Icons & User Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Wishlist */}
            <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
              <Heart size={22} className="text-gray-700 hover:text-gray-900" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Orders */}
            <div className="relative cursor-pointer" onClick={() => navigate("/orders")}>
              <ShoppingBag size={22} className="text-gray-700 hover:text-gray-900" />
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCart size={22} className="text-gray-700 hover:text-gray-900" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>

            {/* User Profile */}
            {user ? (
              <>
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User size={22} className="text-gray-700 hover:text-gray-900" />
                  <span className="text-gray-700 font-semibold">
                     {user.Username}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 hover:text-gray-900 focus:outline-none"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-gray-900">
            HOME
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-gray-900">
            PRODUCTS
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-gray-900">
            ABOUT
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-gray-900">
            CONTACT
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Mobile Icons */}
          <div className="flex items-center justify-around text-gray-700">
            <Heart
              size={22}
              className="cursor-pointer hover:text-pink-600"
              onClick={() => {
                navigate("/wishlist");
                setMenuOpen(false);
              }}
            />
            <ShoppingBag
              size={22}
              className="cursor-pointer hover:text-blue-600"
              onClick={() => {
                navigate("/orders");
                setMenuOpen(false);
              }}
            />
            <ShoppingCart
              size={22}
              className="cursor-pointer hover:text-green-600"
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
            />
            <User
              size={22}
              className="cursor-pointer hover:text-gray-900"
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            />
          </div>

          {/* Login / Logout */}
          <div className="pt-3 text-center">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
