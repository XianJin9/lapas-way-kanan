import { forwardRef } from 'react'
import Spinner from './Spinner'

const variantClasses = {
  primary:   'bg-primary-900 text-white hover:bg-primary-800 focus-visible:ring-primary-600',
  secondary: 'bg-gold-700    text-white hover:bg-gold-800    focus-visible:ring-gold-600',
  outline:   'border border-primary-900 text-primary-900 bg-white hover:bg-primary-50 focus-visible:ring-primary-600',
  ghost:     'text-primary-900 hover:bg-primary-50 focus-visible:ring-primary-600',
  neutral:   'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-400',
  danger:    'bg-danger-600  text-white hover:bg-danger-700  focus-visible:ring-danger-500',
}

const sizeClasses = {
  sm: 'h-8  px-3   text-xs  gap-1.5 rounded-lg',
  md: 'h-10 px-4   text-sm  gap-2   rounded-lg',
  lg: 'h-11 px-5   text-base gap-2  rounded-xl',
  xl: 'h-13 px-6   text-base gap-2.5 rounded-xl',
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" className="text-current" />
      ) : (
        leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
    </button>
  )
})

export default Button
