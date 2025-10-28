
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3000";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  
  const flattenOrders = (users) => {
    let allOrders = [];
    users.forEach((user) => {
      user.orders.forEach((order) => {
        allOrders.push({
          ...order,
          userName: user.Username,
          userEmail: user.email,
          userId: user.id,
        });
      });
    });
    return allOrders;
  };

  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/users`);
      const flattened = flattenOrders(res.data);
      setOrders(flattened);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const updateOrderStatus = async (order, newStatus) => {
    try {
      const res = await axios.get(`${API_BASE}/users/${order.userId}`);
      const user = res.data;

      const updatedOrders = user.orders.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      );

      await axios.patch(`${API_BASE}/users/${order.userId}`, {
        orders: updatedOrders,
      });

      setOrders(
        orders.map((o) =>
          o.id === order.id ? { ...o, status: newStatus } : o
        )
      );

      toast.success(`Order status updated to ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    }
  };


  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "Pending",
          color: "bg-yellow-100 text-yellow-800",
          icon: <XCircle className="w-4 h-4" />,
        };
      case "confirmed":
        return {
          text: "Confirmed",
          color: "bg-blue-100 text-blue-800",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "shipped":
        return {
          text: "Shipped",
          color: "bg-purple-100 text-purple-800",
          icon: <ShoppingBag className="w-4 h-4" />,
        };
      case "delivered":
        return {
          text: "Delivered",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "cancelled":
        return {
          text: "Cancelled",
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          text: status,
          color: "bg-gray-100 text-gray-800",
          icon: <ShoppingBag className="w-4 h-4" />,
        };
    }
  };

  
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-blue-600">{confirmedOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">{shippedOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
        </div>
      </div>

    
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders by ID, user, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>


      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ordered Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status);

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.userName} <br />
                      <span className="text-gray-500 text-xs">
                        {order.userEmail}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     <p className="text-sm text-gray-500">
  {new Date(order.createdAt).toLocaleDateString()}
</p>

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        <span className="ml-1">{statusInfo.text}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {order.status !== "delivered" &&
                        order.status !== "cancelled" && (
                          <>
                            {order.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "confirmed")
                                  }
                                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "cancelled")
                                  }
                                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                            {order.status === "confirmed" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "shipped")
                                  }
                                  className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs"
                                >
                                  Ship
                                </button>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "cancelled")
                                  }
                                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                            {order.status === "shipped" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "delivered")
                                  }
                                  className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                >
                                  Deliver
                                </button>
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order, "cancelled")
                                  }
                                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </>
                        )}

                      {(order.status === "delivered" ||
                        order.status === "cancelled") && (
                        <span className="text-gray-500 text-xs italic">
                          No further action
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
