import React from 'react';

import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Cart() {
  const { user } = useUser();
  const { 
    cart = [],
    cartTotal = 0, 
    cartItemsCount = 0, 
    removeFromCart, 
    updateCartQuantity,
  clearCart,
    createOrder 
  } = useShop();




  const handleClearCart = async () => {
    console.log('Clear cart button clicked');
    try {
      await clearCart();
      console.log('Clear cart completed');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };



  const cartLength = cart?.length || 0;

  const handleCheckout = async () => {
    if (cartLength === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = await createOrder({
      shippingAddress: '123 Main St, City, Country',
      paymentMethod: 'Credit Card'
    });

    if (order) {
      alert(`✅ Order #${order.id} placed successfully!\nTotal: $${order.total?.toFixed(2)}`);
    }
  };

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to view your cart</p>
            <Link 
              to="/login"
              className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 rounded-lg font-semibold"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }


  if (cartLength === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h1>
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link 
              to="/products"
              className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
        
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">
              🛒 Shopping Cart
            </h1>
            <div className="text-lg text-gray-600">
              <span className="font-semibold">{cartItemsCount}</span> items
            </div>
          </div>

          
          <div className="space-y-4 mb-6">
            {cart?.map(item => ( 
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              


              
                <div className="flex-1">

                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                
              
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                  
              
                  <div className="w-20 text-right font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 text-lg"
                    title="Remove item"

                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total Amount:</span>
              <span className="text-2xl font-bold text-pink-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
              
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors" onClick={clearCart}
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                 Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;