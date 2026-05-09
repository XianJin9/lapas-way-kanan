import { useEffect } from 'react'

const SITE = 'Lapas Kelas IIB Way Kanan'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE
    return () => {
      document.title = SITE
    }
  }, [title])
}
