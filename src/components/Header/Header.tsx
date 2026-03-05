'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film, Heart } from 'lucide-react'
import { useMoviesStore } from '@/store/moviesStore'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const favorites = useMoviesStore((store) => store.favorites)

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <Film className="w-5 h-5 text-[#f5c518]" />
        <span className="font-display text-xl font-bold text-[#f5c518] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          CineMate
        </span>
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline',
            pathname === '/' ? 'text-[#f5c518]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          )}
        >
          Каталог
        </Link>
        <Link
          href="/favorites"
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline',
            pathname === '/favorites' ? 'text-[#f5c518]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
          )}
        >
          <Heart className="w-4 h-4" />
          Избранное
          {favorites.length > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#f5c518] text-black text-[10px] font-bold rounded-full">
              {favorites.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}
