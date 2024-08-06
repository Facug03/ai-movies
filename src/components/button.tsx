interface Props {
  type: 'primary' | 'secondary'
  text: React.ReactNode
  icon?: JSX.Element
  onClick?: () => void
}

export default function Button({ text, icon, onClick, type }: Props) {
  if (type === 'secondary') {
    return (
      <button
        className='flex w-fit items-center justify-between gap-3 rounded-lg bg-w px-8 py-2 text-m-t6 font-bold text-b transition-colors
          hover:bg-w-75 sm:text-t6'
        onClick={onClick}
      >
        {text} {icon}
      </button>
    )
  }

  return (
    <button
      className='flex w-fit items-center justify-between gap-3 rounded-lg bg-primary px-8 py-2 text-m-t6 font-bold text-b
        transition-opacity hover:bg-primary-80 sm:text-t6'
      onClick={onClick}
    >
      {text} {icon}
    </button>
  )
}
