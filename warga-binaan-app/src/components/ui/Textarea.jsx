import { forwardRef, useId } from 'react'

const Textarea = forwardRef(function Textarea(
  {
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
    id,
    className = '',
    wrapperClassName = '',
    value,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const helperId   = `${textareaId}-helper`
  const counterId  = maxLength != null ? `${textareaId}-count` : undefined
  const charCount  = typeof value === 'string' ? value.length : undefined

  const describedBy = [helperId, counterId].filter(Boolean).join(' ')

  return (
    <div className={['flex flex-col gap-1.5', wrapperClassName].join(' ')}>
      {label && (
        <div className="flex items-baseline justify-between">
          <label htmlFor={textareaId} className="text-sm font-medium text-neutral-700">
            {label}
            {required && (
              <span className="text-danger-600 ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
          {maxLength && charCount !== undefined && (
            <span
              id={counterId}
              aria-live="off"
              className={['text-xs', charCount >= maxLength ? 'text-danger-600 font-medium' : 'text-neutral-500'].join(' ')}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        value={value}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        aria-invalid={!!error || undefined}
        className={[
          'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900',
          'placeholder:text-neutral-400 resize-y',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-danger-500 bg-danger-50 focus:ring-danger-300 focus:border-danger-500'
            : 'border-neutral-300 bg-white focus:ring-primary-200 focus:border-primary-600',
          disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed resize-none' : '',
          className,
        ].join(' ')}
        {...props}
      />

      {/* Always rendered so aria-live fires when error/helperText appears */}
      <p
        id={helperId}
        aria-live="polite"
        className={['text-xs', error ? 'text-danger-600' : 'text-neutral-500'].join(' ')}
      >
        {error ?? helperText ?? ''}
      </p>
    </div>
  )
})

export default Textarea
