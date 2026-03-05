import Link from 'next/link'
import type { Movie, FiltersState } from '@/types'
import { MovieCard } from '../MovieCard/MovieCard'
import { cn } from '@/lib/utils'

interface Props {
  movies: Movie[]
  totalPages: number
  currentPage: number
  currentFilters: Omit<FiltersState, 'page'>
}

export function MovieGrid({ movies, totalPages, currentPage, currentFilters }: Props) {
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (currentFilters.query) params.set('query', currentFilters.query)
    if (currentFilters.genre) params.set('genre', String(currentFilters.genre))
    if (currentFilters.year) params.set('year', String(currentFilters.year))
    params.set('page', String(page))
    return `/?${params.toString()}`
  }

  if (!movies.length) {
    return (
      <div className="text-center py-20 text-white/40 text-lg">
        Ничего не найдено 🎬
      </div>
    )
  }

  const pages: number[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else if (currentPage <= 4) {
    for (let i = 1; i <= 7; i++) pages.push(i)
  } else if (currentPage >= totalPages - 3) {
    for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i)
  } else {
    for (let i = currentPage - 3; i <= currentPage + 3; i++) pages.push(i)
  }

  return (
    <div>
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
          {currentPage > 1 && (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm no-underline hover:bg-white/10 hover:text-white transition-colors"
            >
              ←
            </Link>
          )}
          {pages.map((page) => (
            <Link
              key={page}
              href={buildPageUrl(page)}
              className={cn(
                'inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg border text-sm no-underline transition-colors',
                currentPage === page
                  ? 'border-[#f5c518] bg-[#f5c518]/15 text-[#f5c518]'
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm no-underline hover:bg-white/10 hover:text-white transition-colors"
            >
              →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
