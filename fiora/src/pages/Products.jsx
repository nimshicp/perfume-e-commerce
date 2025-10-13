import React, { useEffect, useState } from "react";
import { Search, Menu ,ChevronDown} from "lucide-react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();
  const categoryProp = location.state?.category;

  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResult,setNoResult] = useState(false)
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/products");
        setProduct(res.data);

        if (categoryProp) {
          setFilteredProducts(
            res.data.filter((p) => p.category === categoryProp)
          );
        } else {
          setFilteredProducts(res.data);
        }

        setLoading(false);
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    FetchProducts();
  }, [categoryProp]);

  const handleSearch = () => {

let temp = [...product];

if (categoryProp){
  temp = temp.filter((p) => p.category === categoryProp)
}

if (search.trim() === "")
{
  setFilteredProducts(temp)
  setNoResult(false);
  return
}

const searched = temp.filter( (p) => p.name.toLowerCase().includes(search.toLowerCase()))

if(searched.length === 0){
  setFilteredProducts([])
    setNoResult(true)
  
}else{
  setFilteredProducts(searched)
  setNoResult(false)
}

  };


const handleFilter = (type) => {
    setFilterType(type);
    setShowFilter(false); 

    const sorted = [...filteredProducts].sort((a, b) => {
      if (type === "lowToHigh") return a.price - b.price;
      if (type === "highToLow") return b.price - a.price;
      return 0;
    });

    setFilteredProducts(sorted);
  };






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
      <div className="w-full bg-white border-b border-gray-200 relative">
        <div className="flex items-center gap-4 px-4 py-3">
  
          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded border"
            >
              <Menu size={18} />
              <span className="text-sm font-medium">Filter</span>
              <ChevronDown size={16} />
            </button>

            
            {showFilter && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md border w-48 z-10">
                <button
                  onClick={() => handleFilter("lowToHigh")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleFilter("highToLow")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>

      
          <div className="flex-1 relative max-w-5xl">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full pl-4 pr-16 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 bg-white text-sm"
            />
          </div>

          <button
            className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded"
            onClick={handleSearch}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

    
      <div className="p-4">
        {noResult ? (
          <h2 className="text-center text-gray-500 text-lg">No products found</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      
    </>
  );
}

export default Products;
