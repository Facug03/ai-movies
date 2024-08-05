'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import Ai from '@/components/icons/Ai'
import Arrow from '@/components/icons/Arrow'
import Close from '@/components/icons/Close'
import { useChatStore } from '@/providers/chat-store-provider'
import Message from './Message'
import TabsSlider from './TabsSlider'

interface Props {
  id: string
}

export default function Chat({ id }: Props) {
  const { chats, toggleMinimize, closeChat } = useChatStore((state) => state)
  const { minimized, systemPrompt, title, mediaType } = chats.find((chat) => chat.id === id) ?? {}
  const { messages, input, handleInputChange, handleSubmit, error, isLoading, setMessages, reload, setInput } = useChat(
    {
      initialMessages: systemPrompt ?? []
    }
  )
  const refMessages = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (!window) return true

    return !window.matchMedia('(min-width: 768px)').matches
  })
  const [fullSize, setFullSize] = useState(isMobile)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (isLoading) {
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
        className={`fixed z-50 cursor-auto rounded-lg bg-b ease-in-out ${dragging ? '' : '[transition:opacity_0.2s,transform_0.2s]'}
          ${fullSize ? 'bottom-0 right-0 h-dvh w-screen duration-500' : 'bottom-20 right-4 w-[21rem] min-w-[21rem] border-[1px] border-w-50'}
          ${minimized ? 'minimized' : ''}`}
      >
        <div className='mx-auto flex h-full max-w-3xl flex-col justify-between py-2'>
          <div className={`${fullSize ? 'text-t6 md:text-t6' : 'text-t7 md:text-t7'}`}>
            <header
              className={`mb-4 flex items-center justify-between px-2 ${fullSize ? 'cursor-auto' : 'cursor-move'}`}
            >
              <div className='overflow-hidden'>
                <h4 className={`font-bold text-w ${fullSize ? 'text-m-t4 md:text-t4' : 'text-m-t5 md:text-t5'}`}>
                  Assistant
                </h4>
                <h5
                  className={`font-bold text-w-75 ${fullSize ? 'text-m-t5 md:text-t5' : 'text-m-t7 md:text-t7'} overflow-hidden text-ellipsis
                    whitespace-nowrap`}
                >
                  {title}
                </h5>
              </div>

              <div className='flex items-center gap-3'>
                <button
                  aria-label='Minimize'
                  className='mr-1 h-4 w-4 hover:opacity-60'
                  onClick={() => toggleMinimize(id)}
                >
                  <div className='h-1 w-4 border-b-2 border-primary opacity-80' />
                </button>
                {!isMobile && (
                  <button
                    onClick={() => setFullSize(!fullSize)}
                    className='relative h-4 w-4 text-t5 text-primary hover:opacity-60'
                  >
                    {fullSize ? (
                      <>
                        <div className='absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/3 border-2 border-primary bg-b opacity-80' />
                        <div className='absolute left-2/3 top-1/3 h-3 w-3 -translate-x-1/2 -translate-y-1/3 border-2 border-primary opacity-80' />
                      </>
                    ) : (
                      <div className='h-4 w-4 border-2 border-primary opacity-80' />
                    )}
                  </button>
                )}
                <button
                  aria-label='Close'
                  className='hover:opacity-60'
                  onClick={() => {
                    document.body.classList.remove('overflow-hidden')
                    closeChat(id)
                  }}
                >
                  <Close styles='w-5 h-5 fill-primary' />
                </button>
              </div>
            </header>

            <TabsSlider
              mediaType={mediaType ?? 'Movie'}
              reload={reload}
              title={title ?? ''}
              setMessages={setMessages}
              setInput={setInput}
            />

            <div
              ref={refMessages}
              className={`flex flex-col gap-3 overflow-y-auto px-2 py-4 ${fullSize ? 'h-[calc(100dvh-12.125rem)]' : 'h-80'}`}
            >
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

            <button
              className='flex size-7 flex-shrink-0 items-center justify-center rounded-full border-[1px] border-primary'
              disabled={isLoading}
            >
              <Arrow styles='w-5 h-5 text-primary -rotate-90 scale-110' />
            </button>
          </form>
        </div>
      </div>
    </Draggable>
  )
}
