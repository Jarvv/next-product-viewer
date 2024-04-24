import { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export const Heading = ({ title, description, ...props }: HeadingProps) => {
  return (
    <div {...props}>
      <h2 className='text-3xl text-highlight font-bold tracking-tight'>{title}</h2>
      {description && <p className='text-sm text-muted-foreground'>{description}</p>}
    </div>
  )
}
