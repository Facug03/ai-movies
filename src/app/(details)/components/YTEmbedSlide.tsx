import { Video } from '@/types/movieDetail'
import { YouTubeEmbed } from '@next/third-parties/google'

interface Props {
  video: Video
  videos: Video[]
}

export default function YTEmbedSlide({ video, videos }: Props) {
  return (
    <div
      className={`${videos.length > 1 ? 'mx-[calc(100vw-97.5vw)] sm:mx-[calc(100vw-20vw)]' : 'ml-[calc(100vw-97.5vw)]'} embla-slide
        relative aspect-[16/9] h-auto w-[95vw] max-w-[95vw] sm:w-[60vw] sm:max-w-[60vw]`}
    >
      <YouTubeEmbed
        videoid={video.key}
        playlabel='Play'
        style='min-width: 100%; min-height: 100%; border-radius: 8px;'
      />
    </div>
  )
}
