import { Props } from './interface'

export default function Arrow({ styles }: Props) {
  return (
    <svg className={styles} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path
          d='M5 12H19M19 12L13 6M19 12L13 18'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}
