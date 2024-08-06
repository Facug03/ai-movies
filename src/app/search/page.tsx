import { Metadata } from 'next'

import SearchForm from '@/app/search/sections/search-form'
import MediaGrid from '@/components/media-grid'
import { getAll } from '@/services/all'

export const metadata: Metadata = {
  title: 'Search - aiMovies',
  description:
    'Web to see movies, animes or series information, images and videos. You can use our integrated IA to improve your experienced.'
}

export default async function Search() {
  const [error, data] = await getAll('trending')

  if (error) {
    throw error
  }

  return (
    <>
      <SearchForm />

      <section id='explore-section' className='mb-10'>
        <h1 className='mb-2 text-balance text-m-t2 font-bold text-w sm:text-t2'>Most searched this week</h1>
        <MediaGrid mediaContent={data} />
      </section>
    </>
  )
}
