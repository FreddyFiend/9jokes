import { create } from "zustand";
import { isMobile } from "react-device-detect";
type NavbarStoreTypes = {
  isOpen: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

const useNavbar = create<NavbarStoreTypes>((set) => ({
  isOpen: !isMobile,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTrue: () => set({ isOpen: true }),
  setFalse: () => set({ isOpen: false }),
}));

export default useNavbar;
