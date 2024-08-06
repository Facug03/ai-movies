'use client'

import MediaItem from '@/components/media-item'
import { Media } from '@/types/media'

interface Props {
  mediaContent: Media[]
  animate?: boolean
}

const styles: Record<string, string> = {
  2: 'gap-2 sm:justify-start sm:gap-3 md:gap-4',
  3: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  4: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  5: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  6: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  7: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  8: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  9: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  10: 'justify-between sm:justify-start sm:gap-3 md:gap-4',
  default: 'justify-between'
}

export default function MediaGrid({ mediaContent, animate }: Props) {
  return (
    <div
      className={`${styles[mediaContent.length <= 10 ? mediaContent.length : 'default']} grid grid-cols-[repeat(auto-fit,27vw)] gap-3
        sm:grid-cols-[repeat(auto-fit,22vw)] md:grid-cols-[repeat(auto-fit,18vw)] lg:grid-cols-[repeat(auto-fit,14vw)]
        xl:grid-cols-[repeat(auto-fit,12%)]`}
    >
      {mediaContent.map((media) => (
        <MediaItem key={media.id} media={media} type='grid' animate={animate} />
      ))}
    </div>
  )
}
