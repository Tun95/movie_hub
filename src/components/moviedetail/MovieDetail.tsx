import React from "react";
import { useParams } from "react-router-dom";
import {
  useMovieDetails,
  useMovieCredits,
  useSimilarMovies,
} from "../../hooks/useMovies";
import Loader from "../common/Loader";
import MovieHero from "./sections/MovieHero";
import MovieInfo from "./sections/MovieInfo";
import SimilarMovies from "./sections/SimilarMovies";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useMovieDetails(id!);
  const { data: credits, isLoading: creditsLoading } = useMovieCredits(id!);
  const { data: similarMovies, isLoading: similarLoading } = useSimilarMovies(
    id!,
  );

  if (movieLoading) return <Loader />;
  if (movieError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Movie Not Found
          </h2>
          <p className="text-gray-400">
            The movie you're looking for doesn't exist or couldn't be loaded.
          </p>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find((person) => person.job === "Director");
  const mainCast = credits?.cast.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-brand-dark">
      <MovieHero movie={movie} />
      <MovieInfo movie={movie} director={director} cast={mainCast} />
      <SimilarMovies
        movies={similarMovies?.results || []}
        isLoading={similarLoading}
      />
    </div>
  );
};

export default MovieDetail;
