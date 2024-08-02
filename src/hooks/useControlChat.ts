'use client'

import { useState } from 'react'

export function useControlChat() {
  const [show, setShow] = useState(false)
  const [minimized, setMinimized] = useState(false)

  const toggleShow = () => setShow(!show)
  const toggleMinimized = () => setMinimized(!minimized)

  const openChat = () => {
    setShow(true)
    setMinimized(false)
  }

  return { show, toggleShow, minimized, toggleMinimized, openChat }
}
