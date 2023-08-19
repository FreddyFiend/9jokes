import { create } from "zustand";

type NavbarStoreTypes = {
  isOpen: boolean;
  toggle: () => void;
};

const useNavbar = create<NavbarStoreTypes>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavbar;
