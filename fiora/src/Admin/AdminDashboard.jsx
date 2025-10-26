import React, { useEffect, useState } from 'react'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  TrendingUp
} from 'lucide-react'
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const API_BASE = "http://localhost:5000";

function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState([])
  const [chartData, setChartData] = useState({
    monthlyRevenue: [],
    orderStatus: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const [users, products] = await Promise.all([
          fetch(`${API_BASE}/users`).then(res => res.json()),
          fetch(`${API_BASE}/products`).then(res => res.json()),
        ]);

        let totalRevenue = 0;
        let totalOrders = 0;
        let activeUsers = 0;

        // Order status tracking
        const orderStatusCount = {
          pending: 0,
          confirmed: 0,
          cancelled: 0
        };

        // Calculate simple category distribution
        const categoryCount = {};
        products.forEach(product => {
          const category = product.category || 'unisex';
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        // Convert to array
        const categoryDistribution = Object.keys(categoryCount).map(category => ({
          name: category.charAt(0).toUpperCase() + category.slice(1),
          count: categoryCount[category],
          percentage: ((categoryCount[category] / products.length) * 100).toFixed(1)
        })).sort((a, b) => b.count - a.count); // Sort by count descending

        setCategoryData(categoryDistribution);

        users.forEach(user => {
          if (user.orders) {
            totalOrders += user.orders.length;
            user.orders.forEach(order => {
              if (order.paymentStatus === "paid") {
                totalRevenue += order.total;
              }

              // Count order status
              if (order.status === 'pending' || order.status === 'confirmed' || order.status === 'cancelled') {
                orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;
              }
            })
          }
          if (user.isActive !== false) {
            activeUsers++;
          }
        });

        // Generate monthly revenue from orders
        const monthlyRevenueMap = {};
        users.forEach(user => {
          if (user.orders) {
            user.orders.forEach(order => {
              if (order.paymentStatus === "paid" && order.createdAt) {
                const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short' });
                monthlyRevenueMap[month] = (monthlyRevenueMap[month] || 0) + order.total;
              }
            });
          }
        });

        // Fill missing months
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyRevenue = months.map(month => ({
          month,
          revenue: monthlyRevenueMap[month] || 0
        }));

        // Order status data
        const orderStatus = Object.entries(orderStatusCount)
          .map(([status, count]) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: count,
            count: count,
            percentage: totalOrders > 0 ? ((count / totalOrders) * 100).toFixed(1) : '0'
          }))
          .filter(item => item.value > 0);

        setStats({
          totalUsers: users.length,
          activeUsers,
          totalOrders,
          totalRevenue,
          totalProducts: products.length,
        });

        setChartData({
          monthlyRevenue,
          orderStatus
        });

      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Colors
  const COLORS = {
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  };

  const ORDER_COLORS = {
    pending: COLORS.warning,
    confirmed: COLORS.success,
    cancelled: COLORS.error
  };

  const CATEGORY_COLORS = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-red-500',
    'bg-pink-500'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's your store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue?.toLocaleString() || '0'}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders?.toLocaleString() || 0}</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers?.toLocaleString() || 0}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts?.toLocaleString() || 0}</p>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone"
                  dataKey="revenue" 
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={chartData.orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.orderStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={ORDER_COLORS[entry.name.toLowerCase()]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {chartData.orderStatus.map((status) => (
              <div key={status.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ORDER_COLORS[status.name.toLowerCase()] }}
                />
                <span className="text-gray-600">{status.name}</span>
                <span className="font-semibold">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Category Distribution */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Categories</h3>
        
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={category.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${CATEGORY_COLORS[index % CATEGORY_COLORS.length]}`} />
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.percentage}% of total products</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{category.count}</p>
                <p className="text-sm text-gray-600">products</p>
              </div>
            </div>
          ))}
          
          {categoryData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No category data available</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {categoryData.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Categories</span>
              <span className="font-semibold text-gray-900">{categoryData.length}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold text-gray-900">{stats.totalProducts}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard