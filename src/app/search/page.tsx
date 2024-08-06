import SearchForm from '@/app/search/sections/search-form'
import MediaGrid from '@/components/media-grid'
import { getAll } from '@/services/all'

export default async function Search() {
  const [error, data] = await getAll('trending')

  if (error) {
    throw error
  }

  return (
    <>
      <SearchForm />

      <section id='explore-section'>
        <h1 className='mb-2 text-balance text-m-t2 font-bold text-w sm:text-t2'>Most searched this week</h1>
        <MediaGrid mediaContent={data} />
      </section>
    </>
  )
}
