import React from 'react';
import { useNavigate } from 'react-router-dom';

const FragranceCollections = () => {


const navigate = useNavigate()

const handleCategory=(category)=>{
navigate("/products",{state:{category}});
}

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        
      
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Our Fragrance Collections
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
        </div>

        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("./products/women.jpg")'
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Women</h3>
              <p className="text-gray-600 mb-4">
                Elegant and captivating fragrances designed for the modern woman.
              </p>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-colors duration-300"  onClick={() => handleCategory("women")}>
                Shop Now
              </button>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("./products/men.jpg")'
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Men</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Bold and distinctive</span> scents that command attention and respect.
              </p>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-colors duration-300" onClick={() => handleCategory("men")}>
                Shop Now
              </button>
            </div>
          </div>

    
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("./products/unisex.jpg")',
                backgroundSize:310,

                
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Unisex</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Universal fragrances for all</span>, transcending traditional boundaries.
              </p>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-colors duration-300" onClick={() => handleCategory("unisex")}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FragranceCollections;