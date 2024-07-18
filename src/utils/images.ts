import { imageSizes } from '@/consts/imageSizes'

export const imagesPath = (id: string, size: keyof typeof imageSizes) => {
  return `https://media.themoviedb.org/t/p/${imageSizes[size]}${id}`
}
