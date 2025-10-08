import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">   FIORA SCENTS.</h2>
          <p className="text-sm leading-relaxed">
            Discover your signature scent with Scentora.  
            We bring you timeless perfumes crafted with passion and luxury.
          </p>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe for new arrivals & exclusive offers.</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-r-lg text-white font-semibold">
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-pink-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-pink-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-400"><Mail size={20} /></a>
          </div>
        </div>

      </div>


      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Scentora Perfumes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
