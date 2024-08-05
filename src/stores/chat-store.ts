'use client'

import { Message } from 'ai'
import { createStore } from 'zustand/vanilla'

import { MediaType } from '@/types/media'
import { generateSystemPropmts } from '@/utils/propmts'

export type ChatState = {
  chats: {
    id: string
    minimized: boolean
    isOpen: boolean
    systemPrompt: Message[]
    title: string
    mediaType: MediaType
  }[]
}

export type ChatActions = {
  addChat: (id: string, title: string, mediaType: MediaType) => void
  closeChat: (id: string) => void
  toggleMinimize: (id: string) => void
}

export type ChatStore = ChatState & ChatActions

export const initChatStore = (): ChatState => {
  return {
    chats: [
      {
        id: 'default',
        isOpen: false,
        minimized: false,
        systemPrompt: generateSystemPropmts(),
        title: 'General',
        mediaType: 'Movie'
      }
    ]
  }
}

export const defaultInitState: ChatState = {
  chats: []
}

export const createChatStore = (initState: ChatState = defaultInitState) => {
  return createStore<ChatStore>()((set) => ({
    ...initState,
    addChat: (id, title, mediaType) =>
      set(({ chats }) => {
        const chatIndex = chats.findIndex((chat) => chat.id === id || chat.title === title)
        const minimizeChats = chats.map((chat, i) => {
          if (i === chatIndex) return chat

          return {
            ...chat,
            isOpen: true,
            minimized: true
          }
        })

        if (chats[chatIndex]) {
          minimizeChats[chatIndex] = {
            ...minimizeChats[chatIndex],
            minimized: !minimizeChats[chatIndex].minimized,
            isOpen: true
          }

          return { chats: [...minimizeChats] }
        }

        if (chats.length === 3) {
          return {
            chats: [
              ...chats.slice(0, 2),
              {
                id,
                minimized: false,
                isOpen: true,
                systemPrompt: generateSystemPropmts(title, mediaType),
                title,
                mediaType
              }
            ]
          }
        }

        return {
          chats: [
            ...minimizeChats,
            {
              id,
              minimized: false,
              isOpen: true,
              systemPrompt: generateSystemPropmts(title, mediaType),
              title,
              mediaType
            }
          ]
        }
      }),
    toggleMinimize: (id) =>
      set(({ chats }) => {
        const chatIndex = chats.findIndex((chat) => chat.id === id)

        if (chats[chatIndex]) {
          chats[chatIndex] = {
            ...chats[chatIndex],
            minimized: !chats[chatIndex].minimized
          }

          return { chats: [...chats] }
        }

        return { chats: [...chats] }
      }),
    closeChat: (id) =>
      set(({ chats }) => {
        if (id === 'default') {
          chats[0] = {
            ...chats[0],
            isOpen: false,
            minimized: false
          }

          return { chats: [...chats] }
        }

        return { chats: [...chats.filter((chat) => chat.id !== id)] }
      })
  }))
}