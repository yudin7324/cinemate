# CineMate 🎬

Приложение для поиска и сохранения фильмов. Построено на Next.js 14 App Router с использованием Server Components.

## Стек

- **Next.js 14** (App Router)
- **TypeScript**
- **Zustand** (управление состоянием + persist для избранного)
- **CSS Modules**
- **TMDB API**

## Запуск

```bash
npm install

cp .env.example .env.local

npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (шрифты, Header)
│   ├── page.tsx            # Главная — Server Component
│   ├── loading.tsx         # Skeleton при загрузке
│   ├── movie/[id]/         # Динамический роут фильма
│   └── favorites/          # Страница избранного
├── components/             # UI компоненты
│   ├── Header/             # Client
│   ├── Filters/            # Client
│   ├── MovieGrid/          # Server
│   ├── MovieCard/          # Client
│   ├── MoviePage/          # Client
│   └── Favorites/          # Client
├── lib/
│   └── tmdb.ts             # API — server-side fetch с кэшированием
├── store/
│   └── moviesStore.ts      # Zustand — фильтры + избранное
├── hooks/
│   └── useDebounce.ts      # Debounce для поиска
└── types/
    └── index.ts            # TypeScript типы
```
