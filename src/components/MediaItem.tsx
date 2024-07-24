import Image from 'next/image'

import Img from '@/components/icons/Img'
import { Media } from '@/types/media'
import { imagesPath } from '@/utils/images'

interface Props {
  media: Media
  type: 'slider' | 'grid'
  animate?: boolean
}

export default function MediaItem({ media, type, animate }: Props) {
  if (type === 'grid') {
    return (
      <article className={`${animate ? 'animate-fade-in' : ''} group`}>
        <div className='relative mb-3 aspect-[2/3] h-auto w-[27vw] rounded-lg sm:w-[22vw] md:w-[18vw] lg:w-[14vw] xl:w-full'>
          {media.posterPath ? (
            <Image
              src={imagesPath(media.posterPath, '220x330')}
              fill
              alt={`${media.title} poster`}
              className='rounded-lg object-contain'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
              <Img styles='w-10 h-10 fill-b' />
            </div>
          )}
        </div>
        <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-m-t7 font-bold text-w transition-colors group-hover:text-primary sm:text-t7'>
          {media.title}
        </h3>
        <p className='text-m-t8 text-w-75 transition-colors group-hover:text-w sm:text-t8'>
          {media.type} {media?.releaseDate && `• ${media.releaseDate.split('-')[0]}`}
        </p>
      </article>
    )
  }

  return (
    <article className='group mr-3 max-w-[27vw] sm:max-w-[22vw] md:max-w-[16vw] lg:max-w-[12vw] xl:min-w-[12%]'>
      <div className='relative mb-3 aspect-[2/3] h-auto w-[27vw] rounded-lg sm:w-[22vw] md:w-[16vw] lg:w-[12vw] xl:w-full'>
        {media.posterPath ? (
          <Image
            src={imagesPath(media.posterPath, '220x330')}
            fill
            alt={`${media.title} poster`}
            className='rounded-lg object-contain'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
            <Img styles='w-10 h-10 fill-b' />
          </div>
        )}
      </div>
      <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w transition-colors group-hover:text-primary'>
        {media.title}
      </h3>
      <p className='text-m-t8 text-w-75 transition-colors group-hover:text-w sm:text-t8'>
        {media.type} {media?.releaseDate && `• ${media.releaseDate.split('-')[0]}`}
      </p>
    </article>
  )
}
