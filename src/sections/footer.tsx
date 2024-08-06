import Link from 'next/link'

import { pages } from '@/consts/pages'

export function Footer() {
  return (
    <footer className='mt-8 w-full max-w-[86.25rem] rounded-lg bg-neutral-800 px-6 py-3'>
      <Link href='/' className='mb-8 block text-m-t6 font-bold text-w'>
        <span className='text-primary'>AI</span>MOVIES
      </Link>

      <div className='flex max-w-[30%] justify-between'>
        <div className='flex flex-col gap-3'>
          <h5 className='text-m-t6 font-semibold uppercase text-w-50 sm:text-t6'>Discover</h5>
          {pages.map((page) => (
            <Link className='text-m-t6 text-w-75 sm:text-t6' href={page.href} key={page.name}>
              {page.name}
            </Link>
          ))}
        </div>

        <div className='flex flex-col gap-3'>
          <h5 className='text-m-t6 font-semibold uppercase text-w-50 sm:text-t6'>Let&apos;s Connect</h5>
          <a className='text-m-t6 text-w-75 sm:text-t6' href='mailto:facundogonzales1550@gmail.com'>
            Contact me
          </a>
          <a className='text-m-t6 text-w-75 sm:text-t6' href='https://github.com/Facug03' target='_blank'>
            Github
          </a>
          <a
            className='text-m-t6 text-w-75 sm:text-t6'
            href='https://www.linkedin.com/in/facundogonza/'
            target='_blank'
          >
            LinkedIn
          </a>
        </div>
      </div>

      <hr className='my-8 h-[1px] w-full border-w-50' />

      <p className='text-m-t6 text-w-75 sm:text-t7'>Made by Facu</p>
      <p className='text-m-t6 text-w-75 sm:text-t7'>
        This product uses the TMDB API but is not endorsed or certified by{' '}
        <a
          className='text-m-t6 underline underline-offset-4 sm:text-t7'
          href='https://www.themoviedb.org'
          target='_blank'
        >
          TMDB
        </a>
        .
      </p>
    </footer>
  )
}
