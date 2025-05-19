export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  sizes: string[]
  colors: string[]
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'A comfortable, high-quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
    price: 29.99,
    image: '/images/white-tshirt.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    category: 'T-Shirts'
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch. Made from sustainable denim.',
    price: 79.99,
    image: '/images/jeans.jpg',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    category: 'Jeans'
  },
  {
    id: 3,
    name: 'Casual Hoodie',
    description: 'A warm and cozy hoodie perfect for casual outings. Made from recycled materials.',
    price: 59.99,
    image: '/images/hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Green'],
    category: 'Hoodies'
  },
  {
    id: 4,
    name: 'Summer Shorts',
    description: 'Lightweight and breathable shorts for hot summer days. Made from sustainable materials.',
    price: 39.99,
    image: '/images/shorts.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Black'],
    category: 'Shorts'
  }
] 