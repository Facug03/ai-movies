import Link from 'next/link'

import Dropdown from '@/components/Dropdown'
import MediaGrid from '@/components/MediaGrid'
import { Genre } from '@/types/genres'
import { Media } from '@/types/media'
import { slugify } from '@/utils/slugify'

interface Props {
  title: string
  genres: Genre[]
  mediaContent: Media[]
  page: string
  dropdownTitle?: string
}

export default function MediaPage({ genres, mediaContent, title, page, dropdownTitle }: Props) {
  const dropdownItems = [
    {
      id: 'all',
      element: (
        <Link
          href={`/${page}`}
          className={`text-m-t7 font-medium ${dropdownTitle === 'All' ? 'text-primary' : 'text-w'} hover:text-primary sm:text-t6`}
        >
          All
        </Link>
      )
    }
  ].concat(
    genres.map((genre) => {
      return {
        id: genre.id.toString(),
        element: (
          <Link
            href={`/${page}/${slugify(genre.name)}-${genre.id}`}
            className={`text-m-t7 font-medium ${dropdownTitle === genre.name ? 'text-primary' : 'text-w'} hover:text-primary sm:text-t6`}
          >
            {genre.name}
          </Link>
        )
      }
    })
  )

  return (
    <>
      <h1 className='mb-3 mt-6 text-center text-m-t1 font-bold text-primary sm:mb-6 sm:mt-9 sm:text-t1'>{title}</h1>

      <nav className='mb-6 sm:mb-6'>
        {(page === 'animes/series' || page === 'animes/movies') && (
          <div className='mb-2 flex flex-wrap gap-2 sm:mb-4'>
            <Link
              href='/animes/series'
              className={`${page === 'animes/series' ? 'bg-primary text-b' : 'border-[1px] border-w-75 text-w-75 hover:border-primary hover:bg-primary hover:text-b'} hidden w-fit items-center justify-between gap-3 rounded-lg px-4 py-1 text-t6 font-bold sm:flex`}
            >
              Series
            </Link>

            <Link
              href='/animes/movies'
              className={`${page === 'animes/movies' ? 'bg-primary text-b' : 'border-[1px] border-w-75 text-w-75 hover:border-primary hover:bg-primary hover:text-b'} hidden w-fit items-center justify-between gap-3 rounded-lg px-4 py-1 text-t6 font-bold sm:flex`}
            >
              Movies
            </Link>

            <div className='sm:hidden'>
              <Dropdown
                label='Type'
                dropdownTitle={page === 'animes/series' ? 'Series' : 'Movies'}
                items={[
                  {
                    id: 'series',
                    element: (
                      <Link
                        href='/animes/series'
                        className={`text-m-t7 font-medium ${page === 'animes/series' ? 'text-primary' : 'text-w'} hover:text-primary sm:text-t6`}
                      >
                        Series
                      </Link>
                    )
                  },
                  {
                    id: 'movies',
                    element: (
                      <Link
                        href='/animes/movies'
                        className={`text-m-t7 font-medium ${page === 'animes/movies' ? 'text-primary' : 'text-w'} hover:text-primary sm:text-t6`}
                      >
                        Movies
                      </Link>
                    )
                  }
                ]}
              />
            </div>
          </div>
        )}

        <div className='group flex flex-wrap gap-2'>
          <Link
            href={`/${page}`}
            className={`${dropdownTitle === 'All' ? 'bg-primary text-b' : 'border-[1px] border-w-75 text-w-75 transition-colors hover:border-primary hover:bg-primary hover:text-b'} hidden w-fit items-center justify-between gap-3 rounded-lg px-4 py-1 text-t6 font-bold sm:flex`}
          >
            All
          </Link>

          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/${page}/${slugify(genre.name)}-${genre.id}`}
              className={`${dropdownTitle === genre.name ? 'bg-primary text-b' : 'border-[1px] border-w-75 text-w-75 transition-colors hover:border-primary hover:bg-primary hover:text-b'} hidden w-fit items-center justify-between gap-3 rounded-lg px-4 py-1 text-t6 font-bold sm:flex`}
            >
              {genre.name}
            </Link>
          ))}

          <div className='sm:hidden'>
            <Dropdown label='Genres' dropdownTitle={dropdownTitle} items={dropdownItems} />
          </div>
        </div>
      </nav>

      {mediaContent.length > 0 ? (
        <MediaGrid mediaContent={mediaContent} />
      ) : (
        <div>
          <h3 className='text-center text-m-t3 font-bold text-w-75 sm:mt-10 sm:text-t3'>
            No {title.toLowerCase()} found for this genre
          </h3>
          <p className='text-center text-m-t6 text-w-75 sm:text-t6'>
            Try using our AI assistant to find your favorite {title.toLowerCase()}
          </p>
        </div>
      )}
    </>
  )
}
