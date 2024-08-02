'use client'

import useEmblaCarousel from 'embla-carousel-react'

// Give a prop like: Send prompt or fill input

export default function TabsSlider() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 'auto',
    dragFree: true,
    align: 'center'
  })

  return (
    <div className='mb-1 overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        <button className='tab text-tinherit mx-[0.1875rem]'>General</button>
        <button className='tab text-tinherit mx-[0.1875rem]'>Similar</button>
        <button className='tab text-tinherit mx-[0.1875rem]'>Reviews</button>
        <button className='tab text-tinherit mx-[0.1875rem]'>Summary</button>
        <button className='tab text-tinherit mx-[0.1875rem] whitespace-nowrap'>Upcoming movies</button>
        <button className='tab text-tinherit mx-[0.1875rem] whitespace-nowrap'>Trivia movies</button>
        <button className='tab text-tinherit mx-[0.1875rem] whitespace-nowrap'>Trivia series</button>
        <button className='tab text-tinherit mx-[0.1875rem] whitespace-nowrap'>Find me something similar to...</button>
      </div>
    </div>
  )
}
