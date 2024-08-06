import Image from 'next/image'
import Link from 'next/link'

import Img from '@/components/icons/Img'
import { Media } from '@/types/media'
import { imagesPath } from '@/utils/images'
import { isLatinAlphabet } from '@/utils/is-latin-alphabet'
import { slugify } from '@/utils/slugify'
import ButtonAssistant from './button-assistant'

interface Props {
  media: Media
  type: 'slider' | 'grid'
  animate?: boolean
}

export default function MediaItem({ media, type, animate }: Props) {
  const href = `/${media?.type === 'Movie' ? 'movie' : 'tv'}/${media.id}${isLatinAlphabet(media.originalTitle) ? `-${slugify(media.originalTitle)}` : ''}`

  if (type === 'grid') {
    return (
      <article className={`${animate ? 'animate-fade-in duration-75' : ''} relative`}>
        <ButtonAssistant type='item' title={media.title} mediaType={media.type ?? 'Movie'} />

        <Link href={href}>
          <div className='relative mb-3 aspect-[2/3] h-auto w-[27vw] rounded-lg sm:w-[22vw] md:w-[18vw] lg:w-[14vw] xl:w-full'>
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

          <h3
            className='overflow-hidden text-ellipsis whitespace-nowrap text-m-t7 font-bold text-w transition-colors group-hover:text-primary
              sm:text-t7'
          >
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
    <article className='embla-slide relative mr-3 flex-[0_0_27%] sm:flex-[0_0_22%] md:flex-[0_0_16%] lg:flex-[0_0_12%]'>
      <ButtonAssistant type='item' title={media.title} mediaType={media.type ?? 'Movie'} />

      <Link href={href}>
        <div className='relative mb-3 aspect-[2/3] h-auto w-full rounded-lg'>
          {media.posterPath ? (
            <Image
              src={imagesPath(media.posterPath, '220x330')}
              fill
              alt={`${media.title} poster`}
              className='rounded-lg object-contain'
              sizes='(min-width: 1280px) 12%, (min-width: 1024px) 12%, (min-width: 768px) 16%, (min-width: 640px) 22%, 27%'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
              <Img styles='w-10 h-10 fill-b' />
            </div>
          )}
        </div>

        <div className='group'>
          <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w transition-colors group-hover:text-primary'>
            {media.title}
          </h3>
          <p className='text-m-t8 text-w-75 transition-colors group-hover:text-w sm:text-t8'>
            {media.type} {media?.releaseDate && `• ${media.releaseDate.split('-')[0]}`}
          </p>
        </div>
      </Link>
    </article>
  )
}
