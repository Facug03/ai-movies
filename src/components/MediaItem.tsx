import Image from 'next/image'

import Img from '@/components/icons/Img'
import { Media } from '@/types/media'
import { imagesPath } from '@/utils/images'
import { isLatinAlphabet } from '@/utils/isLatinAlphabet'
import { slugify } from '@/utils/slugify'
import Link from 'next/link'

interface Props {
  media: Media
  type: 'slider' | 'grid'
  animate?: boolean
}

export default function MediaItem({ media, type, animate }: Props) {
  const href = `/${media?.type === 'Movie' ? 'movie' : 'series'}/${media.id}${isLatinAlphabet(media.originalTitle) ? `-${slugify(media.originalTitle)}` : ''}`

  if (type === 'grid') {
    return (
      <article className={`${animate ? 'animate-fade-in' : ''} embla-slide`}>
        <Link href={href}>
          <div className='embla-slide relative mb-3 aspect-[2/3] h-auto w-[27vw] rounded-lg sm:w-[22vw] md:w-[18vw] lg:w-[14vw] xl:w-full'>
            {media.posterPath ? (
              <Image
                src={imagesPath(media.posterPath, '220x330')}
                fill
                alt={`${media.title} poster`}
                className='rounded-lg object-contain'
                sizes='(min-width: 1280px) 1380px, (min-width: 1024px) 14vw, (min-width: 768px) 18vw, (min-width: 640px) 22vw, 27vw'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                <Img styles='w-10 h-10 fill-b' />
              </div>
            )}
          </div>
        </Link>

        <Link href={href} className='group'>
          <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-m-t7 font-bold text-w transition-colors group-hover:text-primary sm:text-t7'>
            {media.title}
          </h3>
          <p className='text-m-t8 text-w-75 transition-colors group-hover:text-w sm:text-t8'>
            {media.type} {media?.releaseDate && `• ${media.releaseDate.split('-')[0]}`}
          </p>
        </Link>
      </article>
    )
  }

  return (
    <article className='embla-slide mr-3 max-w-[27vw] sm:max-w-[22vw] md:max-w-[16vw] lg:max-w-[12vw] xl:max-w-[12%]'>
      <Link href={href}>
        <div className='relative mb-3 aspect-[2/3] h-auto w-[27vw] rounded-lg sm:w-[22vw] md:w-[16vw] lg:w-[12vw] xl:w-full'>
          {media.posterPath ? (
            <Image
              src={imagesPath(media.posterPath, '220x330')}
              fill
              alt={`${media.title} poster`}
              className='rounded-lg object-contain'
              sizes='(min-width: 1280px) 1380px, (min-width: 1024px) 12vw, (min-width: 768px) 16vw, (min-width: 640px) 22vw, 27vw'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
              <Img styles='w-10 h-10 fill-b' />
            </div>
          )}
        </div>
      </Link>

      <Link href={href} className='group'>
        <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w transition-colors group-hover:text-primary'>
          {media.title}
        </h3>
        <p className='text-m-t8 text-w-75 transition-colors group-hover:text-w sm:text-t8'>
          {media.type} {media?.releaseDate && `• ${media.releaseDate.split('-')[0]}`}
        </p>
      </Link>
    </article>
  )
}
