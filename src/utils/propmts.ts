import { Message } from 'ai'
import { v4 } from 'uuid'

import { Media, MediaType } from '@/types/media'

export const generateFavoritesSystemPropmts = (favorites: Media[]): Message[] => {
  if (favorites.length === 0) return []

  return [
    {
      role: 'system',
      content: favorites?.length
        ? `Here are my favorites: ${favorites.map((favorites) => `${favorites.title}-(${favorites.type})`).join(', ')}`
        : 'I have no favorites yet',
      id: v4()
    }
  ]
}

export const generateSystemPropmts = (title?: string, mediaType?: MediaType): Message[] => {
  if (title) {
    return [
      {
        id: v4(),
        content: `You are an AI assistant in a website about movies, animes, series, etc. You can only respond things related to the ${mediaType?.toLowerCase()} ${title}, like something similar, info about the movie, cast, curiositys, etc. if someone ask you something not-related, just say that you can only respond anything related to ${title}.`,
        role: 'system'
      },
      {
        content: `Ask anything related to ${title}.`,
        id: v4(),
        role: 'assistant'
      }
    ]
  }

  return [
    {
      id: v4(),
      content:
        'You are an AI assistant in a website about movies, animes, series, etc. You can only respond things related to that, if someone ask you something not-related, just say that you can only respond anything related to movies, animes, series, etc.',
      role: 'system'
    },
    {
      content: 'Ask anything related to movies, series or animes.',
      id: v4(),
      role: 'assistant'
    }
  ]
}
