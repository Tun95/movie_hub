import axios, { AxiosError } from "axios";
import { ApiErrorResponse } from "../types/movies/movie.types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const imageSizes = {
  poster: {
    xs: "/w92",
    small: "/w154",
    medium: "/w185",
    large: "/w342",
    xl: "/w500",
    xxl: "/w780",
    original: "/original",
  },
  backdrop: {
    small: "/w300",
    medium: "/w780",
    large: "/w1280",
    original: "/original",
  },
  profile: {
    small: "/w45",
    medium: "/w185",
    large: "/h632",
    original: "/original",
  },
};

export const getImageUrl = (path: string | null, size: string): string => {
  if (!path) return "/placeholder-poster.jpg";
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};

// TMDB API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
  timeout: 10000,
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.error(
        "API Key invalid or expired. Please check your credentials.",
      );
    }

    if (error.response?.status === 404) {
      console.error("Resource not found");
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - the API took too long to respond");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
