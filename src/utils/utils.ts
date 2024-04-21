export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'GBP',
  }).format(price)
}

export const getRandomFileName = (file: File) => {
  const extension = file.name.split('.').pop()
  const randomName = Date.now().toString(36) + Math.random().toString(36).substr(2)
  return `${randomName}.${extension}`
}
