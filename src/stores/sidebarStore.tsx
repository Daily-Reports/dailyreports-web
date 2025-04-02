import {create} from 'zustand';

interface SidebarStore {
    isProfileOpen: boolean;
    isOrderBookOpen: boolean;
    toggleProfile: () => void;
    toggleOrderBook: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isProfileOpen: false,
    isOrderBookOpen: false,
    toggleProfile: () => set((state) => ({isProfileOpen: !state.isProfileOpen})),
    toggleOrderBook: () => set((state) => ({isOrderBookOpen: !state.isOrderBookOpen})),
}));