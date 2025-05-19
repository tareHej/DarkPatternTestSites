'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/data/products'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, size: string, color: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Sample cart items for demonstration
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    quantity: 2,
    size: 'M',
    color: 'White',
    image: '/images/tshirt.jpg'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 79.99,
    quantity: 1,
    size: '32',
    color: 'Blue',
    image: '/images/jeans.jpg'
  },
  {
    id: '3',
    name: 'Casual Hoodie',
    price: 59.99,
    quantity: 1,
    size: 'L',
    color: 'Gray',
    image: '/images/hoodie.jpg'
  }
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialCartItems)

  const addItem = (product: Product, quantity: number, size: string, color: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id && item.size === size && item.color === color
      )

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          size,
          color,
          image: product.image
        }
      ]
    })
  }

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 