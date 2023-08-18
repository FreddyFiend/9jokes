import { create } from "zustand";
import { isBrowser, isMobile } from "react-device-detect";
type NavbarStoreTypes = {
  isOpen: boolean;
  toggle: () => void;
};

const useNavbar = create<NavbarStoreTypes>((set) => ({
  isOpen: !isMobile,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavbar;
