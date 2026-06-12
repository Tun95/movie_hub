import React from "react";
import { motion } from "framer-motion";
import MovieCard from "../../common/MovieCard";
import Loader from "../../common/Loader";
import { Movie } from "../../../types/movies/movie.types";

interface SimilarMoviesProps {
  movies: Movie[];
  isLoading: boolean;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, isLoading }) => {
  if (isLoading) return <Loader />;
  if (movies.length === 0) return null;

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8">Similar Movies</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.slice(0, 10).map((movie, index) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              voteCount={movie.vote_count}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SimilarMovies;
