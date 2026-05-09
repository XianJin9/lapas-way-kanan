import Spinner from './Spinner'

export default function PageLoader({ label = 'Memuat halaman...' }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-neutral-50"
      role="status"
      aria-label={label}
    >
      <Spinner size="lg" className="text-primary-700" />
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  )
}
