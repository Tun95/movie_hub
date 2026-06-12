import React from "react";
import { useNowPlayingMovies } from "../../../hooks/useMovies";
import MovieCard from "../../common/MovieCard";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";

const NowPlayingMovies: React.FC = () => {
  const { data, isLoading, error } = useNowPlayingMovies();
  const navigate = useNavigate();

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-brand-orange text-sm font-bold uppercase tracking-wider">
            In Theaters
          </span>
          <h2 className="text-3xl font-bold mt-2">Now Playing</h2>
        </div>
        <button
          onClick={() => navigate("/search?section=now-playing")}
          className="text-brand-orange hover:text-white transition-colors text-sm font-semibold"
        >
          View all →
        </button>
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

export default NowPlayingMovies;
