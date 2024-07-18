import { getMovies } from '@/services/getMovies'
import { moviesSection } from '@/consts/moviesSection'
import SliderClient from './SliderClient'

interface Props {
  title: keyof typeof moviesSection
}

export default async function Slider({ title }: Props) {
  const [error, data] = await getMovies(moviesSection[title])

  if (error) {
    return <div>Error</div>
  }

  return <SliderClient title={title} movies={data} />
}
