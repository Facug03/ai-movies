import Hero from '@/sections/Hero'
import SliderMovies from '@/sections/slider/SliderMovies'
import SliderSeries from '@/sections/slider/SliderSeries'
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
