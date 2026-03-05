import { getPopularMovies, searchMovies, getGenres } from '@/lib/tmdb'
import { MovieGrid } from '@/components/MovieGrid/MovieGrid'
import { FiltersWrapper } from '@/components/Filters/FiltersWrapper'

interface SearchParams {
  query?: string
  genre?: string
  year?: string
  page?: string
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.query ?? ''
  const genre = searchParams.genre ? Number(searchParams.genre) : null
  const year = searchParams.year ? Number(searchParams.year) : null
  const page = searchParams.page ? Number(searchParams.page) : 1

  const [moviesData, genres] = await Promise.all([
    query ? searchMovies(query, page) : getPopularMovies(page, genre, year),
    getGenres(),
  ])

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          Откройте для себя кино
        </h1>
        <p className="text-white/40 text-base">Тысячи фильмов в одном месте</p>
      </div>
      <FiltersWrapper genres={genres} currentFilters={{ query, genre, year, page }} />
      <MovieGrid
        movies={moviesData.results}
        totalPages={Math.min(moviesData.total_pages, 500)}
        currentPage={page}
        currentFilters={{ query, genre, year }}
      />
    </main>
  )
}
