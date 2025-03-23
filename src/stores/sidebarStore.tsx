import {create} from 'zustand';

interface SidebarStore {
    isSidebarCompact: boolean;
    isProfileOpen: boolean;
    toggleSidebar: () => void;
    toggleProfile: () => void;
    closeProfile: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isSidebarCompact: false,
    isProfileOpen: false,
    toggleSidebar: () => set((state) => ({isSidebarCompact: !state.isSidebarCompact})),
    toggleProfile: () => set((state) => ({isProfileOpen: !state.isProfileOpen})),
    closeProfile: () => set({isProfileOpen: false}),
}));