import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getImageUrl, imageSizes } from "../../api/client";
import Rating from "./Rating";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  rating: number;
  voteCount?: number;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  voteCount,
  index = 0,
}) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  // FIX: Use 'xl' instead of 'w342' - xl maps to w500 which is good for cards
  const posterUrl = getImageUrl(posterPath, imageSizes.poster.xl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      <Link to={`/movie/${id}`}>
        <div className="relative overflow-hidden rounded-xl bg-gray-800/50 card-glass">
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-brand-dark to-transparent">
            <Rating rating={rating} voteCount={voteCount} size="small" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-brand-orange transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">{year}</p>
          <div className="mt-2">
            <Rating rating={rating} size="small" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
