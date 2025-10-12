import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { Package, Calendar, MapPin, CreditCard, X, ChevronDown, ChevronUp } from 'lucide-react';

function OrderHistory() {
  const { getUserOrders, cancelOrder } = useOrder();
  const orders = getUserOrders();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await cancelOrder(orderId);
      if (result) {
        alert('Order cancelled successfully');
        setExpandedOrder(null);
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      alert('Failed to cancel order');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Your order history will appear here</p>
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const canCancel = order.status === 'pending' || order.status === 'confirmed';
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                
                {/* Order Header - Always Visible */}
                <div className="p-6 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span className="text-sm text-gray-600">
                            {item.name}
                            {index === 2 && order.items.length > 3 && ` +${order.items.length - 3} more`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details - Show for ALL orders */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Information */}
                      <div className="space-y-6">
                        
                        {/* Customer Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Shipping Information
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{order.shippingAddress}</p>
                            {order.customerInfo && (
                              <div className="mt-2 text-sm text-gray-600">
                                <p><strong>Name:</strong> {order.customerInfo.name}</p>
                                <p><strong>Email:</strong> {order.customerInfo.email}</p>
                                {order.customerInfo.phone && (
                                  <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment Information
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Method:</span>
                              <span className="font-medium capitalize">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Status:</span>
                              <span className={`font-medium ${
                                order.paymentStatus === 'paid' ? 'text-green-600' : 
                                order.paymentStatus === 'refunded' ? 'text-blue-600' :
                                'text-yellow-600'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Total */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Amount</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Cancel Button - Only show for pending/confirmed orders */}
                        {canCancel && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                          >
                            <X className="w-4 h-4 mr-2" />
                            {loading ? 'Cancelling...' : 'Cancel Order'}
                          </button>
                        )}

                        {/* Cancelled Order Message */}
                        {order.status === 'cancelled' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <p className="text-red-800 font-medium">Order Cancelled</p>
                            <p className="text-red-700 text-sm mt-1">
                              This order has been cancelled
                            </p>
                          </div>
                        )}

                        {/* Confirmed Order Message */}
                        {order.status === 'confirmed' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <p className="text-blue-800 font-medium">Order Confirmed</p>
                            <p className="text-blue-700 text-sm mt-1">
                              Your order is being processed
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;