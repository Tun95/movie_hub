import apiClient from "./client";
import type {
  MovieResponse,
  MovieDetails,
  Credits,
  GenresResponse,
  MovieVideos,
  MovieImages,
  MovieRecommendations,
} from "../types/movies/movie.types";

class MoviesApiService {
  // ============================================
  // DISCOVERY ENDPOINTS
  // ============================================

  async getPopular(page = 1): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>("/movie/popular", {
      params: { page },
    });
    return response.data;
  }

  async getTopRated(page = 1): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  }

  async getUpcoming(page = 1): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>("/movie/upcoming", {
      params: { page },
    });
    return response.data;
  }

  async getNowPlaying(page = 1): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>("/movie/now_playing", {
      params: { page },
    });
    return response.data;
  }

  // ============================================
  // DETAIL ENDPOINTS
  // ============================================

  async getMovieDetails(movieId: string): Promise<MovieDetails> {
    const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  }

  async getMovieCredits(movieId: string): Promise<Credits> {
    const response = await apiClient.get<Credits>(`/movie/${movieId}/credits`);
    return response.data;
  }

  async getMovieVideos(movieId: string): Promise<MovieVideos> {
    const response = await apiClient.get<MovieVideos>(
      `/movie/${movieId}/videos`,
    );
    return response.data;
  }

  async getMovieImages(movieId: string): Promise<MovieImages> {
    const response = await apiClient.get<MovieImages>(
      `/movie/${movieId}/images`,
    );
    return response.data;
  }

  async getSimilarMovies(movieId: string, page = 1): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>(
      `/movie/${movieId}/similar`,
      {
        params: { page },
      },
    );
    return response.data;
  }

  async getRecommendations(
    movieId: string,
    page = 1,
  ): Promise<MovieRecommendations> {
    const response = await apiClient.get<MovieRecommendations>(
      `/movie/${movieId}/recommendations`,
      { params: { page } },
    );
    return response.data;
  }

  // ============================================
  // SEARCH ENDPOINTS
  // ============================================

  async searchMovies(
    query: string,
    page = 1,
    filters?: {
      genre?: number;
      year?: number;
      minRating?: number;
      sortBy?: string;
    },
  ): Promise<MovieResponse> {
    const params: Record<string, unknown> = {
      query,
      page,
      include_adult: false,
    };

    if (filters) {
      if (filters.genre) params.with_genres = filters.genre;
      if (filters.year) params.primary_release_year = filters.year;
      if (filters.sortBy) params.sort_by = filters.sortBy;
      if (filters.minRating) params["vote_average.gte"] = filters.minRating;
    }

    const response = await apiClient.get<MovieResponse>("/search/movie", {
      params,
    });
    return response.data;
  }

  // ============================================
  // GENRE ENDPOINTS
  // ============================================

  async getGenres(): Promise<GenresResponse> {
    const response = await apiClient.get<GenresResponse>("/genre/movie/list");
    return response.data;
  }

  // ============================================
  // DISCOVER ENDPOINTS WITH FILTERS
  // ============================================

  async discoverMovies(params: {
    page?: number;
    sort_by?: string;
    with_genres?: number;
    primary_release_year?: number;
    "vote_average.gte"?: number;
  }): Promise<MovieResponse> {
    const response = await apiClient.get<MovieResponse>("/discover/movie", {
      params,
    });
    return response.data;
  }
}

export const moviesApi = new MoviesApiService();
