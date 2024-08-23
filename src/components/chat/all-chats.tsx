'use client'

import dynamic from 'next/dynamic'

import { useChatStore } from '@/providers/chat-store-provider'

const Chat = dynamic(() => import('./chat'))

export default function AllChats() {
  const chats = useChatStore((state) => state.chats)

  return (
    <>
      {chats.map((chat) => {
        if (!chat.isOpen) return null

        return <Chat key={chat.id} id={chat.id} />
      })}
    </>
  )
}
