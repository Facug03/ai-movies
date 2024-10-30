import { useEffect, useRef, RefObject } from 'react'

export function useScrollToBottom<T extends HTMLElement>(): [RefObject<T>] {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const observer = new MutationObserver(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      })

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      })

      return () => observer.disconnect()
    }
  }, [])

  return [containerRef]
}
