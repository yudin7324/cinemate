export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="h-20 rounded-xl mb-10 bg-white/[0.04] animate-pulse" />
      <div className="h-10 rounded-lg mb-8 bg-white/[0.04] animate-pulse" />
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white/[0.04] animate-pulse" style={{ aspectRatio: '2/3' }} />
        ))}
      </div>
    </div>
  )
}
