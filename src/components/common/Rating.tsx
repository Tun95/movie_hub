import React from "react";
import { motion } from "framer-motion";

interface RatingProps {
  rating: number;
  voteCount?: number;
  size?: "small" | "medium" | "large";
}

const Rating: React.FC<RatingProps> = ({
  rating,
  voteCount,
  size = "medium",
}) => {
  const percentage = (rating / 10) * 100;
  const sizeClasses = {
    small: "text-xs w-7 h-7",
    medium: "text-sm w-9 h-9",
    large: "text-base w-11 h-11",
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative ${sizeClasses[size]} rounded-full bg-brand-dark/80 backdrop-blur-sm border-2 border-brand-orange flex items-center justify-center font-bold`}
      >
        <span className="text-brand-orange">{rating.toFixed(1)}</span>
        <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(248, 146, 30, 0.2)"
            strokeWidth="2"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="#f8921e"
            strokeWidth="2"
            strokeDasharray={`${percentage * 2.83} 283`}
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      {voteCount !== undefined && size !== "small" && (
        <span className="text-gray-400 text-xs">
          ({voteCount.toLocaleString()} votes)
        </span>
      )}
    </div>
  );
};

export default Rating;
