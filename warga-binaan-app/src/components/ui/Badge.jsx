const variantClasses = {
  success: 'bg-success-50 text-success-700 border-success-200',
  warning: 'bg-warning-50 text-warning-700 border-warning-200',
  danger:  'bg-danger-50  text-danger-700  border-danger-200',
  info:    'bg-info-50    text-info-700    border-info-200',
  neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  gold:    'bg-gold-50    text-gold-700    border-gold-200',
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

const dotColors = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger:  'bg-danger-500',
  info:    'bg-info-500',
  neutral: 'bg-neutral-400',
  primary: 'bg-primary-500',
  gold:    'bg-gold-500',
}

export default function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  className = '',
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-semibold rounded-full border',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
