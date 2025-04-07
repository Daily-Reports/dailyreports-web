import { create } from "zustand";

interface SidebarStore {
  isProfileOpen: boolean;
  isOrderBookOpen: boolean;
  isReportsOpen: boolean;
  toggleProfile: () => void;
  toggleOrderBook: () => void;
  toggleReports: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isProfileOpen: false,
  isOrderBookOpen: false,
  isReportsOpen: false,
  toggleProfile: () =>
    set((state) => ({ isProfileOpen: !state.isProfileOpen })),
  toggleOrderBook: () =>
    set((state) => ({ isOrderBookOpen: !state.isOrderBookOpen })),
  toggleReports: () =>
    set((state) => ({ isReportsOpen: !state.isReportsOpen })),
}));
