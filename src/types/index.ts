export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  tagline: string
  status: string
  budget: number
  revenue: number
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface FiltersState {
  query: string
  genre: number | null
  year: number | null
  page: number
}
