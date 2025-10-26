import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, cart } = useShop();
  const { user } = useUser();
  const { addToWishList, removeFromWishList, isWishList } = useWishlist();

  const isWishListed = isWishList(product.id);

  const isInCart = cart.some((item) => item.id === product.id);
  const [GoToCart, setGoToCart] = useState(isInCart);

  const ToggleEffect = async () => {
    if (!user) {
      toast.error("please login to save items");
      return;
    }
    try {
      if (isWishListed) {
        await removeFromWishList(product.id);
        toast.success(`${product.name} removed from wishlist`);
      } else {
        await addToWishList(product);
        toast.success(`${product.name} added to wishlist`);
      }
    } catch (err) {
      toast.error("failed to update wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(product, 1);
    setGoToCart(true);
    toast.success(`${product.name} added to cart!`);
  };

  const handleGoToCart = (e) => {
    e.stopPropagation();
    navigate("/cart");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    // if (!user) {
    //   toast.error("Please login to buy items");
    //   return;
    // }
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          onClick={handleBuyNow}
        />

        <button
          onClick={ToggleEffect}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all z-10 ${
            isWishListed
              ? "bg-white text-pink-500"
              : "bg-white text-gray-600 hover:bg-white "
          } `}
          // title={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} fill={isWishListed ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                product.stock > 10
                  ? "bg-green-100 text-green-800"
                  : product.stock > 0
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `${product.stock} left` : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-1xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-900">
              {product.category}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {GoToCart ? (
            <button
              onClick={handleGoToCart}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Add to Cart
            </button>
          )}
          {/* <button
            onClick={handleBuyNow}
            className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            View Product
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
