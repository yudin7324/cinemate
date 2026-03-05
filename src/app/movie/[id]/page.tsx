import { notFound } from 'next/navigation'
import { getMovieDetails } from '@/lib/tmdb'
import { MoviePageClient } from '@/components/MoviePage/MoviePageClient'

// Генерация метатегов на сервере — это одна из фишек Next.js
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(Number(params.id))
    return {
      title: `${movie.title} — CineMate`,
      description: movie.overview?.slice(0, 160),
    }
  } catch {
    return { title: 'Фильм — CineMate' }
  }
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(Number(params.id))
    return <MoviePageClient movie={movie} />
  } catch {
    notFound()
  }
}
