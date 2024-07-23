import type { Metadata } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'

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
        className={`${schibstedGrotesk.className} flex flex-col items-center overflow-x-hidden bg-b px-[6px] sm:px-2 lg:px-3`}
      >
        <Header />
        <main className='w-full max-w-[1380px]'>{children}</main>
      </body>
    </html>
  )
}
