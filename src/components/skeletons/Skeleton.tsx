import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={twMerge('animate-pulse rounded-md bg-muted', className)} {...props} />
}
