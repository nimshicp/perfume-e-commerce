// components/UserManagement.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Mail,
  ShoppingBag,
  UserCheck,
  UserX,
  Shield,
  ShieldOff,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3000";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Block/Unblock user
  const toggleBlockUser = async (user) => {
    const action = user.isBlock ? "unblock" : "block";

    if (window.confirm(`Are you sure you want to ${action} ${user.Username}?`)) {
      try {
        const res = await axios.patch(`${API_BASE}/users/${user.id}`, {
          isBlock: !user.isBlock,
        });

        setUsers(users.map((u) => (u.id === user.id ? res.data : u)));
        toast.success(`User ${action}ed successfully`);
      } catch (error) {
        console.error("Error updating user status:", error);
        toast.error("Failed to update user status");
      }
    }
  };

  // Make user admin/remove admin
  const toggleAdminStatus = async (user) => {
    const action = user.role === "admin" ? "remove admin rights from" : "make admin";

    if (window.confirm(`Are you sure you want to ${action} ${user.Username}?`)) {
      try {
        const newRole = user.role === "admin" ? "user" : "admin";
        const res = await axios.patch(`${API_BASE}/users/${user.id}`, {
          role: newRole,
        });

        setUsers(users.map((u) => (u.id === user.id ? res.data : u)));
        toast.success(
          `Admin rights ${newRole === "admin" ? "granted" : "removed"} successfully`
        );
      } catch (error) {
        console.error("Error updating admin status:", error);
        toast.error("Failed to update admin status");
      }
    }
  };

  // Calculate user statistics
  const getUserStats = (user) => {
    const totalOrders = user.orders?.length || 0;
    const totalSpent =
      user.orders?.reduce(
        (sum, order) =>
          order.paymentStatus === "paid" ? sum + (order.total || 0) : sum,
        0
      ) || 0;

    return { totalOrders, totalSpent };
  };

  // Get status badge color and text
  const getStatusInfo = (user) => {
    if (user.isBlock) {
      return {
        text: "Blocked",
        color: "bg-red-100 text-red-800",
        icon: <UserX className="w-4 h-4" />,
      };
    }

    return {
      text: "Active",
      color: "bg-green-100 text-green-800",
      icon: <UserCheck className="w-4 h-4" />,
    };
  };

  // Get admin badge
  const getAdminBadge = (user) => {
    if (user.role === "admin") {
      return {
        text: "Admin",
        color: "bg-purple-100 text-purple-800",
        icon: <Shield className="w-4 h-4" />,
      };
    }

    return {
      text: "User",
      color: "bg-gray-100 text-gray-800",
      icon: <Users className="w-4 h-4" />,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user access and admin permissions</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter((user) => !user.isBlock).length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Blocked Users</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter((user) => user.isBlock).length}
              </p>
            </div>
            <UserX className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Admins</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter((user) => user.role === "admin").length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const stats = getUserStats(user);
                const statusInfo = getStatusInfo(user);
                const adminInfo = getAdminBadge(user);

                return (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.isBlock ? "bg-red-50" : ""}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            user.isBlock
                              ? "bg-red-100"
                              : user.role === "admin"
                              ? "bg-purple-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {user.isBlock ? (
                            <UserX className="w-5 h-5 text-red-600" />
                          ) : user.role === "admin" ? (
                            <Shield className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Users className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.Username}
                            {user.isBlock && (
                              <span className="ml-2 text-xs text-red-600">(Blocked)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        {stats.totalOrders} orders
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${adminInfo.color}`}
                      >
                        {adminInfo.icon}
                        {adminInfo.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {/* Block/Unblock Button */}
                        <button
                          onClick={() => toggleBlockUser(user)}
                          disabled={user.id === currentUser?.id}
                          className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                            user.isBlock
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          } ${user.id === currentUser?.id ? "opacity-50 cursor-not-allowed" : ""}`}
                          title={
                            user.id === currentUser?.id
                              ? "You cannot block yourself"
                              : user.isBlock
                              ? "Unblock User"
                              : "Block User"
                          }
                        >
                          {user.isBlock ? (
                            <>
                              <UserCheck className="w-4 h-4" /> Unblock
                            </>
                          ) : (
                            <>
                              <UserX className="w-4 h-4" /> Block
                            </>
                          )}
                        </button>

                        {/* Make Admin/Remove Admin Button */}
                        <button
                          onClick={() => toggleAdminStatus(user)}
                          disabled={user.id === currentUser?.id}
                          className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                            user.role === "admin"
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          } ${user.id === currentUser?.id ? "opacity-50 cursor-not-allowed" : ""}`}
                          title={
                            user.id === currentUser?.id
                              ? "You cannot change your own admin status"
                              : user.role === "admin"
                              ? "Remove Admin Rights"
                              : "Make Admin"
                          }
                        >
                          {user.role === "admin" ? (
                            <>
                              <ShieldOff className="w-4 h-4" /> Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" /> Make Admin
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No users found</p>
            <p className="text-gray-400">
              {searchTerm ? "Try adjusting your search" : "No users in the system"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
