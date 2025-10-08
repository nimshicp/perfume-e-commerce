import React, { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import axios from "axios";

function Products() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/products");
        setProduct(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    FetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(product);
    }
  }, [search, product]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 px-4 py-3">
          <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded">
            <Menu size={20} />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <div className="flex-1 relative max-w-5xl">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full pl-4 pr-16 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 bg-white text-sm"
            />
          </div>

          <button className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {" "}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium text-white">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
