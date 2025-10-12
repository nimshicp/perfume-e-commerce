import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useUser } from "../context/userContext";
import { useShop } from "../context/ShopContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItemsCount } = useShop();
  const {wishlist}=useWishlist()

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/"className="text-2xl font-bold text-gray-900 tracking-wider">
              FIORA SCENTS.
            </Link>
        

          </div>

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

          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart className="h-6 w-6" />
                </button>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            )}




            {user && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart size={24} />

                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            )}

            {user ? (
              <>
                <span className="text-gray-700 font-semibold">
                  Hi, {user.Username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            HOME
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            PRODUCTS
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            CONTACT
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
