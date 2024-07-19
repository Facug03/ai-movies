import { seriesSections } from '@/consts/sectionsNames'
import { getSeries } from '@/services/getSeries'
import SliderClient from './SliderClient'

interface Props {
  title: keyof typeof seriesSections
}

export default async function Slider({ title }: Props) {
  const [error, data] = await getSeries(seriesSections[title])

  if (error) {
    return <div>Error</div>
  }

  return <SliderClient title={title} movies={data} />
}
