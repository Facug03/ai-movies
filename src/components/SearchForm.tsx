'use client'

import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'
import Image from 'next/image'

import { searchAll } from '@/services/getAll'
import { apis } from '@/services/api'
import { imagesPath } from '@/utils/images'
import { SearchResults } from '@/types/search'
import Img from './icons/Img'
import Spinner from './icons/Spinner'

export default function SearchForm() {
  const { data, query, setQuery, refGrid, reachEnd, ref } = useSearch()

  return (
    <>
      <form className='mb-16' role='search'>
        <input
          placeholder='Search movies, series, anime or cartoons'
          type='text'
          className='w-full rounded-lg bg-w-25 px-2 py-3 text-t2 font-bold text-w-75 outline-none'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className='hide-element flex flex-wrap gap-4' ref={refGrid}>
        {data?.map((movies) => {
          return movies?.data.map((movie) => (
            <article key={movie.id} className='max-w-[9vw] animate-fade-in'>
              <div className='relative mb-3 aspect-[2/3] h-auto w-[9vw] rounded-lg'>
                {movie.posterPath ? (
                  <Image
                    src={imagesPath(movie.posterPath, '220x330')}
                    fill
                    alt={`${movie.title} poster`}
                    className='rounded-lg object-contain'
                    unoptimized
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                    <Img styles='w-10 h-10 fill-b' />
                  </div>
                )}
              </div>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w'>
                {movie.title}
              </h3>
              <p className='text-t8 text-w-75'>
                {movie.type} {movie?.releaseDate && `• ${movie.releaseDate.split('-')[0]}`}
              </p>
            </article>
          ))
        })}

        {!reachEnd && data?.length && (
          <div className='flex w-full justify-center py-3' ref={ref}>
            <Spinner styles='h-10 w-10 animate-spin fill-primary text-gray-200' />
          </div>
        )}
      </div>
    </>
  )
}

function useSearch() {
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 300)
  const refGrid = useRef<HTMLDivElement | null>(null)
  const { data, setSize } = useSWRInfinite(
    (page, previousData: SearchResults) => {
      if (debounceQuery.length === 0) return null

      if (previousData && page === previousData?.totalPages) return null

      return `${apis.all.search}query=${debounceQuery}&page=${page + 1}`
    },
    searchAll,
    {
      errorRetryCount: 1,
      revalidateOnFocus: false,
      keepPreviousData: true
    }
  )
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      setSize((prev) => prev + 1)
    }
  }, [inView, setSize])

  useEffect(() => {
    const element = document.getElementById('explore-section')
    const hideClass = 'hide-element'

    if (debounceQuery.length === 0) {
      element?.classList.remove(hideClass)
      refGrid.current?.classList.add(hideClass)

      return
    }

    const cards = element?.querySelectorAll('article')

    cards?.forEach((card) => {
      card.classList.add('animate-fade-in')
    })

    element?.classList.add(hideClass)
    refGrid.current?.classList.remove(hideClass)
  }, [debounceQuery])

  const reachEnd = data && data[data.length - 1]?.page === data[data.length - 1]?.totalPages

  return {
    data,
    query,
    setQuery,
    refGrid,
    reachEnd,
    ref
  }
}
