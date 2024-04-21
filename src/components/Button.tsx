import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const buttonStyles = cva([''], {
  variants: {
    variant: {
      default: 'bg-highlight text-white',
    },
    size: {
      default: 'h-10 px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button = ({ className, children, variant, ...props }: ButtonProps) => {
  return (
    <button {...props} className={twMerge(buttonStyles({ variant }), className)}>
      {children}
    </button>
  )
}
