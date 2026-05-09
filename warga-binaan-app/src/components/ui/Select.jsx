import { forwardRef, useId } from 'react'

const Select = forwardRef(function Select(
  {
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    placeholder = 'Pilih...',
    options = [],
    id,
    className = '',
    wrapperClassName = '',
    ...props
  },
  ref
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const helperId = `${selectId}-helper`
  const hasHelper = !!(helperText || error)

  return (
    <div className={['flex flex-col gap-1.5', wrapperClassName].join(' ')}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-neutral-700">
          {label}
          {required && (
            <span className="text-danger-600 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-describedby={hasHelper ? helperId : undefined}
          aria-invalid={!!error || undefined}
          className={[
            'w-full rounded-lg border px-3 py-2 pr-8 text-sm',
            'appearance-none cursor-pointer',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-danger-500 bg-danger-50 text-neutral-900 focus:ring-danger-300 focus:border-danger-500'
              : 'border-neutral-300 bg-white text-neutral-900 focus:ring-primary-200 focus:border-primary-600',
            disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : '',
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const label = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={value} value={value}>
                {label}
              </option>
            )
          })}
        </select>

        {/* Custom arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
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

export default Select
