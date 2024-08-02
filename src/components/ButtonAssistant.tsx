'use client'

import { useControlChat } from '@/hooks/useControlChat'
import Chat from './Chat/Chat'
import Ai from './icons/Ai'

export default function ButtonAssistant() {
  const { show, toggleShow, minimized, toggleMinimized, openChat } = useControlChat()

  return (
    <div className='fixed bottom-5 right-4'>
      {show && <Chat onClose={toggleShow} minimized={minimized} toggleMinimize={toggleMinimized} />}

      {(!show || minimized) && (
        <button
          className='flex w-fit items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 text-t6 font-bold text-b'
          onClick={openChat}
        >
          Assistant <Ai styles='w-6 h-6 fill-b' />
        </button>
      )}
    </div>
  )
}
