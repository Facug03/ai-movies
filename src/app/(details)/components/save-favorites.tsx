'use client'

import Button from '@/components/button'
import Heart from '@/components/icons/Heart'
import { useFavorites } from '@/hooks/use-favorites'
import { Media } from '@/types/media'

interface Props {
  media: Media
}

export function SaveFavorites({ media }: Props) {
  const { favorites, addFavorite, isLoading } = useFavorites()

  const isInFavorites = favorites && favorites.some((item: Media) => item?.id === media?.id)

  return (
    <Button
      text={
        isLoading ? (
          <div className='h-3 w-28 animate-pulse rounded-full bg-gray-700 duration-200' />
        ) : isInFavorites ? (
          'Saved to favorites'
        ) : (
          'Add to favorites'
        )
      }
      type='primary'
      icon={<Heart styles='w-6 h-6 text-b' />}
      onClick={() => {
        addFavorite(media)
      }}
    />
  )
}
