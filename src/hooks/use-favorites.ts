'use client'

import { useEffect, useState } from 'react'

import { Media } from '@/types/media'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Media[] | null>(null)
  const isLoading = favorites === null

  useEffect(() => {
    const favoritesLs = localStorage.getItem('favorites')

    const favoritesParsed = favoritesLs ? (JSON.parse(favoritesLs) as Media[]) : []
    setFavorites(favoritesParsed)
  }, [])

  const addFavorite = (media: Media) => {
    if (favorites?.some((item) => item.id === media.id)) return

    const favoritesLs = localStorage.getItem('favorites')

    if (favoritesLs) {
      const parsedFavorites = JSON.parse(favoritesLs)
      localStorage.setItem('favorites', JSON.stringify([...parsedFavorites, media]))
      setFavorites((prev) => [...(prev ?? []), media])

      return
    }

    localStorage.setItem('favorites', JSON.stringify([media]))
    setFavorites((prev) => [...(prev ?? []), media])
  }

  const removeFavorite = (media: Media) => {
    const favoritesLs = localStorage.getItem('favorites')

    if (!favoritesLs) return

    const parsedFavorites = JSON.parse(favoritesLs)
    localStorage.setItem(
      'favorites',
      JSON.stringify(parsedFavorites.filter((favorite: Media) => favorite.id !== media.id))
    )
    setFavorites((prev) => {
      if (!prev) return null

      return [...prev.filter((favorite) => favorite.id !== media.id)]
    })
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isLoading
  }
}
