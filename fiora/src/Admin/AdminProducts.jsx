
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3000";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const productsPerPage = 8;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "low") return product.stock > 0 && product.stock < 10 && matchesSearch;
    if (filter === "out") return product.stock === 0 && matchesSearch;
    if (filter.startsWith("cat:"))
      return product.category === filter.split(":")[1] && matchesSearch;
    return matchesSearch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: "",
    });
    setEditProduct(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      !formData.description ||
      !formData.image
    ) {
      toast.error("Fill all fields");
      return;
    }

    const newProduct = {
      ...formData,
      id: Date.now().toString(),
    };

    try {
      const res = await axios.post(`${API_BASE}/products`, newProduct);
      setProducts([res.data, ...products]);
      toast.success(`${newProduct.name} added successfully`);
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description || "",
      image: product.image || "",
    });
    setEditProduct(product);
    setShowModal(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const res = await axios.patch(
        `${API_BASE}/products/${editProduct.id}`,
        formData
      );
      setProducts(
        products.map((p) => (p.id === editProduct.id ? res.data : p))
      );
      toast.success(`${formData.name} updated successfully`);
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`${API_BASE}/products/${productId}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium  text-gray-500">Low Stock</h3>
          <p className="text-2xl font-bold text-yellow-800">{lowStockCount}</p>
        </div>

       <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium  text-gray-500">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-800">{outOfStockCount}</p>
        </div>

         <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium  text-gray-500">Categories</h3>
          <p className="text-2xl font-bold text-blue-800">
            {uniqueCategories.length}
          </p>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

     


      <div className="flex justify-end mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
        >
          <option value="all">All Products</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={`cat:${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="font-semibold text-green-600">
                    ${product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stock</span>
                  <span
                    className={`font-semibold ${
                      product.stock < 10 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-medium text-blue-600 capitalize">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400">
            Try adjusting your search or add a new product
          </p>
        </div>
      )}


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <form
                onSubmit={editProduct ? handleSubmitEdit : handleSubmitAdd}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {editProduct ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
