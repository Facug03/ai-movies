interface Props {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children }: Props) {
  return <div className={`animate-pulse rounded-lg bg-gray-500 ${className}`}>{children}</div>
}
