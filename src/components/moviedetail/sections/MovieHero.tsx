import React from "react";
import { motion } from "framer-motion";
import { getImageUrl, imageSizes } from "../../../api/client";
import Rating from "../../common/Rating";
import { MovieDetails } from "../../../types/movies/movie.types";

interface MovieHeroProps {
  movie: MovieDetails;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  const backdropUrl = getImageUrl(
    movie.backdrop_path,
    imageSizes.backdrop.original,
  );
  const posterUrl = getImageUrl(movie.poster_path, imageSizes.poster.large);

  return (
    <div className="relative z-10 text-center px-4 pt-16 lg:pt-0 max-w-4xl mx-auto">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 py-24 flex flex-col md:flex-row gap-8 items-center md:items-end min-h-[70vh]">
        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-48 md:w-64 rounded-xl overflow-hidden shadow-2xl"
        >
          <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
            <span className="text-gray-300">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">{movie.runtime} min</span>
            <span className="text-gray-300">•</span>
            <Rating
              rating={movie.vote_average}
              voteCount={movie.vote_count}
              size="medium"
            />
          </div>

          {movie.tagline && (
            <p className="text-brand-orange italic mb-4">"{movie.tagline}"</p>
          )}

          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieHero;
