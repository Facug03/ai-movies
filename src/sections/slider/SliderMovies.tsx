import { moviesSection } from '@/consts/sectionsNames'
import { getMovies } from '@/services/movies'
import SliderClient from './SliderClient'

interface Props {
  title: keyof typeof moviesSection
}

export default async function Slider({ title }: Props) {
  const [error, data] = await getMovies({ type: moviesSection[title] })

  if (error) {
    throw error
  }

  return <SliderClient title={title} movies={data} />
}
