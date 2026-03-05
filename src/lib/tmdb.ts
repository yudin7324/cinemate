import type { TMDBResponse, MovieDetails, Genre } from '@/types'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const defaultParams = new URLSearchParams({
  api_key: process.env.TMDB_API_KEY ?? '',
  language: 'ru-RU',
})

type TMDBRequestParams = Record<string, string | number>

async function tmdbFetch<T>(path: string, params: TMDBRequestParams = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${path}`)

  defaultParams.forEach((value, key) => url.searchParams.set(key, value))
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, String(value))
  )

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`)
  }

  return response.json()
}

export async function getPopularMovies(
  page = 1,
  genreId?: number | null,
  year?: number | null
): Promise<TMDBResponse> {
  const params: TMDBRequestParams = {
    page,
    sort_by: 'popularity.desc',
  }
  if (genreId != null) params.with_genres = genreId
  if (year != null) params.primary_release_year = year

  return tmdbFetch<TMDBResponse>('/discover/movie', params)
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/search/movie', { query, page })
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}`)
}

export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>('/genre/movie/list')
  return data.genres
}

export const getPosterUrl = (path: string | null, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null

export const getBackdropUrl = (path: string | null, size = 'w1280') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null
