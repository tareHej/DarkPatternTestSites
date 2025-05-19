import Cart from '@/components/Cart'
import { useState } from 'react'

export default function CartPage() {
  // Simulated cart items for now
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      quantity: 1,
      size: 'M',
      color: 'White'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 79.99,
      quantity: 1,
      size: '32',
      color: 'Blue'
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <Cart
        items={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {}}
      />
    </div>
  )
} 