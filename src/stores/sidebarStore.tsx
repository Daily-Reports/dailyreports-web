import {create} from 'zustand';

interface SidebarStore {
    isProfileOpen: boolean;
    toggleProfile: () => void;
    closeProfile: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isProfileOpen: false,
    toggleProfile: () => set((state) => ({isProfileOpen: !state.isProfileOpen})),
    closeProfile: () => set({isProfileOpen: false}),
}));