'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import type { Movie } from '@/types'
import { useMoviesStore } from '@/store/moviesStore'
import { getPosterUrl } from '@/lib/tmdb'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function MovieCard({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useMoviesStore()
  const [imgError, setImgError] = useState(false)
  const favorite = isFavorite(movie.id)
  const posterUrl = getPosterUrl(movie.poster_path)
  const year = movie.release_date?.slice(0, 4)
  const rating = Number(movie.vote_average.toFixed(1))
  const ratingVariant = rating >= 7 ? 'green' : rating >= 5 ? 'yellow' : 'red'

  return (
    <div className="group rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50">
      <Link href={`/movie/${movie.id}`} className="block relative" style={{ aspectRatio: '2/3' }}>
        <div className="absolute inset-0 bg-[#111] overflow-hidden">
          {posterUrl && !imgError ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🎬</div>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={ratingVariant}>{rating}</Badge>
        </div>
      </Link>

      <div className="p-3">
        <Link
          href={`/movie/${movie.id}`}
          className="block text-sm font-semibold text-white leading-snug mb-2 line-clamp-2 no-underline hover:text-[#f5c518] transition-colors"
        >
          {movie.title}
        </Link>
        <div className="flex items-center justify-between">
          {year && <span className="text-xs text-white/40">{year}</span>}
          <button
            className={cn(
              'ml-auto p-1 transition-colors',
              favorite ? 'text-[#f5c518]' : 'text-white/30 hover:text-[#f5c518]'
            )}
            onClick={() => toggleFavorite(movie)}
            title={favorite ? 'Убрать из избранного' : 'В избранное'}
          >
            <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
          </button>
        </div>
      </div>
    </div>
  )
}
