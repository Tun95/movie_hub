// ============================================
// MOVIE TYPES
// ============================================

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// ============================================
// CREDITS TYPES
// ============================================

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
  gender: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  credit_id: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// ============================================
// VIDEO TYPES
// ============================================

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
  published_at: string;
}

export interface MovieVideos {
  id: number;
  results: Video[];
}

// ============================================
// IMAGE TYPES
// ============================================

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export interface MovieImages {
  id: number;
  backdrops: Image[];
  posters: Image[];
  logos: Image[];
}

// ============================================
// RESPONSE TYPES
// ============================================

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface MovieRecommendations {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// ============================================
// FILTER TYPES
// ============================================

export interface MovieFilters {
  genre: number | null;
  year: number | null;
  minRating: number | null;
  sortBy: string;
}

// ============================================
// ERROR TYPES
// ============================================

export interface ApiErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}
