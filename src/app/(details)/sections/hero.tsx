import Image from 'next/image'

import ButtonAssistant from '@/components/button-assistant'
import Img from '@/components/icons/Img'
import Like from '@/components/icons/Like'
import Star from '@/components/icons/Star'
import { MovieDetail } from '@/types/movie-detail'
import { SeriesDetail } from '@/types/series-detail'
import { formatMovieDetail, formatSeriesDetail } from '@/utils/format'
import { imagesPath } from '@/utils/images'
import { numberToHour } from '@/utils/number-to-hour'
import { SaveFavorites } from '../components/save-favorites'

type Props =
  | {
      seriesDetail?: never
      movieDetail: MovieDetail
    }
  | {
      seriesDetail: SeriesDetail
      movieDetail?: never
    }

export default function Hero(props: Props) {
  if (props.seriesDetail) {
    const mediaDetail = props.seriesDetail

    return (
      <section className='relative mb-16 mt-8 flex flex-col sm:mb-24 sm:mt-10'>
        {mediaDetail.backdropPath && (
          <div
            className='absolute -top-20 left-[calc(50%-50vw)] -z-10 h-[calc(100%+48px+32px+64px)] w-screen sm:-top-[88px]
              sm:h-[calc(100%+48px+40px+96px)]'
          >
            <Image
              priority
              src={imagesPath(mediaDetail.backdropPath, 1280)}
              fill
              alt={`${mediaDetail.title} backdrop image`}
              className='mask-image-bg object-cover object-top opacity-25'
              sizes='100vw'
            />
          </div>
        )}

        <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
          <div
            className='relative mb-3 aspect-[2/3] h-auto w-[50vw] self-center rounded-lg shadow-xl sm:w-[22vw] sm:self-start md:w-[18vw]
              lg:w-[12vw]'
          >
            {mediaDetail.posterPath ? (
              <Image
                src={imagesPath(mediaDetail.posterPath, '300x450')}
                fill
                alt={`${mediaDetail.title} poster`}
                className='rounded-lg object-contain'
                sizes='(min-width: 768px) 18vw, (min-width: 640px) 22vw, 50vw'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                <Img styles='w-10 h-10 fill-b' />
              </div>
            )}
          </div>

          <div className='flex flex-col gap-2 sm:gap-3'>
            <div>
              <h1 className='text-m-t1 font-bold leading-tight text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t1'>
                {mediaDetail.title}
              </h1>

              <span className='text-m-t7 font-bold text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
                {mediaDetail?.releaseDate && `${mediaDetail.releaseDate.split('-')[0]}`} •{' '}
                {mediaDetail.genres.map((genre) => genre.name).join(', ')}
              </span>
            </div>
            <div className='flex gap-6'>
              {mediaDetail.voteAverage > 0 && (
                <div>
                  <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Rating</h3>
                  <div className='flex gap-2'>
                    <Star styles='w-5 h-5 fill-primary' />
                    <p className='text-m-t6 font-bold text-w sm:text-t6'>{mediaDetail.voteAverage.toFixed(1)}/10</p>
                  </div>
                </div>
              )}

              {mediaDetail.popularity > 0 && (
                <div>
                  <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Popularity</h3>
                  <div className='flex gap-2'>
                    <Like styles='w-5 h-5 fill-primary' />
                    <p className='text-m-t6 font-bold text-w sm:text-t6'>{mediaDetail.popularity.toFixed()}</p>
                  </div>
                </div>
              )}
            </div>

            <p className='max-w-[40em] text-m-t7 text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
              {mediaDetail.overview}
            </p>

            <div className='flex flex-col gap-3 sm:flex-row'>
              <SaveFavorites media={formatSeriesDetail(mediaDetail)} />
              <ButtonAssistant
                type='info'
                buttonText='More info'
                title={mediaDetail.title}
                mediaType={mediaDetail.type ?? 'Movie'}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const mediaDetail = props.movieDetail

  return (
    <section className='relative mb-16 mt-8 flex flex-col sm:mb-24 sm:mt-10'>
      {mediaDetail.backdropPath && (
        <div
          className='absolute -top-20 left-[calc(50%-50vw)] -z-10 h-[calc(100%+48px+32px+64px)] w-screen sm:-top-[88px]
            sm:h-[calc(100%+48px+40px+96px)]'
        >
          <Image
            priority
            src={imagesPath(mediaDetail.backdropPath, 1280)}
            fill
            alt={`${mediaDetail.title} backgrop image`}
            className='mask-image-bg object-cover object-top opacity-25'
            sizes='100vw'
          />
        </div>
      )}

      <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
        <div
          className='relative mb-3 aspect-[2/3] h-auto w-[50vw] self-center rounded-lg shadow-xl sm:w-[22vw] sm:self-start md:w-[18vw]
            lg:w-[12vw]'
        >
          {mediaDetail.posterPath ? (
            <Image
              src={imagesPath(mediaDetail.posterPath, '300x450')}
              fill
              alt={`${mediaDetail.title} poster`}
              className='rounded-lg object-contain'
              sizes='(min-width: 768px) 18vw, (min-width: 640px) 22vw, 50vw'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
              <Img styles='w-10 h-10 fill-b' />
            </div>
          )}
        </div>

        <div className='flex flex-col gap-2 sm:gap-3'>
          <div>
            <h1 className='text-m-t1 font-bold leading-tight text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t1'>
              {mediaDetail.title}
            </h1>

            <span className='text-m-t7 font-bold text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
              {mediaDetail?.releaseDate && `${mediaDetail.releaseDate.split('-')[0]}`}
              {mediaDetail?.runtime ? ` • ${numberToHour(mediaDetail?.runtime)}` : ''} •{' '}
              {mediaDetail.genres.map((genre) => ` ${genre.name}`).join(',')}
            </span>
          </div>
          <div className='flex gap-6'>
            {mediaDetail.voteAverage > 0 && (
              <div>
                <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Rating</h3>
                <div className='flex gap-2'>
                  <Star styles='w-5 h-5 fill-primary' />
                  <p className='text-m-t6 font-bold text-w sm:text-t6'>{mediaDetail.voteAverage.toFixed(1)}/10</p>
                </div>
              </div>
            )}

            {mediaDetail.popularity > 0 && (
              <div>
                <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Popularity</h3>
                <div className='flex gap-2'>
                  <Like styles='w-5 h-5 fill-primary' />
                  <p className='text-m-t6 font-bold text-w sm:text-t6'>{mediaDetail.popularity.toFixed()}</p>
                </div>
              </div>
            )}
          </div>

          <p className='max-w-[40em] text-m-t7 text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
            {mediaDetail.overview}
          </p>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <SaveFavorites media={formatMovieDetail(mediaDetail)} />
            <ButtonAssistant
              type='info'
              buttonText='More info'
              title={mediaDetail.title}
              mediaType={mediaDetail.type ?? 'Movie'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
