import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const product = location.state?.product;

  const { addToCart, updateCartQuantity, cart } = useShop();
  const { user } = useUser();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 1;

  const isInCart = cart.some((item) => item.id === product.id);
  const [GoToCart, setGoToCart] = useState(isInCart);

  const { addToWishList, removeFromWishList, isWishList } = useWishlist();

  const isWishListed = isWishList(product.id);

  const ToggleEffect = async () => {
    if (!user) {
      toast.error("please login to save items");
      return;
    }
    try {
      if (isWishList(product.id)) {
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

  const handleAddToCart = () => {
    if (!user) {
      toast.error("please login to add items to cart");
    }
    addToCart(product, 1);
    setGoToCart(true);
  };

  const handleIncrease = () => {
    updateCartQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateCartQuantity(product.id, quantity - 1);
    } else {
      updateCartQuantity(product.id, 0);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={ToggleEffect}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all z-20 ${
                    isWishListed
                      ? "bg-white text-pink-500"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  title={
                    isWishListed ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={20}
                    fill={isWishListed ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium capitalize">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck size={20} className="text-green-500" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RotateCcw size={20} className="text-blue-500" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield size={20} className="text-amber-500" />
                  <span className="text-sm">2-Year Warranty</span>
                </div>
              </div>
              {isInCart && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex border border-gray-300 rounded-lg">
                      <button
                        onClick={handleDecrease}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-6 py-3 text-lg font-medium min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrease}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      {quantity} {quantity === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {GoToCart && isInCart ? (
                  <button
                    className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors flex-1 font-medium"
                    onClick={handleGoToCart}
                  >
                    <ShoppingCart size={20} />
                    Go to cart
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors flex-1 font-medium"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
