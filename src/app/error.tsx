'use client' // Error components must be Client Components

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <div className='flex h-[30vw] flex-col items-center justify-center'>
      <h2 className='text-m-t2 font-bold text-w sm:text-t2'>Something went wrong!</h2>
      <button
        className='mt-4 rounded-lg bg-primary px-8 py-2 text-m-t6 font-bold text-b sm:hover:bg-primary-80'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
