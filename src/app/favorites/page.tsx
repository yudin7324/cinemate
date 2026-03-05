import { FavoritesClient } from '@/components/Favorites/FavoritesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Избранное — CineMate',
}

export default function FavoritesPage() {
  return <FavoritesClient />
}
