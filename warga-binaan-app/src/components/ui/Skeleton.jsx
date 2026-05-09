function SkeletonItem({ width = '100%', height = '1rem', rounded = 'rounded', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={['animate-pulse bg-neutral-200', rounded, className].join(' ')}
      style={{ width, height }}
    />
  )
}

function SkeletonCard({ className = '' }) {
  return (
    <div
      aria-busy="true"
      aria-label="Memuat konten..."
      className={['space-y-3', className].join(' ')}
    >
      <SkeletonItem height="12px" width="40%" />
      <SkeletonItem height="8px" />
      <SkeletonItem height="8px" width="80%" />
      <SkeletonItem height="8px" width="60%" />
    </div>
  )
}

function SkeletonAvatar({ size = '2.5rem' }) {
  return <SkeletonItem width={size} height={size} rounded="rounded-full" />
}

function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div aria-busy="true" aria-label="Memuat tabel...">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4 py-3 px-4 border-b border-neutral-100">
          {Array.from({ length: cols }, (_, j) => (
            <SkeletonItem key={j} height="14px" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

SkeletonItem.Card   = SkeletonCard
SkeletonItem.Avatar = SkeletonAvatar
SkeletonItem.Table  = SkeletonTable

export default SkeletonItem
