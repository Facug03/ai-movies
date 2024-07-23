import MediaGrid from '@/components/MediaGrid'
import SearchForm from '@/components/SearchForm'
import { getAll } from '@/services/getAll'

export default async function Search() {
  const [error, data] = await getAll('trending')

  if (error) {
    return <div>Error</div>
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
