'use client'

import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import useSWRInfinite from 'swr/infinite'
import Image from 'next/image'

import { searchAll } from '@/services/getAll'
import { apis } from '@/services/api'
import { imagesPath } from '@/utils/images'
import { SearchResults } from '@/types/search'
import Img from './icons/Img'

export default function SearchForm() {
  const { data, error, isLoading, query, setQuery, setSize, size, ref } = useSearch()

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

      <div className='hide-element flex flex-wrap gap-4 transition-opacity' ref={ref}>
        {data?.map((movies) => {
          return movies?.data.map((movie) => (
            <article key={movie.id} className='max-w-[9vw] animate-fade-in'>
              <div className='relative mb-3 aspect-[2/3] h-auto w-[9vw] rounded-lg'>
                {movie.poster_path ? (
                  <Image
                    src={imagesPath(movie.poster_path, '220x330')}
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
                {movie.type} {movie?.release_date && `• ${movie.release_date.split('-')[0]}`}
              </p>
            </article>
          ))
        })}
      </div>
    </>
  )
}

function useSearch() {
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 300)
  const ref = useRef<HTMLDivElement | null>(null)
  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    (page, previousData: SearchResults) => {
      if (debounceQuery.length === 0) return null

      if (previousData && page === previousData?.totalPages) return null

      return `${apis.all.search}&query=${debounceQuery}&page=${page + 1}`
    },
    searchAll,
    {
      errorRetryCount: 1,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    const element = document.getElementById('explore-section')
    const hideClass = 'hide-element'

    if (debounceQuery.length === 0) {
      element?.classList.remove(hideClass)
      ref.current?.classList.add(hideClass)

      return
    }

    const cards = element?.querySelectorAll('article')

    cards?.forEach((card) => {
      card.classList.add('animate-fade-in')
    })

    element?.classList.add(hideClass)
    ref.current?.classList.remove(hideClass)
  }, [debounceQuery])

  return {
    query,
    setQuery,
    data,
    error,
    isLoading,
    size,
    setSize,
    ref,
  }
}
