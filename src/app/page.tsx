import Hero from '@/sections/Hero'
import Slider from '@/sections/slider/Slider'

export default function Home() {
  return (
    <main className='max-w-[1380px] w-full'>
      <Hero />
      <Slider title='In theathers' />
      <Slider title='Top rated' />
      <Slider title='Popular' />
    </main>
  )
}
