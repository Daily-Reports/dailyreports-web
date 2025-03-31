import {create} from "zustand/index";
import axios from "axios";
import {Subarea} from "@/types/subarea.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SubareaState {
    subareas: Subarea[];
    fetchSubareas: () => Promise<void>;
    editSubarea: (id: number, name: string) => Promise<void>;
    createSubarea: (name: string) => Promise<void>;
    removeSubarea: (id: number) => Promise<void>;
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
    createSubarea: async (name: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/subareas`, {
                name: name
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200)
                set((state) => ({
                    subareas: [...state.subareas, response.data]
                }));
        } catch (error) {
            console.error("Cannot create subarea", error);
        }
    },
    editSubarea: async (id: number, name: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/subareas/${id}/update`, {
                name: name
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200)
                set((state) => ({
                            subareas: state.subareas.map((subarea) =>
                                    subarea.id === id ? {...subarea, name: name} : subarea
                            ),
                        }
                ));
        } catch (error) {
            console.error("cannot update subarea", error);
        }
    },
    removeSubarea: async (id: number) => {
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