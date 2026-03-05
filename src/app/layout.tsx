import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Header } from '@/components/Header/Header'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-playfair',
  weight: ['700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'CineMate — Поиск фильмов',
  description: 'Ищи и сохраняй любимые фильмы',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
