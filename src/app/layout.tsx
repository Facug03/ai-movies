import type { Metadata } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'

import ButtonAssistant from '@/components/ButtonAssistant'
import AllChats from '@/components/Chat/all-chats'
import { ChatStoreProvider } from '@/providers/chat-store-provider'
import Header from '@/sections/Header'
import './globals.css'

const schibstedGrotesk = Schibsted_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'aiMovies',
  description: 'Web to see movies'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${schibstedGrotesk.className} flex flex-col items-center overflow-x-hidden bg-b px-[0.375rem] sm:px-2 lg:px-3`}
      >
        <ChatStoreProvider>
          <Header />
          <main className='w-full max-w-[86.25rem]'>{children}</main>
          <ButtonAssistant type='general' mediaType='Movie' title='General' />
          <AllChats />
        </ChatStoreProvider>
      </body>
    </html>
  )
}
