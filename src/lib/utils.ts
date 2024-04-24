import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
  }).format(price / 100)
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-EN').format(number)
}

export const getRandomFileName = (file: File) => {
  const extension = file.name.split('.').pop()
  const randomName = Date.now().toString(36) + Math.random().toString(36).substr(2)
  return `${randomName}.${extension}`
}
