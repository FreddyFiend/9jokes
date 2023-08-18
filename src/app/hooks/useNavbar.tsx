import { create } from 'zustand'

type NavbarStoreTypes = {
  isOpen : boolean
  toggle: () => void
}

const useNavbarStore NavbarStoreTypes = create((set) => ({
  isOpen: false,
  toggle: () => set((isOpen) => !isOpen),
  removeAllBears: () => set({ bears: 0 }),
}))