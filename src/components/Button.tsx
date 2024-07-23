interface Props {
  type: 'primary' | 'secondary'
  text: string
  icon?: JSX.Element
}

export default function Button({ text, type, icon }: Props) {
  if (type === 'secondary') {
    return (
      <button className='flex w-fit items-center justify-between gap-3 rounded-lg bg-w px-8 py-2 text-m-t6 font-bold text-b sm:text-t6'>
        {text} {icon}
      </button>
    )
  }

  return (
    <button className='flex w-fit items-center justify-between gap-3 rounded-lg bg-primary px-8 py-2 text-m-t6 font-bold text-b sm:text-t6'>
      {text} {icon}
    </button>
  )
}
