import { moviesSection } from '@/consts/sections-names'
import { getMovies } from '@/services/movies'
import SliderClient from './slider-client'

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
