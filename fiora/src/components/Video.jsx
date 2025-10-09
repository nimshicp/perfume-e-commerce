import React from 'react';
import { useNavigate } from 'react-router-dom';

const Video = () => {

const navigate = useNavigate()

const handleCategory=(category)=>{
navigate("/products",{state:{category}});
}

  return (
    <div className="relative h-screen overflow-hidden">
  
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ height: 650 }}
        >
          <source src="/products/making.mp4" type="video/mp4" />
  
        </video>
      </div>
      
      <div className="absolute inset-0  bg-opacity-40" style={{ height: 650 }} />
      
      <div className="relative z-10 flex items-center justify-center h-full text-center text-gray px-4">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-4 tracking-wide text-white" style={{fontFamily:'sans-serif'}}>
            Experience Elegance in Every Drop!
          </h2>
        
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 text-gray">
            Exclusively Available Online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-semibold text-sm md:text-lg hover:bg-pink-300 hover:text-white transition-colors duration-300 rounded-2xl" onClick={() => handleCategory("women")}>
              SHOP WOMEN
            </button>
            <button className="border-2 border- text-gray-500 px-6 py-3 md:px-8 md:py-4 font-semibold text-sm md:text-lg hover:bg-pink-300 hover:text-white hover:border-pink-300 transition-colors duration-300 rounded-2xl" onClick={() => handleCategory("men")}>
              SHOP MEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;