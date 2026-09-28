import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookingState {
  category: string | null
  service: {
    id: string
    name: string
    price: number
    discountPrice?: number
    duration: number
    category: string
  } | null
  addOns: string[]
  stylist: {
    id: string
    name: string
    role: string
    avgRating: number
    totalReviews: number
  } | null
  date: string | null
  time: string | null
  customer: {
    name: string
    email: string
    phone: string
    notes?: string
  } | null

  setCategory: (category: string) => void
  setService: (service: BookingState['service']) => void
  toggleAddOn: (addOnId: string) => void
  setStylist: (stylist: BookingState['stylist']) => void
  setDateTime: (date: string, time: string) => void
  setCustomer: (customer: BookingState['customer']) => void
  reset: () => void
  getTotalPrice: () => number
  getTotalDuration: () => number
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      category: null,
      service: null,
      addOns: [],
      stylist: null,
      date: null,
      time: null,
      customer: null,

      setCategory: (category) => set({ category, service: null, addOns: [], stylist: null, date: null, time: null }),
      setService: (service) => set({ service, addOns: [] }),
      toggleAddOn: (addOnId) =>
        set((state) => ({
          addOns: state.addOns.includes(addOnId)
            ? state.addOns.filter((id) => id !== addOnId)
            : [...state.addOns, addOnId],
        })),
      setStylist: (stylist) => set({ stylist, date: null, time: null }),
      setDateTime: (date, time) => set({ date, time }),
      setCustomer: (customer) => set({ customer }),
      reset: () =>
        set({
          category: null,
          service: null,
          addOns: [],
          stylist: null,
          date: null,
          time: null,
          customer: null,
        }),
      getTotalPrice: () => {
        const { service, addOns } = get()
        let total = service?.price || 0
        // Add-on prices would be fetched from DB
        total += addOns.length * 500 // placeholder
        return total
      },
      getTotalDuration: () => {
        const { service, addOns } = get()
        let total = service?.duration || 0
        total += addOns.length * 30 // placeholder
        return total
      },
    }),
    {
      name: 'booking-storage',
    }
  )
)