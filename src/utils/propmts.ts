import { Message } from 'ai'
import { v4 } from 'uuid'

import { MediaType } from '@/types/media'

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
