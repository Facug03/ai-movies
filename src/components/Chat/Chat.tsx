'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import Ai from '@/components/icons/Ai'
import Arrow from '@/components/icons/Arrow'
import Close from '@/components/icons/Close'
import Message from './Message'
import TabsSlider from './TabsSlider'

interface Props {
  onClose: () => void
  toggleMinimize: () => void
  minimized: boolean
}

export default function Chat({ onClose, toggleMinimize, minimized }: Props) {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    initialMessages: [
      {
        role: 'system',
        content:
          'You are an AI assistant in a website about movies, animes, series, etc. You can only respond things related to that, if someone ask you something not-related, just say that you can only respond anything related to movies, animes, series, etc.',
        id: 'default-message'
      }
    ]
  })
  const refMessages = useRef<HTMLDivElement | null>(null)
  const [fullSize, setFullSize] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    return !window.matchMedia('(min-width: 768px)').matches
  })
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (isLoading) {
      console.log(refMessages.current?.lastElementChild)
      refMessages.current?.scrollTo({
        top: refMessages.current?.scrollHeight,
        behavior: 'smooth'
      })
    }
  })

  useEffect(() => {
    if (fullSize && !minimized) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [fullSize, minimized])

  useEffect(() => {
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
      setIsMobile(!e.matches)
    })
  }, [])

  return (
    <Draggable
      disabled={isMobile || fullSize}
      handle='header'
      bounds='html'
      onStart={() => setDragging(true)}
      onStop={() => setDragging(false)}
      position={fullSize ? { x: 0, y: 0 } : undefined}
    >
      <div
        className={`fixed cursor-auto rounded-lg bg-b ease-in-out ${dragging ? '' : '[transition:opacity_0.2s,transform_0.2s]'} ${fullSize ? 'bottom-0 right-0 h-dvh w-screen duration-500' : 'bottom-5 right-4 w-[21rem] min-w-[21rem] border-[1px] border-w-50'} ${minimized ? 'minimized' : ''}`}
      >
        <div className='mx-auto flex h-full max-w-3xl flex-col justify-between py-2'>
          <div className={`${fullSize ? 'text-t6 md:text-t6' : 'text-t7 md:text-t7'}`}>
            <header
              className={`mb-4 flex items-center justify-between px-2 ${fullSize ? 'cursor-auto' : 'cursor-move'}`}
            >
              <span className={`font-bold text-w ${fullSize ? 'text-m-t4 md:text-t4' : 'text-m-t5 md:text-t5'}`}>
                Assistant
              </span>

              <div className='flex items-center gap-2'>
                <button aria-label='Minimize' className='mt-1' onClick={toggleMinimize}>
                  <Arrow styles='w-5 h-5 fill-primary' />
                </button>
                <button onClick={() => setFullSize(!fullSize)} className='text-t5 text-primary'>
                  [ ]
                </button>
                <button aria-label='Close' className='mt-1' onClick={onClose}>
                  <Close styles='w-5 h-5 fill-primary' />
                </button>
              </div>
            </header>

            <TabsSlider />

            <div
              ref={refMessages}
              className={`flex flex-col gap-3 overflow-y-auto px-2 py-4 ${fullSize ? 'h-[calc(100dvh-10.25rem)]' : 'h-80'}`}
            >
              <Message
                message={{
                  content: 'Ask anything related to movies, series or animes.',
                  id: 'default-message-assistant',
                  role: 'assistant'
                }}
              />

              {messages.map((m) => (
                <Message key={m.id} message={m} />
              ))}

              {error && (
                <div className='flex gap-2'>
                  <div className='flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary'>
                    <Ai styles='w-5 h-5 fill-b' />
                  </div>

                  <p className='text-t7 text-red-400'>There was an error getting the response. Please try again.</p>
                </div>
              )}
            </div>
          </div>

          <form
            className={`mx-2 flex items-center justify-between gap-1 bg-w-10 ${fullSize ? 'rounded-xl px-4 py-2' : 'rounded-lg px-2 py-1'}`}
            onSubmit={handleSubmit}
          >
            <input
              className={`w-full bg-transparent text-w outline-none ${fullSize ? 'text-m-t5 md:text-t5' : 'text-m-t7 sm:text-t7'}`}
              value={input}
              placeholder='Say something...'
              onChange={handleInputChange}
            />

            <button className='flex size-7 flex-shrink-0 items-center justify-center rounded-full border-[1px] border-primary'>
              <Arrow styles='w-5 h-5 text-primary -rotate-90 scale-110' />
            </button>
          </form>
        </div>
      </div>
    </Draggable>
  )
}
