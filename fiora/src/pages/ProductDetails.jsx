import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";

import toast from "react-hot-toast";
import { getProductDetails } from "../api/productApi";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, updateCartQuantity, cart } = useShop();
  const { user } = useUser();
  const { addToWishList, removeFromWishList, isWishList } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      const res = await getProductDetails(id);

      setProduct(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-xl font-bold">Product not found</h2>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 1;

  const isInCart = cart.some((item) => item.id === product.id);
  const isWishListed = isWishList(product.id);

  const ToggleEffect = async () => {

    if (!user) {
      toast.error("Please login to save items");
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

    } catch {

      toast.error("Failed to update wishlist");

    }

  };

  const handleAddToCart = () => {

    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    addToCart(product, 1);

    toast.success(`${product.name} added to cart`);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          <div className="grid lg:grid-cols-2 gap-12">

            <div className="flex justify-center">

              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-gray-100">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={ToggleEffect}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    isWishListed
                      ? "bg-white text-pink-500"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isWishListed ? "currentColor" : "none"}
                  />
                </button>

              </div>

            </div>

            <div className="space-y-6">

              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm capitalize">
                {product.category?.name || product.category}
              </span>

              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              <span className="text-3xl font-bold">
                ₹{product.price}
              </span>

              <p className="text-gray-700">
                {product.description}
              </p>

              <div className="grid grid-cols-3 gap-4">

                <div className="flex items-center gap-2">
                  <Truck size={20} />
                  <span className="text-sm">Free Shipping</span>
                </div>

                <div className="flex items-center gap-2">
                  <RotateCcw size={20} />
                  <span className="text-sm">30 Day Returns</span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  <span className="text-sm">Warranty</span>
                </div>

              </div>

              {isInCart && (

                <div className="flex items-center gap-4">

                  <button onClick={handleDecrease}>
                    <Minus />
                  </button>

                  <span>{quantity}</span>

                  <button onClick={handleIncrease}>
                    <Plus />
                  </button>

                </div>

              )}

              {isInCart ? (

                <button
                  onClick={handleGoToCart}
                  className="bg-black text-white px-6 py-3 rounded-lg"
                >
                  Go To Cart
                </button>

              ) : (

                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;