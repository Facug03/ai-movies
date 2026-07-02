'use client'

import { ChatStatus } from 'ai'
import useEmblaCarousel from 'embla-carousel-react'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'

import { MediaType } from '@/types/media'

interface Props {
  title: string
  mediaType: MediaType
  sendMessage: (message: string) => void
  setInput: Dispatch<SetStateAction<string>>
  status: ChatStatus
}

export default function TabsSlider(props: Props) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    dragFree: true,
    align: 'center'
  })

  return (
    <div className='mb-1 overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {props.title !== 'General' && props.mediaType === 'Movie' && <MoviesTabs {...props} />}
        {props.title !== 'General' && props.mediaType === 'Series' && <SeriesTabs {...props} />}
        {props.title === 'General' && <GeneralTabs {...props} />}
      </div>
    </div>
  )
}

function MoviesTabs({ title, sendMessage, status }: Props) {
  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Find me something similar to ${title}`)}>
        Similar
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are the reviews of ${title}?`)}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Could you give me a summary of ${title}?`)}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Are there upcoming movies of ${title}`)}>
        Upcoming movies
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Let's play a trivia about ${title}`)}>
        Trivia
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`When ${title} was released?`)}>
        Release
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`How was ${title} made?`)}>
        Production
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Who are the main characters of ${title}?`)}>
        Characters
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What is the plot of ${title}?`)}>
        Plot
      </Tab>
      <Tab
        isLoading={isLoading}
        onClick={() => sendMessage(`Was ${title} based on a book, comic book, or other source material?`)}
      >
        Adaptations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Who directed ${title}?`)}>
        Director
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Did ${title} win any awards?`)}>
        Awards
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are the genres of ${title}?`)}>
        Genres
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What songs are in the soundtrack of ${title}?`)}>
        Soundtrack
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are some popular fan theories about ${title}?`)}>
        Fan Theories
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Are there any easter eggs in ${title}?`)}>
        Easter Eggs
      </Tab>
    </>
  )
}

function SeriesTabs({ title, sendMessage, status }: Props) {
  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Find me something similar to ${title}`)}>
        Similar
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are the reviews of ${title}?`)}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Could you give me a summary of ${title}?`)}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Which network airs ${title}?`)}>
        Network
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Are there any upcoming season of ${title}?`)}>
        Upcoming seasons
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Are there any upcoming episodes of ${title}?`)}>
        Upcoming episodes
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Let's play a trivia about ${title}`)}>
        Trivia
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`When ${title} was released?`)}>
        Release
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`How many seasons and episodes does ${title} have?`)}>
        Seasons and episodes
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`How was ${title} made?`)}>
        Production
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Who are the main characters of ${title}?`)}>
        Characters
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What is the plot of ${title}?`)}>
        Plot
      </Tab>
      <Tab
        isLoading={isLoading}
        onClick={() => sendMessage(`Was ${title} based on a book, comic book, or other source material?`)}
      >
        Adaptations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Who directed ${title}?`)}>
        Director
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Did ${title} win any awards?`)}>
        Awards
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are the genres of ${title}?`)}>
        Genres
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What songs are in the soundtrack of ${title}?`)}>
        Soundtrack
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`What are some popular fan theories about ${title}?`)}>
        Fan Theories
      </Tab>
      <Tab isLoading={isLoading} onClick={() => sendMessage(`Are there any easter eggs in ${title}?`)}>
        Easter Eggs
      </Tab>
    </>
  )
}

function GeneralTabs({ sendMessage, setInput, status }: Props) {
  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => sendMessage('What do you recommend me based on my favorites?')}>
        Recommendations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => setInput('What are the reviews of ')}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => setInput('Could you give me a summary of ')}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => setInput('Find me something similar to ')}>
        Find me something similar to...
      </Tab>
    </>
  )
}

function Tab({ children, onClick, isLoading }: PropsWithChildren<{ onClick?: () => void; isLoading: boolean }>) {
  return (
    <button onClick={onClick} className='tab mx-[0.1875rem] whitespace-nowrap text-tinherit' disabled={isLoading}>
      {children}
    </button>
  )
}
