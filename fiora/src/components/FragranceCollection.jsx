import React from 'react';

const FragranceCollections = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          OUR FRAGRANCE COLLECTIONS
          
        </h2>
        
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Women Collection */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Women</h3>
              <p className="text-gray-600 mb-4">
                Elegant and captivating fragrances designed for the modern woman.
              </p>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Men Collection */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("./products/perfume.jpg")'
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Men</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Bold and distinctive</span> scents that command attention and respect.
              </p>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Unisex Collection */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url("./products/perfume.jpg")'
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Unisex</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Universal fragrances for all</span>, transcending traditional boundaries.
              </p>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full transition-colors duration-300">
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