import {create} from "zustand/index";
import axios from "axios";
import {Subarea} from "../type/Subarea.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SubareaState {
    subareas: Subarea[];
    fetchSubareas: () => Promise<void>;
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

            set({ subareas: response.data });
        } catch (error) {
            console.error("Erro ao buscar subáreas", error);
        }
    },
}));