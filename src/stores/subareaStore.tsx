import {create} from "zustand/index";
import axios from "axios";
import {Subarea} from "@/types/api.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SubareaState {
    subareas: Subarea[];
    fetchSubareas: () => Promise<void>;
    removeSubArea: (id: number) => void;
}

export const useSubareaStore = create<SubareaState>((set) => ({
    subareas: [],
    fetchSubareas: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/subareas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            set({subareas: response.data});
        } catch (error) {
            console.error("cannot fetch subareas", error);
        }
    },
    removeSubArea: async (id: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/subareas/${id}`);

            set((state) => ({
                subareas: state.subareas.filter((subarea) => subarea.id !== id)
            }));
        } catch (error) {
            console.error("Cannot delete subarea:", error);
        }
    }
}));