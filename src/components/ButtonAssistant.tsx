'use client'

import { useRef } from 'react'
import { v4 } from 'uuid'

import { useChatStore } from '@/providers/chat-store-provider'
import { MediaType } from '@/types/media'
import Button from './Button'
import Ai from './icons/Ai'

interface Props {
  type: 'item' | 'general' | 'info'
  title: string
  mediaType: MediaType
  buttonText?: string
}

export default function ButtonAssistant({ type, title, mediaType, buttonText = 'Information' }: Props) {
  const id = useRef(v4())
  const { chats, addChat } = useChatStore((state) => state)

  if (type === 'info') {
    return (
      <Button
        text={buttonText}
        type='secondary'
        icon={<Ai styles='w-7 h-7 fill-b stroke-b' />}
        onClick={() => {
          addChat(id.current, title, mediaType)
        }}
      />
    )
  }

  if (type === 'item') {
    return (
      <div className='absolute right-1 top-1 z-10'>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-all ease-in-out active:scale-110
            active:bg-primary-80 md:hover:scale-110 md:hover:bg-primary-80'
          onClick={() => {
            addChat(id.current, title, mediaType)
          }}
        >
          <Ai styles='w-4 h-4 fill-b' />
        </button>
      </div>
    )
  }

  return (
    <div className='fixed bottom-5 right-4 flex flex-row-reverse gap-1'>
      {chats.map((chat) => {
        if (chat.id === 'default') {
          return (
            <button
              key={chat.id}
              className={`${
            chat.minimized || !chat.isOpen
                  ? 'group border-w-75 bg-b text-w-75 active:bg-primary md:hover:border-primary md:hover:bg-primary md:hover:text-b'
                  : `border-primary bg-primary text-b active:border-primary-80 active:bg-primary-80 md:hover:border-primary-80
                    md:hover:bg-primary-80`
              } z-50 flex w-fit items-center justify-center gap-2 rounded-lg border-[1px] px-6 py-2 text-t6 font-bold`}
              onClick={() => addChat('default', 'General', 'Movie')}
            >
              <span className='hidden sm:inline'>Assistant</span>{' '}
              <Ai
                styles={`w-6 h-6 fill-b ${chat.minimized || !chat.isOpen ? 'fill-primary md:group-hover:fill-b' : 'fill-b'}`}
              />
            </button>
          )
        }

        if (!chat.isOpen) return null

        return (
          <button
            key={chat.id}
            className={`${
              chat.minimized || !chat.isOpen
                ? 'border-w-75 bg-b text-w-75 active:bg-primary md:hover:border-primary md:hover:bg-primary md:hover:text-b'
                : `border-primary bg-primary text-b active:border-primary-80 active:bg-primary-80 md:hover:border-primary-80
                  md:hover:bg-primary-80`
            } z-50 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border-[1px] px-4 py-2 text-t6 font-bold
            lg:max-w-44`}
            onClick={() => addChat(chat.id, chat.title, chat.mediaType)}
          >
            {chat.title}
          </button>
        )
      })}
    </div>
  )
}
