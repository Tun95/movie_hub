import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";
import type {
  MovieResponse,
  MovieDetails,
  Credits,
  MovieVideos,
  MovieImages,
} from "../types/movies/movie.types";

// ============================================
// MOVIE QUERY HOOKS
// ============================================

export const usePopularMovies = (page = 1): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => moviesApi.getPopular(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopRatedMovies = (page = 1): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movies", "top-rated", page],
    queryFn: () => moviesApi.getTopRated(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpcomingMovies = (page = 1): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => moviesApi.getUpcoming(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useNowPlayingMovies = (
  page = 1,
): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movies", "now-playing", page],
    queryFn: () => moviesApi.getNowPlaying(page),
    staleTime: 1000 * 60 * 5,
  });
};

// ============================================
// MOVIE DETAIL HOOKS
// ============================================

export const useMovieDetails = (
  movieId: string,
): UseQueryResult<MovieDetails> => {
  return useQuery({
    queryKey: ["movie", movieId, "details"],
    queryFn: () => moviesApi.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieCredits = (movieId: string): UseQueryResult<Credits> => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => moviesApi.getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieVideos = (
  movieId: string,
): UseQueryResult<MovieVideos> => {
  return useQuery({
    queryKey: ["movie", movieId, "videos"],
    queryFn: () => moviesApi.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieImages = (
  movieId: string,
): UseQueryResult<MovieImages> => {
  return useQuery({
    queryKey: ["movie", movieId, "images"],
    queryFn: () => moviesApi.getMovieImages(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSimilarMovies = (
  movieId: string,
  page = 1,
): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movie", movieId, "similar", page],
    queryFn: () => moviesApi.getSimilarMovies(movieId, page),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecommendations = (
  movieId: string,
  page = 1,
): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movie", movieId, "recommendations", page],
    queryFn: () => moviesApi.getRecommendations(movieId, page),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5,
  });
};

// Define SearchFilters type
export interface SearchFilters {
  genre?: number;
  year?: number;
  minRating?: number;
  sortBy?: string;
}

// ============================================
// SEARCH HOOKS
// ============================================

export const useSearchMovies = (
  query: string,
  page = 1,
  filters?: SearchFilters,
): UseQueryResult<MovieResponse> => {
  return useQuery({
    queryKey: ["movies", "search", query, page, filters],
    queryFn: () => moviesApi.searchMovies(query, page, filters),
    enabled: query.length > 0,
    staleTime: 1000 * 30,
  });
};

// Infinite scroll version - returns the correct structure
export const useInfiniteSearchMovies = (
  query: string,
  filters?: SearchFilters,
) => {
  return useInfiniteQuery({
    queryKey: ["movies", "search", "infinite", query, filters],
    queryFn: ({ pageParam = 1 }) =>
      moviesApi.searchMovies(query, pageParam as number, filters),
    getNextPageParam: (lastPage: MovieResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
  });
};

export const useDiscoverMovies = (filters?: SearchFilters) => {
  return useInfiniteQuery({
    queryKey: ["movies", "discover", filters],
    queryFn: ({ pageParam = 1 }) =>
      moviesApi.discoverMovies({ ...filters, page: pageParam as number }),
    getNextPageParam: (lastPage: MovieResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

// ============================================
// GENRE HOOKS
// ============================================

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => moviesApi.getGenres(),
    staleTime: 1000 * 60 * 60,
  });
};
