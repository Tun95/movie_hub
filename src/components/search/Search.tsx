import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { useSearchMovies } from "../../hooks/useMovies";
import MovieCard from "../common/MovieCard";
import Loader from "../common/Loader";
import Filters, { FilterState } from "../common/Filters";
import { useDebounce } from "../../hooks/useDebounce";

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({
    genre: null,
    year: null,
    minRating: null,
    sortBy: "popularity.desc",
  });

  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data, isLoading, error } = useSearchMovies(
    debouncedQuery,
    1,
    filters,
  );
//   const { data: genres } = useGenres();

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    }
  }, [debouncedQuery, setSearchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: null,
      year: null,
      minRating: null,
      sortBy: "popularity.desc",
    });
  };

  const movies = data?.results || [];

  return (
    <div className="min-h-screen py-24 px-8 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Search Movies</h1>

        {/* Search Input */}
        <div className="relative max-w-2xl">
          <SearchIcon
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {debouncedQuery ? (
              <>
                Search Results for "
                <span className="text-brand-orange">{debouncedQuery}</span>"
              </>
            ) : (
              "Discover Movies"
            )}
            {data && (
              <span className="text-gray-400 text-sm ml-2">
                ({data.total_results} results found)
              </span>
            )}
          </h2>
        </div>

        {isLoading && <Loader />}

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load search results. Please try again.
          </div>
        )}

        {!isLoading && !error && movies.length === 0 && debouncedQuery && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">No movies found for "{debouncedQuery}"</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {!isLoading && !error && movies.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Search;
