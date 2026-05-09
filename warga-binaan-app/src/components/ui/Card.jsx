const variantClasses = {
  default:  'bg-white border border-neutral-200',
  outlined: 'bg-transparent border border-neutral-300',
  elevated: 'bg-white shadow-md border border-neutral-100',
  filled:   'bg-neutral-50 border border-neutral-200',
  primary:  'bg-primary-50 border border-primary-200',
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
}

export default function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  children,
  ...props
}) {
  const interactive = !!onClick

  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      className={[
        'rounded-xl',
        variantClasses[variant],
        paddingClasses[padding],
        interactive
          ? 'cursor-pointer hover:shadow-md hover:border-primary-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
