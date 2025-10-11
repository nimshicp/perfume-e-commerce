import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";
import { Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const{addToWishList,removeFromWishList,isWishList,addToCart}=useShop()
  const {user} = useUser()


const isWishListed = isWishList(product.id)

  
  const handleClick = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };


const ToggleEffect = async () => {
if(!user) {
  alert("please login to save items")
  return
}
try{
if(isWishListed){
  return  await removeFromWishList(product.id)
}else{
  return await addToWishList(product)
}

}catch(err){
  alert("failed to update wishlist")

}

}





  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"  >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />

        <button
        onClick={ToggleEffect}
    
        className={`absolute top-2 right-2 p-2 rounded-full transition-all z-10 ${
          isWishListed  
            ? 'bg-white text-pink-500' 
            : 'bg-white text-gray-600 hover:bg-white '
        } `}
        title={isWishListed ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart 
          size={20} 
          fill={isWishListed  ? "currentColor" : "none"}
        />
      </button>   can explain the working
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
          onClick={handleClick}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          SELECT OPTION
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
