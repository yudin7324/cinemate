'use client'

import { useEffect, useRef, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'
import type { Genre, FiltersState } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useMoviesStore } from '@/store/moviesStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  genres: Genre[]
  currentFilters: FiltersState
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 40 }, (_, i) => currentYear - i)

export function FiltersWrapper({ genres, currentFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()
  const { filters, setFilters, setGenres, resetFilters } = useMoviesStore()
  const debouncedQuery = useDebounce(filters.query, 400)
  const isFirst = useRef(true)

  useEffect(() => {
    setGenres(genres)
    setFilters(currentFilters)
  }, [])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('query', debouncedQuery)
    if (!debouncedQuery && filters.genre) params.set('genre', String(filters.genre))
    if (!debouncedQuery && filters.year) params.set('year', String(filters.year))
    startTransition(() => { router.push(`${pathname}?${params.toString()}`) })
  }, [debouncedQuery, filters.genre, filters.year])

  const hasActive = filters.query || filters.genre || filters.year

  const handleReset = () => {
    resetFilters()
    router.push(pathname)
  }

  return (
    <div className="flex items-center gap-3 flex-wrap mb-8">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        <Input
          className="pl-9 pr-9"
          placeholder="Найти фильм..."
          value={filters.query}
          onChange={(e) => setFilters({ query: e.target.value })}
        />
        {filters.query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            onClick={() => setFilters({ query: '' })}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <Select
        value={filters.genre ? String(filters.genre) : 'all'}
        onValueChange={(v) => setFilters({ genre: v === 'all' ? null : Number(v) })}
        disabled={!!filters.query}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Все жанры" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все жанры</SelectItem>
          {genres.map((g) => (
            <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.year ? String(filters.year) : 'all'}
        onValueChange={(v) => setFilters({ year: v === 'all' ? null : Number(v) })}
        disabled={!!filters.query}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Любой год" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Любой год</SelectItem>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActive && (
        <Button variant="gold" size="sm" onClick={handleReset}>
          Сбросить
        </Button>
      )}
    </div>
  )
}
