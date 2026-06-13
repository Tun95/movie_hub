import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { useInfiniteSearchMovies } from "../../hooks/useMovies";
import MovieCard from "../common/MovieCard";
import Loader from "../common/Loader";
import Filters, { FilterState } from "../common/Filters";
import { useDebounce } from "../../hooks/useDebounce";
import type { Movie } from "../../types/movies/movie.types";

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const loaderRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({
    genre: null,
    year: null,
    minRating: null,
    sortBy: "popularity.desc",
  });

  const debouncedQuery = useDebounce(searchQuery, 500);

  // Convert FilterState to API-compatible filters
  const getApiFilters = () => {
    const apiFilters: {
      genre?: number;
      year?: number;
      minRating?: number;
      sortBy?: string;
    } = {};

    if (filters.genre !== null) apiFilters.genre = filters.genre;
    if (filters.year !== null) apiFilters.year = filters.year;
    if (filters.minRating !== null) apiFilters.minRating = filters.minRating;
    if (filters.sortBy) apiFilters.sortBy = filters.sortBy;

    return apiFilters;
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchMovies(debouncedQuery, getApiFilters());

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

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all movies from all pages - properly typed
  const allMovies: Movie[] = data?.pages.flatMap((page) => page.results) || [];
  const totalResults = data?.pages[0]?.total_results || 0;

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
            {totalResults > 0 && (
              <span className="text-gray-400 text-sm ml-2">
                ({totalResults} results found)
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

        {!isLoading && !error && allMovies.length === 0 && debouncedQuery && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">No movies found for "{debouncedQuery}"</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {!isLoading && !error && allMovies.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allMovies.map((movie: Movie, index: number) => (
                <MovieCard
                  key={`${movie.id}-${index}`}
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

            {/* Load More Trigger */}
            <div ref={loaderRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <Loader size="small" />
                  <span className="text-gray-400">Loading more...</span>
                </div>
              )}
              {!hasNextPage && allMovies.length > 0 && (
                <p className="text-gray-500 text-sm">
                  You've reached the end! 🎬
                </p>
              )}
            </div>
          </>
        )}

        {/* Load More Button Alternative */}
        {!isLoading &&
          !error &&
          allMovies.length > 0 &&
          hasNextPage &&
          !isFetchingNextPage && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => fetchNextPage()}
                className="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-green transition-colors font-semibold"
              >
                Load More Movies
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Search;
