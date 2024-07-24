'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import Close from '@/components/icons/Close'
import Menu from '@/components/icons/Menu'
import { pages } from '@/consts/pages'

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null)

  const showMenu = () => {
    ref.current?.classList.add('!opacity-100')
    ref.current?.classList.remove('pointer-events-none')
    document.body.classList.add('overflow-hidden')

    const nav = ref.current?.querySelector('nav')
    nav?.classList.add('flex')
    nav?.classList.remove('hidden')
  }

  const hideMenu = () => {
    ref.current?.classList.remove('!opacity-100')
    ref.current?.classList.add('pointer-events-none')
    document.body.classList.remove('overflow-hidden')

    const nav = ref.current?.querySelector('nav')
    nav?.classList.remove('flex')
    nav?.classList.add('hidden')
  }

  return (
    <header className='w-full max-w-[1380px] py-3'>
      <nav className='flex items-center justify-between'>
        <div className='flex gap-[76px]'>
          <Link
            href='/'
            className='group text-m-t6 font-bold text-w transition-colors duration-300 ease-in hover:text-primary sm:text-t6'
          >
            <span className='text-primary transition-colors duration-300 ease-out group-hover:text-w'>AI</span>MOVIES
          </Link>

          <div className='hidden md:flex md:gap-8'>
            {pages.map((page) => (
              <StyledLink key={page.name} href={page.href}>
                {page.name}
              </StyledLink>
            ))}
          </div>
        </div>

        <div className='hidden md:flex md:gap-6'>
          <a className='text-m-t7 text-w sm:text-t7'>Favorites</a>
          <a className='text-m-t7 text-w sm:text-t7'>Dark</a>
        </div>

        <button className='block md:hidden' aria-label='Menu' onClick={showMenu}>
          <Menu styles='h-6 w-6 stroke-w' />
        </button>

        <div
          ref={ref}
          className='pointer-events-none fixed inset-0 z-10 w-screen items-center bg-b px-[6px] py-3 !opacity-0 transition-opacity duration-300 sm:px-2 md:hidden'
        >
          <aside className='mb-8 flex h-6 w-full items-center justify-between'>
            <span className='text-m-t5 font-semibold uppercase text-primary'>Menu</span>
            <button aria-label='Menu' onClick={hideMenu}>
              <Close styles='h-6 w-6 fill-w' />
            </button>
          </aside>

          <nav className='hidden w-full animate-fade-in flex-col items-center gap-4'>
            <Link href='/' className='text-m-t6 font-bold text-w' onClick={hideMenu}>
              <span className='text-primary'>AI</span>MOVIES
            </Link>
            <hr className='border-t-1 h-[2px] w-3/4 border-w' />
            {pages.map((page) => (
              <div key={page.href} className='flex w-full flex-col items-center gap-4'>
                <StyledLink href={page.href} onClick={hideMenu}>
                  {page.name}
                </StyledLink>
                <hr className='border-t-1 h-[2px] w-3/4 border-w' />
              </div>
            ))}
          </nav>
        </div>
      </nav>
    </header>
  )
}

function StyledLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const pathname = usePathname()

  if (pathname === href) {
    return (
      <Link href={href} className='text-m-t5 font-bold text-primary md:text-t7' onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href.slice(1) && pathname.slice(1).startsWith(href.slice(1))) {
    return (
      <Link href={href} className='text-m-t5 font-bold text-primary md:text-t7' onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className='text-m-t5 text-w transition-colors duration-200 ease-in hover:text-primary md:text-t7'
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
