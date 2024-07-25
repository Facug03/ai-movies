import { imageSizes } from '@/consts/imageSizes'

export const imagesPath = (id: string, size: keyof typeof imageSizes) => {
  return `https://image.tmdb.org/t/p/${imageSizes[size]}${id}`
}
