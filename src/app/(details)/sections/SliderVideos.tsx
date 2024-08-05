'use client'

import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

import Play from '@/components/icons/Play'
import SliderNav from '@/components/SliderNav'
import { youtubeThumbnail } from '@/consts/youtubeThumbnail'
import { Video } from '@/types/movieDetail'
import SliderScreen from '../components/SliderScreen'

const YTEmbedSlide = dynamic(() => import('../components/YTEmbedSlide'))

interface Props {
  videos: Video[]
}

export default function SliderVideos({ videos }: Props) {
  const [slideIndex, setSlideIndex] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    dragFree: true,
    duration: 22.5,
    align: 'start',
    watchDrag: true,
    breakpoints: {
      '(min-width: 768px)': {
        watchDrag: false,
        loop: true
      }
    }
  })

  return (
    <section id='section-videos' className='mb-7 flex flex-col gap-3'>
      {Boolean(slideIndex) && (
        <SliderScreen onClose={() => setSlideIndex(null)} startIndex={(slideIndex as number) - 1}>
          {videos.map((video) => (
            <YTEmbedSlide key={video.id} video={video} videos={videos} />
          ))}
        </SliderScreen>
      )}

      <div className='flex items-center justify-between'>
        <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Videos</h2>

        <SliderNav emblaApi={emblaApi} />
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {videos.map((video, index) => {
            return (
              <div
                key={video.key}
                className='group relative mr-2 aspect-video h-auto flex-[0_0_70%] cursor-pointer sm:flex-[0_0_40%] lg:flex-[0_0_28%]'
                onClick={() => setSlideIndex(index + 1)}
              >
                <Image
                  src={youtubeThumbnail(video.key)}
                  fill
                  alt='background images'
                  className='rounded-lg object-cover'
                />

                <div
                  className='absolute left-1/2 top-1/2 flex size-12 -translate-x-2/4 -translate-y-2/4 items-center justify-center rounded-full
                    border-2 border-primary transition-transform md:group-hover:scale-105'
                >
                  <Play styles='w-6 h-6 fill-primary opacity-70 group-hover:opacity-100' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
