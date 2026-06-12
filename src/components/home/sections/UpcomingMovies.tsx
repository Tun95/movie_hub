import React from "react";
import { useUpcomingMovies } from "../../../hooks/useMovies";
import MovieCard from "../../common/MovieCard";
import Loader from "../../common/Loader";

const UpcomingMovies: React.FC = () => {
  const { data, isLoading, error } = useUpcomingMovies();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load movies
      </div>
    );

  const movies = data?.results.slice(0, 10) || [];

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-brand-orange text-sm font-bold uppercase tracking-wider">
          Coming Soon
        </span>
        <h2 className="text-3xl font-bold mt-2">Upcoming Movies</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
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
    </section>
  );
};

export default UpcomingMovies;
