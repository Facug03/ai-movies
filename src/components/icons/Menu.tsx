import { Props } from './interface'

export default function Menu({ styles }: Props) {
  return (
    <svg className={styles} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path
          d='M4 6H20M4 12H20M4 18H20'
          stroke='inherit'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}
