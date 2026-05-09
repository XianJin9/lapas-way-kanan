import { Component } from 'react'
import { Alert, Card } from './ui'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    // TODO: kirim error ke layanan monitoring (Sentry, Datadog, dsb.)
    // Contoh: Sentry.captureException(error, { extra: info })
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4" aria-hidden="true">⚠️</div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Terjadi Kesalahan
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Halaman ini mengalami kesalahan yang tidak terduga. Coba muat ulang halaman
              atau kembali ke beranda.
            </p>
          </div>

          <Card variant="default" padding="lg" className="mb-4">
            <Alert variant="danger" title="Detail Kesalahan" className="mb-4">
              {error.message || 'Kesalahan tidak diketahui'}
            </Alert>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                Muat Ulang Halaman
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                Kembali ke Beranda
              </a>
            </div>

            {/* Stack trace hanya ditampilkan di development */}
            {import.meta.env.DEV && info?.componentStack && (
              <details className="mt-4">
                <summary className="text-xs font-medium text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors">
                  Detail teknis (development only)
                </summary>
                <pre className="mt-2 text-xs text-danger-700 bg-danger-50 border border-danger-100 rounded-lg p-3 overflow-auto max-h-48 whitespace-pre-wrap">
                  {error.stack}
                  {'\n\nComponent Stack:'}
                  {info.componentStack}
                </pre>
              </details>
            )}
          </Card>

          <p className="text-center text-xs text-neutral-400">
            Jika masalah berlanjut, hubungi{' '}
            <a href="/kontak" className="text-primary-600 hover:text-primary-800 transition-colors">
              petugas Lapas
            </a>
            .
          </p>
        </div>
      </div>
    )
  }
}
