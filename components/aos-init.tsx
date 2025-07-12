'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-sine',
      delay: 100,
      once: true
    })
  }, [])

  return null
}

