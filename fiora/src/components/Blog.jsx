import React from 'react';

const Blog = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Our Fragrance Story
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
        </div>

        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          
          <div className="lg:w-2/5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="./products/perfume.jpg"
                alt="Artisan perfume craftsmanship"
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>

        
          <div className="lg:w-3/5">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-gray-100">
              <p className="text-gray-800 text-lg leading-relaxed tracking-wide">
                At Fiora, every perfume is a symphony of artistry and precision. 
                Our master perfumers blend rare ingredients sourced from around the world—delicate roses from Bulgaria, citrus from Sicily, and rich oud from Asia—to create scents that feel timeless.
                
                <span className="block mt-6"></span>
                
                We use traditional distillation and cold-pressing methods to preserve the natural essence of every note. 
                Each fragrance evolves beautifully throughout the day—from radiant top notes to deep, lasting base tones that linger gracefully.
                
                <span className="block mt-6"></span>
                
                Every spray tells a story of craftsmanship, emotion, and elegance—transforming perfume into an expression of self and sophistication.
              </p>

              
              <div className="flex items-center justify-center mt-8 space-x-2">
                <div className="w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

    
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 text-pink-600">
            <div className="w-20 h-px bg-pink-300"></div>
            <span className="text-sm font-light tracking-widest">Thank you</span>
            <div className="w-20 h-px bg-pink-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
