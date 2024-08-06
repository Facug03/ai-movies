'use client'

import { memo } from 'react'
import { Message as MessageAi } from 'ai'
import Markdown from 'markdown-to-jsx'

import Ai from '@/components/icons/Ai'

interface Props {
  message: MessageAi
}

export const Message = memo(
  function Message({ message }: Props) {
    console.log({ message })
    if (message.role !== 'user' && message.role !== 'assistant') return null

    if (message.role === 'user') {
      return (
        <div className='flex justify-end'>
          <p className='rounded-xl bg-w-10 px-3 py-1 text-tinherit text-w'>{message.content}</p>
        </div>
      )
    }

    return (
      <div className='flex gap-2'>
        <div className='flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary'>
          <Ai styles='w-5 h-5 fill-b' />
        </div>

        <Markdown
          options={{
            overrides: {
              p: ({ children }) => <p className='mb-2 whitespace-pre-wrap text-tinherit text-w'>{children}</p>,
              ul: ({ children }) => <ul className='mb-2 ml-2 flex list-disc flex-col gap-1'>{children}</ul>,
              li: ({ children }) => <li className='whitespace-pre-wrap text-tinherit text-w'>{children}</li>,
              span: ({ children }) => <span className='whitespace-pre-wrap text-tinherit text-w'>{children}</span>,
              a: ({ children, ...props }) => (
                <a href={props.href} target='_blank' className='whitespace-pre-wrap text-tinherit text-blue-400'>
                  {children}
                </a>
              )
            }
          }}
        >
          {message.content}
        </Markdown>
      </div>
    )
  },
  (oldProps, newProps) => oldProps.message.content.length === newProps.message.content.length
)
