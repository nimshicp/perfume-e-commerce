import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

function Wishlist() {
  const { user } = useUser();
  const { addToCart } = useShop();
  const { wishlist, removeFromWishList } = useWishlist();


const navigate = useNavigate();


  if (!user) {
    return null;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-8 text-center">
        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">Wishlist Empty</h1>
        <Link to="/products" className="text-blue-500">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        My Wishlist ({wishlist.length})
      </h1>

      <div className="space-y-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4" onClick={() => navigate(`/products/${product.id}`, { state: { product: product} })}>
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
                
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors flex-1 font-medium"
                onClick={() => {addToCart(product);
toast.success("item Added to cart")
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={() =>{ removeFromWishList(product.id);
                  toast.success("item removed from the wishlist")
                }}
                className="text-red-500 p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
