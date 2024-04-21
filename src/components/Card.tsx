import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={twMerge('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
}

export const CardHeader = ({ className, ...props }: CardProps) => (
  <div className={twMerge('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

export const CardTitle = ({ className, ...props }: CardProps) => (
  <h3 className={twMerge('text-2xl font-semibold leading-none', className)} {...props} />
)
export const CardDescription = ({ className, ...props }: CardProps) => (
  <p className={twMerge('text-sm text-muted-foreground', className)} {...props} />
)

export const CardContent = ({ className, ...props }: CardProps) => (
  <div className={twMerge('p-6 pt-0', className)} {...props} />
)

export const CardFooter = ({ className, ...props }: CardProps) => (
  <div className={twMerge('flex items-center p-6 pt-0', className)} {...props} />
)
