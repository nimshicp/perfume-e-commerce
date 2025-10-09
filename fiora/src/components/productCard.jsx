import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };
const {AddToCart}=useCart()

  const handleAddToCart=(e)=>
{
AddToCart(product,1)
alert (`${product.name} added to cart`)
}
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"  >
      <div className="relative" onClick={handleClick}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-pink-400 hover:text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-900">
              {product.category}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
