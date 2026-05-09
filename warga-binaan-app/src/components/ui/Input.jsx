import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    type = 'text',
    id,
    leftIcon,
    rightIcon,
    className = '',
    wrapperClassName = '',
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId  = id ?? generatedId
  const helperId = `${inputId}-helper`
  const hasHelper = !!(helperText || error)

  return (
    <div className={['flex flex-col gap-1.5', wrapperClassName].join(' ')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
          {required && (
            <span className="text-danger-600 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-describedby={hasHelper ? helperId : undefined}
          aria-invalid={!!error || undefined}
          className={[
            'w-full rounded-lg border text-sm text-neutral-900',
            'placeholder:text-neutral-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            leftIcon  ? 'pl-9'  : 'pl-3',
            rightIcon ? 'pr-9'  : 'pr-3',
            'py-2.5',
            error
              ? 'border-danger-500 bg-danger-50 focus:ring-danger-300 focus:border-danger-500'
              : 'border-neutral-300 bg-white focus:ring-primary-200 focus:border-primary-600',
            disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {hasHelper && (
        <p
          id={helperId}
          className={['text-xs', error ? 'text-danger-600' : 'text-neutral-500'].join(' ')}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  )
})

export default Input
