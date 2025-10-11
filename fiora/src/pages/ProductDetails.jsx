import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useUser } from "../context/UserContext";


function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
const {addToCart} = useShop()
const {user} = useUser()


  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }




const handleAddToCart = () => {

  if(!user){
    alert("please login to add items to cart")
    return
  }
addToCart(product,1)
alert(`${product.name} is added to cart`)

}
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       

        
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-12">
    
            <div className="flex justify-center">
              <div className="aspect-square w-full max-w-md overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
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
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                
              </div>

    
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
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

    
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 py-3 text-lg font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
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

            
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors flex-1 font-medium"  onClick={handleAddToCart}>
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl transition-colors flex-1 font-medium">
                  Buy Now
                </button>

                <button className="p-4 rounded-xl border bg-white border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
