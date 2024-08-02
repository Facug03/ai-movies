'use client'

import { Message as MessageAi } from 'ai'
import Markdown from 'markdown-to-jsx'

import Ai from '@/components/icons/Ai'

interface Props {
  message: MessageAi
}

export default function Message({ message }: Props) {
  if (message.role !== 'user' && message.role !== 'assistant') return

  if (message.role === 'user') {
    return (
      <div className='flex justify-end'>
        <p className='text-tinherit rounded-xl bg-w-10 px-3 py-1 text-w'>{message.content}</p>
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
            p: ({ children }) => <p className='text-tinherit mb-2 whitespace-pre-wrap text-w'>{children}</p>,
            ul: ({ children }) => <ul className='mb-2 ml-2 flex list-disc flex-col gap-1'>{children}</ul>,
            li: ({ children }) => <li className='text-tinherit whitespace-pre-wrap text-w'>{children}</li>,
            span: ({ children }) => <span className='text-tinherit whitespace-pre-wrap text-w'>{children}</span>,
            a: ({ children, ...props }) => (
              <a href={props.href} target='_blank' className='text-tinherit whitespace-pre-wrap text-blue-400'>
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
}
