import React from "react";
import { motion } from "framer-motion";
import { CastMember, CrewMember, MovieDetails } from "../../../types/movies/movie.types";

interface MovieInfoProps {
  movie: MovieDetails;
  director?: CrewMember;
  cast: CastMember[];
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie, director, cast }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold mb-4">Overview</h3>

          <div>
            <h4 className="text-brand-orange font-semibold mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="text-gray-300">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-brand-orange font-semibold mb-2">
              Release Date
            </h4>
            <p className="text-gray-300">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {director && (
            <div>
              <h4 className="text-brand-orange font-semibold mb-2">Director</h4>
              <p className="text-gray-300">{director.name}</p>
            </div>
          )}

          <div>
            <h4 className="text-brand-orange font-semibold mb-2">Cast</h4>
            <p className="text-gray-300">
              {cast.map((c) => c.name).join(", ")}
            </p>
          </div>

          <div>
            <h4 className="text-brand-orange font-semibold mb-2">Language</h4>
            <p className="text-gray-300">
              {movie.original_language.toUpperCase()}
            </p>
          </div>
        </motion.div>

        {/* Right Column - Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2"
        >
          <h3 className="text-2xl font-bold mb-6">Financial & Stats</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {movie.budget > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-brand-orange font-semibold mb-1">Budget</h4>
                <p className="text-2xl font-bold">
                  {formatCurrency(movie.budget)}
                </p>
              </div>
            )}

            {movie.revenue > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-brand-orange font-semibold mb-1">
                  Revenue
                </h4>
                <p className="text-2xl font-bold">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
            )}

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-brand-orange font-semibold mb-1">Status</h4>
              <p className="text-lg">{movie.status}</p>
            </div>

            {movie.homepage && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-brand-orange font-semibold mb-1">
                  Website
                </h4>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:text-brand-orange transition-colors"
                >
                  Visit Official Site →
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MovieInfo;
