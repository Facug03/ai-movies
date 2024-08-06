'use client'

import Image from 'next/image'

import { imagesPath } from '@/utils/images'
import Img from '@/components/icons/Img'
import { useFavorites } from '@/hooks/use-favorites'
import { Delete } from '@/components/icons/delete'

export function FavoritesList() {
  const { favorites, removeFavorite, isLoading } = useFavorites()

  if (isLoading) return null

  return (
    <section className='mb-10 flex flex-col gap-4'>
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite) => {
          return (
            <article key={favorite.id} className='flex animate-fade-in items-center gap-2'>
              <div className='relative aspect-[16/9] h-auto w-[40vw] flex-shrink-0 shadow-xl sm:w-[22vw] md:w-[18vw] lg:w-[12vw]'>
                {favorite.backdropPath ? (
                  <Image
                    src={imagesPath(favorite.backdropPath, '533x300')}
                    fill
                    alt={`${favorite.title} poster`}
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                    <Img styles='w-10 h-10 fill-b' />
                  </div>
                )}
              </div>

              <div className='flex flex-col gap-2 overflow-hidden sm:gap-3'>
                <div>
                  <h3
                    className='overflow-hidden text-ellipsis whitespace-nowrap text-m-t6 font-bold leading-tight text-w
                      [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t4'
                  >
                    {favorite.title}
                  </h3>

                  <span className='text-m-t7 font-bold text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
                    {favorite?.releaseDate && `${favorite.releaseDate.split('-')[0]}`}
                  </span>

                  <p className='hidden max-w-[40em] text-m-t7 text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:block sm:text-t7'>
                    {favorite.overview}
                  </p>
                </div>

                <div className='flex flex-col gap-3 sm:flex-row'></div>
              </div>

              <button className='ml-auto flex-shrink-0' onClick={() => removeFavorite(favorite)}>
                <Delete styles='size-5 md:size-6 text-w sm:hover:text-w-75 active:text-w-75 transition-all' />
              </button>
            </article>
          )
        })
      ) : (
        <p className='text-m-t6 font-medium text-w-75 sm:text-t6'>No favorites yet</p>
      )}
    </section>
  )
}
