import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-green/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
        >
          Discover{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-green">
            Movies
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Find and explore your next favorite movie. From blockbusters to hidden gems, discover the perfect film for any mood.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => navigate("/search")}
          className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-green transition-all transform hover:scale-105 shadow-lg"
        >
          Start Exploring
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;