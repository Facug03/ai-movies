import Hero from '@/sections/Hero'
import SliderMovies from '@/sections/slider/SliderMovies'
import SliderSeries from '@/sections/slider/SliderSeries'

export default function Home() {
  return (
    <>
      <Hero />
      <SliderMovies title='In theathers' />
      <SliderMovies title='Top rated films' />
      <SliderSeries title='Animes we recommend' />
    </>
  )
}
