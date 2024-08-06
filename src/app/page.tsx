import Hero from '@/sections/hero'
import SliderMovies from '@/sections/slider/slider-movies'
import SliderSeries from '@/sections/slider/slider-series'
import { Footer } from '@/sections/footer'

export default function Home() {
  return (
    <>
      <Hero />
      <SliderMovies title='In theathers' />
      <SliderMovies title='Top rated films' />
      <SliderSeries title='Animes we recommend' />
      <SliderSeries title='Streaming Now' />
      <Footer />
    </>
  )
}
