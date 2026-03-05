'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Heart, Star, Clock, Calendar } from 'lucide-react'
import type { MovieDetails } from '@/types'
import { useMoviesStore } from '@/store/moviesStore'
import { getPosterUrl, getBackdropUrl } from '@/lib/tmdb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function MoviePageClient({ movie }: { movie: MovieDetails }) {
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useMoviesStore()
  const favorite = isFavorite(movie.id)
  const posterUrl = getPosterUrl(movie.poster_path, 'w500')
  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const year = movie.release_date?.slice(0, 4)
  const rating = Number(movie.vote_average.toFixed(1))
  const ratingVariant = rating >= 7 ? 'green' : rating >= 5 ? 'yellow' : 'red'
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : null
  const minutes = movie.runtime ? movie.runtime % 60 : null

  return (
    <div className="relative min-h-screen">
      {backdropUrl && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image src={backdropUrl} alt="" fill className="object-cover opacity-15 blur-sm" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 to-[#0a0a0f]/95" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-8 gap-2">
          <ArrowLeft className="w-4 h-4" /> Назад
        </Button>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] items-start">
          <div className="flex flex-col gap-4 md:sticky md:top-24">
            {posterUrl ? (
              <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]" style={{ aspectRatio: '2/3' }}>
                <Image src={posterUrl} alt={movie.title} fill className="object-cover" sizes="280px" />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] text-5xl" style={{ aspectRatio: '2/3' }}>🎬</div>
            )}
            <Button
              variant="gold"
              className={cn('gap-2', favorite && 'bg-[#f5c518]/20 border-[#f5c518] text-[#f5c518]')}
              onClick={() => toggleFavorite(movie)}
            >
              <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
              {favorite ? 'В избранном' : 'В избранное'}
            </Button>
          </div>

          <div className="pt-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-white/40 italic text-base mb-6">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              {year && (
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <Calendar className="w-3.5 h-3.5" /> {year}
                </span>
              )}
              {movie.runtime && (
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <Clock className="w-3.5 h-3.5" /> {hours}ч {minutes}м
                </span>
              )}
              <Badge variant={ratingVariant} className="gap-1">
                <Star className="w-3 h-3 fill-current" /> {rating}
              </Badge>
              <span className="text-sm text-white/40">
                {movie.vote_count.toLocaleString()} оценок
              </span>
            </div>

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((g) => (
                  <Badge key={g.id} variant="outline">{g.name}</Badge>
                ))}
              </div>
            )}

            {movie.overview && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Описание</h2>
                <p className="text-white/75 leading-relaxed">{movie.overview}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-8">
              {movie.budget > 0 && (
                <div>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-1">Бюджет</div>
                  <div className="text-sm font-semibold">${movie.budget.toLocaleString()}</div>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-1">Сборы</div>
                  <div className="text-sm font-semibold">${movie.revenue.toLocaleString()}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-white/35 uppercase tracking-widest mb-1">Статус</div>
                <div className="text-sm font-semibold">{movie.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
