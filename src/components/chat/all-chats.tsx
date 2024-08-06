'use client'

import { useChatStore } from '@/providers/chat-store-provider'
import Chat from './chat'

export function AllChats() {
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
