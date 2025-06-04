
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, trickleSpeed: 100 })

export const TopLoader = () => {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [pathname])

  return null
}
