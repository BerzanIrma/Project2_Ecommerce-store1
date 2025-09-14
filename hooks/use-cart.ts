import { toast } from 'react-hot-toast'
import { create } from 'zustand'

import { Product } from '@/types'

interface CartStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
  clearStorage: () => void
}

export const useCart = create<CartStore>((set, get) => ({
      items: [],
      addItem: (data: Product) => {
        try {
          const currentItems = get().items
          const existingItem = currentItems.find((item) => item.id === data.id)

          if (existingItem) {
            return toast.error(`${data.name} is already in your cart!`)
          }

          // Limit cart to 5 items max to prevent memory issues
          if (currentItems.length >= 5) {
            return toast.error('Cart is full! Maximum 5 items allowed.')
          }

          set({ items: [...get().items, data] })
          toast.success(`${data.name} added to cart!`)
        } catch (error) {
          console.error('Error adding item to cart:', error)
          toast.error('Failed to add item to cart. Please try again.')
        }
      },
      removeItem: (id: string) => {
        try {
          const currentItems = get().items
          const itemToRemove = currentItems.find((item) => item.id === id)
          set({ items: [...get().items.filter((item) => item.id !== id)] })
          toast.success(`${itemToRemove?.name || 'Item'} removed from cart!`)
        } catch (error) {
          console.error('Error removing item from cart:', error)
          toast.error('Failed to remove item from cart.')
        }
      },
      removeAll: () => {
        try {
          set({ items: [] })
          toast.success('Cart cleared!')
        } catch (error) {
          console.error('Error clearing cart:', error)
        }
      },
      clearStorage: () => {
        try {
          set({ items: [] })
          toast.success('Cart cleared!')
        } catch (error) {
          console.error('Error clearing cart:', error)
          toast.error('Failed to clear cart.')
        }
      },
    }))