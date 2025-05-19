import { products } from '@/data/products'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find(p => p.id === Number(params.id))
  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-200">
            <Image src={product.image} alt={product.name} fill className="object-cover object-center" />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Size</label>
            <select className="border rounded px-3 py-2 w-full">
              {product.sizes.map(size => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Color</label>
            <select className="border rounded px-3 py-2 w-full">
              {product.colors.map(color => (
                <option key={color}>{color}</option>
              ))}
            </select>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 