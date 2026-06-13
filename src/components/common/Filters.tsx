import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { useGenres } from "../../hooks/useMovies";
import type { Genre } from "../../types/movies/movie.types";

export interface FilterState {
  genre: number | null;
  year: number | null;
  minRating: number | null;
  sortBy: string;
}

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "release_date.desc", label: "Release Date (Newest)" },
  { value: "release_date.asc", label: "Release Date (Oldest)" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const YEARS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i,
);
const RATINGS = [9, 8, 7, 6, 5, 4, 3];

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: genresData, isLoading: genresLoading } = useGenres();
  const genres = genresData?.genres;

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.genre !== null ||
    filters.year !== null ||
    filters.minRating !== null ||
    filters.sortBy !== "popularity.desc";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const filterContent = (
    <div className="space-y-6">
      {/* Genre Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Genre
        </label>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {genresLoading ? (
            <>
              <div className="animate-shimmer h-8 w-20 rounded" />
              <div className="animate-shimmer h-8 w-20 rounded" />
              <div className="animate-shimmer h-8 w-20 rounded" />
            </>
          ) : (
            <>
              <button
                key="all-genres"
                onClick={() => updateFilter("genre", null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.genre === null
                    ? "bg-brand-orange text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                All Genres
              </button>
              {genres?.slice(0, 10).map((genre: Genre) => (
                <button
                  key={genre.id}
                  onClick={() => updateFilter("genre", genre.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filters.genre === genre.id
                      ? "bg-brand-orange text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Year Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Year
        </label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          <button
            key="all-years"
            onClick={() => updateFilter("year", null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filters.year === null
                ? "bg-brand-orange text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All Years
          </button>
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => updateFilter("year", year)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.year === year
                  ? "bg-brand-orange text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Minimum Rating
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            key="all-ratings"
            onClick={() => updateFilter("minRating", null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filters.minRating === null
                ? "bg-brand-orange text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All Ratings
          </button>
          {RATINGS.map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilter("minRating", rating)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.minRating === rating
                  ? "bg-brand-orange text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <X size={16} />
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-brand-orange rounded-full" />
            )}
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence mode="wait">
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              {filterContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filters;
