
'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, trickleSpeed: 100 })

export const TopLoader = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [pathname])

  return null
}
