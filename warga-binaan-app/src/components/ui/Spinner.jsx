const sizeClasses = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-7 h-7 border-[3px]',
}

export default function Spinner({ size = 'md', className = '' }) {
  return (
    <span
      role="status"
      aria-label="Memuat..."
      className={[
        'inline-block rounded-full border-current border-r-transparent animate-spin motion-reduce:animate-pulse shrink-0',
        sizeClasses[size],
        className,
      ].join(' ')}
    />
  )
}
