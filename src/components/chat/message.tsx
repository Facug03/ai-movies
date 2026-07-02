'use client'

import { memo } from 'react'
import { UIMessage } from 'ai'
import Markdown from 'markdown-to-jsx'

import Ai from '@/components/icons/Ai'

interface Props {
  message: UIMessage
  isStreaming?: boolean
  isPending?: boolean
}

const mdOptions = {
  overrides: {
    p: ({ children }: { children: React.ReactNode }) => (
      <p className='mb-2 whitespace-pre-wrap text-tinherit text-w last:mb-0'>{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className='mb-2 ml-4 flex list-disc flex-col gap-1'>{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className='mb-2 ml-4 flex list-decimal flex-col gap-1'>{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => <li className='text-tinherit text-w'>{children}</li>,
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className='font-semibold text-w'>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => <em className='italic text-w-75'>{children}</em>,
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className='mb-2 text-m-t4 font-bold text-w md:text-t4'>{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className='mb-2 text-m-t5 font-bold text-w md:text-t5'>{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => <h3 className='mb-1 font-semibold text-w'>{children}</h3>,
    code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
      const isBlock = className?.includes('lang-')
      return isBlock ? (
        <code className='block w-full overflow-x-auto whitespace-pre text-tinherit text-green-300'>{children}</code>
      ) : (
        <code className='rounded bg-w-10 px-1 py-0.5 font-mono text-tinherit text-green-300'>{children}</code>
      )
    },
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className='mb-2 overflow-x-auto rounded-lg bg-w-10 p-3'>{children}</pre>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className='mb-2 border-l-2 border-primary pl-3 text-w-75'>{children}</blockquote>
    ),
    a: ({ children, ...props }: { children: React.ReactNode; href?: string }) => (
      <a
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-400 underline underline-offset-2 hover:opacity-80'
      >
        {children}
      </a>
    ),
    hr: () => <hr className='my-3 border-w-10' />
  }
}

function getTextContent(parts: UIMessage['parts']) {
  return parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('')
}

function AssistantMessage({
  text,
  isStreaming,
  isPending
}: {
  text: string
  isStreaming?: boolean
  isPending?: boolean
}) {
  return (
    <div className='flex gap-2'>
      <div className='flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary'>
        <Ai styles='w-5 h-5 fill-b' />
      </div>

      <div className={`min-w-0 flex-1 pt-0.5 ${isStreaming ? 'streaming' : ''}`}>
        {isPending && !text ? (
          <div className='flex items-center gap-1 pt-1'>
            <span className='h-2 w-2 animate-bounce rounded-full bg-w-50 [animation-delay:0ms]' />
            <span className='h-2 w-2 animate-bounce rounded-full bg-w-50 [animation-delay:150ms]' />
            <span className='h-2 w-2 animate-bounce rounded-full bg-w-50 [animation-delay:300ms]' />
          </div>
        ) : (
          <>
            <Markdown options={mdOptions}>{text}</Markdown>
            {isStreaming && (
              <span className='ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-w align-text-bottom' />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export function Message({ message, isStreaming, isPending }: Props) {
  if (message.role !== 'user' && message.role !== 'assistant') return null

  if (message.role === 'user') {
    return (
      <div className='flex justify-end'>
        <p className='max-w-[80%] rounded-xl bg-w-10 px-3 py-2 text-tinherit text-w'>{getTextContent(message.parts)}</p>
      </div>
    )
  }

  return <AssistantMessage text={getTextContent(message.parts)} isStreaming={isStreaming} isPending={isPending} />
}

export const MemoMessage = memo(function MemoMessage({ message }: Props) {
  if (message.role !== 'user' && message.role !== 'assistant') return null

  if (message.role === 'user') {
    return (
      <div className='flex justify-end'>
        <p className='max-w-[80%] rounded-xl bg-w-10 px-3 py-2 text-tinherit text-w'>{getTextContent(message.parts)}</p>
      </div>
    )
  }

  return <AssistantMessage text={getTextContent(message.parts)} />
})
