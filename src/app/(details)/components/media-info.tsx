interface Props {
  title: string
  info: string[]
}

export default function MediaInfo({ info, title }: Props) {
  return (
    <div>
      <h4 className='text-t6 font-bold text-w'>{title}</h4>
      {info.map((info) => (
        <p key={info} className='text-t7 text-w'>
          {info}
        </p>
      ))}
    </div>
  )
}
