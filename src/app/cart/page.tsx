import Link from 'next/link'

// Mock data for demonstration
const cartItems = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    quantity: 1,
    image: '/mock-tshirt.jpg',
    size: 'M',
    color: 'Navy Blue'
  },
]

const recommendations = [
  {
    id: 2,
    name: 'Classic Denim Jeans',
    price: 79.99,
    image: '/mock-jeans.jpg',
    matchScore: 95
  },
  {
    id: 3,
    name: 'Canvas Sneakers',
    price: 59.99,
    image: '/mock-sneakers.jpg',
    matchScore: 88
  }
]

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const FREE_SHIPPING_THRESHOLD = 100
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main cart section */}
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Size: {item.size} | Color: {item.color}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                    <span>{item.quantity}</span>
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                  </div>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Free shipping progress */}
          {remainingForFreeShipping > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-blue-800">
                Add ${remainingForFreeShipping.toFixed(2)} more to get FREE shipping!
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Personalized recommendations */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Complete Your Look</h2>
            <div className="grid grid-cols-2 gap-4">
              {recommendations.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-full h-40 bg-gray-200 rounded-md mb-3"></div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <span className="text-sm text-green-600">{item.matchScore}% match</span>
                  </div>
                  <button className="w-full mt-2 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : 'Calculated at checkout'}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Estimated Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="block w-full bg-primary text-white text-center py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </Link>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-center gap-4">
                <span className="text-gray-600">🔒 Secure Checkout</span>
                <span className="text-gray-600">⚡ Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 