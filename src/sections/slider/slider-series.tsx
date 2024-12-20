import { seriesSections } from '@/consts/sections-names'
import { getSeries } from '@/services/series'
import SliderClient from './slider-client'

interface Props {
  title: keyof typeof seriesSections
}

export default async function Slider({ title }: Props) {
  const [error, data] = await getSeries({ type: seriesSections[title] })

  if (error) {
    throw error
  }

  return <SliderClient title={title} movies={data} />
}
