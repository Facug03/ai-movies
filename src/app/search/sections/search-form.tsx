'use client'

import { useDebounce } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'

import MediaGrid from '@/components/media-grid'
import Spinner from '@/components/icons/Spinner'
import { searchAll } from '@/services/all'
import { apis } from '@/services/api'
import { SearchResults } from '@/types/search'

export default function SearchForm() {
  const { data, query, setQuery, refGrid, reachEnd, ref, isLoading } = useSearch()

  console.log(Boolean(!data?.length), data)

  return (
    <>
      <form className='mb-16' role='search' onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder='Search movies, series, anime or cartoons'
          type='text'
          className='w-full rounded-lg bg-w-25 px-2 py-3 text-m-t2 font-bold text-w-75 outline-none sm:text-t2'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className='hide-element' ref={refGrid}>
        {Boolean(data?.length) && <MediaGrid mediaContent={data?.map((m) => m.data).flat() ?? []} />}

        {Boolean(!(data?.map((m) => m.data).flat() ?? []).length) && !isLoading && (
          <>
            <h2 className='text-center text-m-t3 font-bold text-w sm:text-t3'>No results found</h2>
            <p className='text-center text-m-t6 text-w-75 sm:text-t6'>Try searching with the AI assistant</p>
          </>
        )}

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
  const { data, setSize, isLoading } = useSWRInfinite(
    (page, previousData: SearchResults) => {
      if (debounceQuery.length === 0) return null

      if (previousData && page === previousData?.totalPages) return null

      return `${apis.all.search}query=${debounceQuery}&page=${page + 1}`
    },
    searchAll,
    {
      errorRetryCount: 1,
      revalidateOnFocus: false,
      keepPreviousData: true,
      revalidateAll: false,
      revalidateFirstPage: false,
      parallel: false
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
    ref,
    isLoading
  }
}
