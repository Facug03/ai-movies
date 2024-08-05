import Link from 'next/link'

interface Props {
  type: 'primary' | 'secondary'
  text: string
  icon?: JSX.Element
  onClick?: () => void
  href: string
}

export default function CustomLink({ text, type, icon, onClick, href }: Props) {
  if (type === 'secondary') {
    return (
      <Link
        href={href}
        className='flex w-fit items-center justify-between gap-3 rounded-lg bg-w px-8 py-2 text-m-t6 font-bold text-b transition-colors
          hover:bg-w-75 sm:text-t6'
        onClick={onClick}
      >
        {text} {icon}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className='flex w-fit items-center justify-between gap-3 rounded-lg bg-primary px-8 py-2 text-m-t6 font-bold text-b
        transition-opacity hover:bg-primary-80 sm:text-t6'
      onClick={onClick}
    >
      {text} {icon}
    </Link>
  )
}
