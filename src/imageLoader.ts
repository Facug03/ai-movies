'use client'

import { ImageLoaderProps } from 'next/image'
import { imagesPath } from './utils/images'
import { imageSizes } from './consts/image-sizes'

const getWidth = (width: number): keyof typeof imageSizes => {
  if (width >= 1280) {
    return 1280
  }

  if (width >= 780) {
    return 780
  }

  if (width >= 500) {
    return 500
  }

  if (width >= 300) {
    return 300
  }

  if (width >= 200) {
    return 200
  }

  return 154
}

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const splitSrc = src.split('/')
  const getId = splitSrc[splitSrc.length - 1]

  return imagesPath(`/${getId}`, getWidth(width))
}
