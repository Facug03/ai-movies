'use client'

import { ChatRequestOptions, Message } from 'ai'
import useEmblaCarousel from 'embla-carousel-react'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { v4 } from 'uuid'

import { MediaType } from '@/types/media'

// Give a prop like: Send prompt or fill input
interface Props {
  title: string
  mediaType: MediaType
  reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void
  setInput: Dispatch<SetStateAction<string>>
  isLoading: boolean
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

function MoviesTabs({ title, reload, setMessages, isLoading }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Find me something similar to ${title}`)}>
        Similar
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are the reviews of ${title}?`)}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Could you give me a summary of ${title}?`)}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Are there upcoming movies of ${title}`)}>
        Upcoming movies
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Let's play a trivia about ${title}`)}>
        Trivia
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`When ${title} was released?`)}>
        Release
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`How was ${title} made?`)}>
        Production
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Who are the main characters of ${title}?`)}>
        Characters
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What is the plot of ${title}?`)}>
        Plot
      </Tab>
      <Tab
        isLoading={isLoading}
        onClick={() => onClickSubmit(`Was ${title} based on a book, comic book, or other source material?`)}
      >
        Adaptations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Who directed ${title}?`)}>
        Director
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Did ${title} win any awards?`)}>
        Awards
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are the genres of ${title}?`)}>
        Genres
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What songs are in the soundtrack of ${title}?`)}>
        Soundtrack
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are some popular fan theories about ${title}?`)}>
        Fan Theories
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Are there any easter eggs in ${title}?`)}>
        Easter Eggs
      </Tab>
    </>
  )
}

function SeriesTabs({ title, reload, setMessages, isLoading }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Find me something similar to ${title}`)}>
        Similar
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are the reviews of ${title}?`)}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Could you give me a summary of ${title}?`)}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Which network airs ${title}?`)}>
        Network
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Are there any upcoming season of ${title}?`)}>
        Upcoming seasons
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Are there any upcoming episodes of ${title}?`)}>
        Upcoming episodes
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Let's play a trivia about ${title}`)}>
        Trivia
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`When ${title} was released?`)}>
        Release
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`How many seasons and episodes does ${title} have?`)}>
        Seasons and episodes
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`How was ${title} made?`)}>
        Production
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Who are the main characters of ${title}?`)}>
        Characters
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What is the plot of ${title}?`)}>
        Plot
      </Tab>
      <Tab
        isLoading={isLoading}
        onClick={() => onClickSubmit(`Was ${title} based on a book, comic book, or other source material?`)}
      >
        Adaptations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Who directed ${title}?`)}>
        Director
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Did ${title} win any awards?`)}>
        Awards
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are the genres of ${title}?`)}>
        Genres
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What songs are in the soundtrack of ${title}?`)}>
        Soundtrack
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`What are some popular fan theories about ${title}?`)}>
        Fan Theories
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit(`Are there any easter eggs in ${title}?`)}>
        Easter Eggs
      </Tab>
    </>
  )
}

function GeneralTabs({ reload, setMessages, setInput, isLoading }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  const onClickAddMessage = (message: string) => {
    setInput(message)
  }

  return (
    <>
      <Tab isLoading={isLoading} onClick={() => onClickSubmit('What do you recommend me based on my favorites?')}>
        Recommendations
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickAddMessage('What are the reviews of ')}>
        Reviews
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickAddMessage('Could you give me a summary of ')}>
        Summary
      </Tab>
      <Tab isLoading={isLoading} onClick={() => onClickAddMessage('Find me something similar to ')}>
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
