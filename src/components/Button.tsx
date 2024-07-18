interface Props {
  type: 'primary' | 'secondary'
  text: string
  icon?: JSX.Element
}

export default function Button({ text, type, icon }: Props) {
  if (type === 'secondary') {
    return (
      <button className='bg-w text-b font-bold rounded-lg w-fit px-8 py-2 flex justify-between items-center gap-3'>
        {text} {icon}
      </button>
    )
  }

  return (
    <button className='bg-primary text-b font-bold rounded-lg w-fit px-8 py-2 flex justify-between items-center gap-3'>
      {text} {icon}
    </button>
  )
}
