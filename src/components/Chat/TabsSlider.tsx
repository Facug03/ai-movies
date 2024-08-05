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
}

export default function TabsSlider(props: Props) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
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

function MoviesTabs({ title, reload, setMessages }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  return (
    <>
      <Tab onClick={() => onClickSubmit(`Find me something similar to ${title}`)}>Similar</Tab>
      <Tab onClick={() => onClickSubmit('What are the reviews?')}>Reviews</Tab>
      <Tab onClick={() => onClickSubmit('Could you give me a summary?')}>Summary</Tab>
      <Tab onClick={() => onClickSubmit(`Are there upcoming movies of ${title}`)}>Upcoming movies</Tab>
      <Tab onClick={() => onClickSubmit(`Let's play a trivia about ${title}`)}>Trivia</Tab>
      <Tab onClick={() => onClickSubmit(`When ${title} was released?`)}>Release</Tab>
      <Tab onClick={() => onClickSubmit(`How was ${title} made?`)}>Production</Tab>
      <Tab onClick={() => onClickSubmit(`Who are the main characters of ${title}?`)}>Characters</Tab>
      <Tab onClick={() => onClickSubmit(`What is the plot of ${title}?`)}>Plot</Tab>
      <Tab onClick={() => onClickSubmit(`Was ${title} based on a book, comic book, or other source material??`)}>
        Adaptations
      </Tab>
    </>
  )
}

function SeriesTabs({ title, reload, setMessages }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  return (
    <>
      <Tab onClick={() => onClickSubmit(`Find me something similar to ${title}`)}>Similar</Tab>
      <Tab onClick={() => onClickSubmit('What are the reviews?')}>Reviews</Tab>
      <Tab onClick={() => onClickSubmit('Could you give me a summary?')}>Summary</Tab>
      <Tab onClick={() => onClickSubmit(`Are there any upcoming season of ${title}?`)}>Upcoming seasons</Tab>
      <Tab onClick={() => onClickSubmit(`Let's play a trivia about ${title}`)}>Trivia</Tab>
      <Tab onClick={() => onClickSubmit(`When ${title} was released?`)}>Release</Tab>
      <Tab onClick={() => onClickSubmit('How many seasons and episodes does it have?')}>Seasons and episodes</Tab>
      <Tab onClick={() => onClickSubmit(`How was ${title} made?`)}>Production</Tab>
      <Tab onClick={() => onClickSubmit(`Who are the main characters of ${title}?`)}>Characters</Tab>
      <Tab onClick={() => onClickSubmit(`What is the plot of ${title}?`)}>Plot</Tab>
      <Tab onClick={() => onClickSubmit(`Was ${title} based on a book, comic book, or other source material??`)}>
        Adaptations
      </Tab>
    </>
  )
}

function GeneralTabs({ reload, setMessages, setInput }: Props) {
  const onClickSubmit = (message: string) => {
    setMessages((messages) => [...messages, { role: 'user', content: message, id: v4() }])
    reload()
  }

  const onClickAddMessage = (message: string) => {
    setInput(message)
  }

  return (
    <>
      <Tab onClick={() => onClickSubmit('Find me something similar')}>Recommendations</Tab>
      <Tab onClick={() => onClickAddMessage('What are the reviews of ')}>Reviews</Tab>
      <Tab onClick={() => onClickAddMessage('Could you give me a summary of ')}>Summary</Tab>
      <Tab onClick={() => onClickAddMessage('Find me something similar to ')}>Find me something similar to...</Tab>
    </>
  )
}

function Tab({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button onClick={onClick} className='tab mx-[0.1875rem] whitespace-nowrap text-tinherit'>
      {children}
    </button>
  )
}
