import { create } from "zustand";

type NavbarStoreTypes = {
  isOpen: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

const useNavbar = create<NavbarStoreTypes>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTrue: () => set({ isOpen: true }),
  setFalse: () => set({ isOpen: false }),
}));

export default useNavbar;
