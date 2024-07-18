'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='w-full max-w-[1380px] py-3'>
      <nav className='flex items-center justify-between'>
        <div className='flex gap-[76px]'>
          <Link href='/' className='font-bold text-w'>
            <span className='text-primary'>AI</span>MOVIES
          </Link>
          <div className='flex gap-8'>
            <StyledLink href='/'>Home</StyledLink>
            <StyledLink href='/search'>Search</StyledLink>
            <StyledLink href='/movies'>Movies</StyledLink>
            <StyledLink href='/series'>Series</StyledLink>
          </div>
        </div>

        <div className='flex gap-6'>
          <a className='text-t7 text-w'>Favorites</a>
          <a className='text-t7 text-w'>Dark</a>
        </div>
      </nav>
    </header>
  )
}

function StyledLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()

  const color = pathname === href ? 'text-primary font-bold' : 'text-w'

  return (
    <Link href={href} className={`${color} text-t7`}>
      {children}
    </Link>
  )
}
