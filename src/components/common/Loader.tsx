import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-brand-orange/20 border-t-brand-orange rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
