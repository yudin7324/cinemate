'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie, Genre, FiltersState } from '@/types'

interface MoviesStore {
  filters: FiltersState
  genres: Genre[]
  setFilters: (filters: Partial<FiltersState>) => void
  setGenres: (genres: Genre[]) => void
  resetFilters: () => void
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
  isFavorite: (id: Movie['id']) => boolean
}

const defaultFilters: FiltersState = {
  query: '',
  genre: null,
  year: null,
  page: 1,
}

export const useMoviesStore = create<MoviesStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      genres: [],
      setFilters: (newFilters: Partial<FiltersState>) =>
        set((store) => ({
          filters: {
            ...store.filters,
            ...newFilters,
          },
        })),
      setGenres: (genres: Genre[]) => set({ genres }),
      resetFilters: () => set({ filters: defaultFilters }),
      favorites: [],
      toggleFavorite: (movie: Movie) =>
        set((store) => ({
          favorites: store.favorites.some((favoriteMovie) => favoriteMovie.id === movie.id)
            ? store.favorites.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
            : [...store.favorites, movie],
        })),
      isFavorite: (id) =>
        get().favorites.some((favoriteMovie) => favoriteMovie.id === id),
    }),
    {
      name: 'cinemate-storage',
      partialize: (state: MoviesStore) => ({ favorites: state.favorites }),
    }
  )
)
