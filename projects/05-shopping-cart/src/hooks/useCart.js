import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

export const useCart = () => {
  const context = useContext(CartContext)
  // Si es undefineed quiere decir que estas usando el contexto en un sitio que no puedes
  // por que no estas dentro del provider, entonces es un error.
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
