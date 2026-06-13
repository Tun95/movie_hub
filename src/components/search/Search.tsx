import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import {
  useInfiniteSearchMovies,
  useDiscoverMovies,
} from "../../hooks/useMovies";
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
  const hasSearchTerm = debouncedQuery.length > 0;

  // Use discover for initial load (popular movies), search for queries
  const searchHook = useInfiniteSearchMovies(debouncedQuery, {});
  const discoverHook = useDiscoverMovies({});

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = hasSearchTerm ? searchHook : discoverHook;

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else if (!debouncedQuery && initialQuery) {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams, initialQuery]);

  // Flatten all movies from all pages
  const allMovies: Movie[] = data?.pages.flatMap((page) => page.results) || [];
  const totalResults = data?.pages[0]?.total_results || 0;

  // CLIENT-SIDE FILTERING - All filters applied here
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = [...allMovies];

    // Apply genre filter
    if (filters.genre !== null) {
      filtered = filtered.filter(
        (movie) => movie.genre_ids && movie.genre_ids.includes(filters.genre!),
      );
    }

    // Apply year filter
    if (filters.year !== null) {
      filtered = filtered.filter((movie) => {
        const movieYear = new Date(movie.release_date).getFullYear();
        return movieYear === filters.year;
      });
    }

    // Apply rating filter
    if (filters.minRating !== null) {
      filtered = filtered.filter(
        (movie) => movie.vote_average >= filters.minRating!,
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "popularity.desc":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case "vote_average.desc":
        filtered.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "vote_average.asc":
        filtered.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case "release_date.desc":
        filtered.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime(),
        );
        break;
      case "release_date.asc":
        filtered.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime(),
        );
        break;
      case "original_title.asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  }, [allMovies, filters]);

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
      { threshold: 0.1, rootMargin: "100px" },
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

  // Get genre name for display
  const getGenreName = (genreId: number) => {
    const genres: Record<number, string> = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return genres[genreId] || `Genre ${genreId}`;
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
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

      {/* Active Filters Display */}
      {(filters.genre !== null ||
        filters.year !== null ||
        filters.minRating !== null ||
        filters.sortBy !== "popularity.desc") && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">Active filters:</span>
          {filters.genre !== null && (
            <span className="px-2 py-1 bg-brand-orange/20 text-brand-orange rounded-md text-xs">
              {getGenreName(filters.genre)}
            </span>
          )}
          {filters.year !== null && (
            <span className="px-2 py-1 bg-brand-orange/20 text-brand-orange rounded-md text-xs">
              Year: {filters.year}
            </span>
          )}
          {filters.minRating !== null && (
            <span className="px-2 py-1 bg-brand-orange/20 text-brand-orange rounded-md text-xs">
              Rating: {filters.minRating}+
            </span>
          )}
          {filters.sortBy !== "popularity.desc" && (
            <span className="px-2 py-1 bg-brand-orange/20 text-brand-orange rounded-md text-xs">
              Sort:{" "}
              {filters.sortBy.replace(/\.(desc|asc)/, " $1").replace(/_/g, " ")}
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs hover:bg-gray-600 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {hasSearchTerm ? (
              <>
                Search Results for "
                <span className="text-brand-orange">{debouncedQuery}</span>"
              </>
            ) : (
              "Discover Movies"
            )}
            <span className="text-gray-400 text-sm ml-2">
              ({filteredAndSortedMovies.length} results
              {totalResults > 0 && ` from ${totalResults} total`})
            </span>
          </h2>
        </div>

        {isLoading && <Loader />}

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load results. Please try again.
          </div>
        )}

        {!isLoading && !error && filteredAndSortedMovies.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">
              {hasSearchTerm
                ? `No movies found for "${debouncedQuery}"`
                : "No movies match your filters"}
            </p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {filteredAndSortedMovies.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredAndSortedMovies.map((movie: Movie, index: number) => (
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

            {/* Infinite Scroll Loader */}
            <div ref={loaderRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <Loader size="small" />
                  <span className="text-gray-400">Loading more movies...</span>
                </div>
              )}
              {!hasNextPage &&
                !isFetchingNextPage &&
                filteredAndSortedMovies.length > 0 && (
                  <p className="text-gray-500 text-sm">
                    ✨ You've reached the end! ✨
                  </p>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
