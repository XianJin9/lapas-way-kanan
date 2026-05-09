export default function EmptyState({
  icon = '📭',
  title = 'Tidak ada data',
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      ].join(' ')}
    >
      <div
        className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-3xl mb-4"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-neutral-700 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-5 bg-primary-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
