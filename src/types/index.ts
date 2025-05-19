export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  color: string
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
} 