import { useEffect, useRef, RefObject } from 'react'

export function useScrollToBottom<T extends HTMLElement>(trigger?: unknown): [RefObject<T>] {
  const containerRef = useRef<T>(null)
  const isAtBottomRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const threshold = 50
      isAtBottomRef.current = container.scrollHeight - container.scrollTop - container.clientHeight < threshold
    }

    const observer = new ResizeObserver(() => {
      if (isAtBottomRef.current) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }
    })

    observer.observe(container)
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    isAtBottomRef.current = true
  }, [trigger])

  return [containerRef]
}
