'use client'

import { Heart } from 'lucide-react'
import { useMoviesStore } from '@/store/moviesStore'
import { MovieCard } from '../MovieCard/MovieCard'

export function FavoritesClient() {
  const favorites = useMoviesStore((store) => store.favorites)

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <Heart className="w-12 h-12 text-[#f5c518]/40" />
        <h2 className="text-xl font-semibold text-white/60 m-0">Избранное пусто</h2>
        <p className="text-sm text-white/40 m-0">Добавляйте фильмы, нажимая ♡ на карточке</p>
      </div>
    )
  }

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
        Избранное
      </h1>
      <p className="text-white/40 text-sm mb-8">
        {favorites.length} {favorites.length === 1 ? 'фильм' : favorites.length < 5 ? 'фильма' : 'фильмов'}
      </p>
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  )
}
