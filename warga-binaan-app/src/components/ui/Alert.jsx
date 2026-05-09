import { useState } from 'react'

const config = {
  info: {
    wrapper:   'bg-info-50 border-info-200',
    icon:      'ℹ',
    iconColor: 'text-info-600',
    text:      'text-info-800',
  },
  success: {
    wrapper:   'bg-success-50 border-success-200',
    icon:      '✓',
    iconColor: 'text-success-600',
    text:      'text-success-800',
  },
  warning: {
    wrapper:   'bg-warning-50 border-warning-200',
    icon:      '⚠',
    iconColor: 'text-warning-600',
    text:      'text-warning-800',
  },
  danger: {
    wrapper:   'bg-danger-50 border-danger-200',
    icon:      '✕',
    iconColor: 'text-danger-600',
    text:      'text-danger-800',
  },
}

export default function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className = '',
}) {
  const [dismissed, setDismissed] = useState(false)
  const c = config[variant]

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className={['flex gap-3 px-4 py-3 rounded-lg border text-sm', c.wrapper, className].join(' ')}
    >
      <span className={['shrink-0 mt-0.5 font-bold', c.iconColor].join(' ')} aria-hidden="true">
        {icon ?? c.icon}
      </span>
      <div className={['flex-1 min-w-0', c.text].join(' ')}>
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup notifikasi"
          className={[
            'shrink-0 p-0.5 rounded ml-auto',
            c.iconColor,
            'opacity-60 hover:opacity-100 transition-opacity',
          ].join(' ')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
