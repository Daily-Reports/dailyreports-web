import {create} from "zustand/index";
import axios from "axios";
import {Area} from "@/types/area.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AreaState {
    areas: Area[];
    fetchAreas: () => Promise<void>;
    editArea: (id: number, name: string) => Promise<void>;
    createArea: (name: string) => Promise<void>;
    removeArea: (id: number) => Promise<void>;
}

export const useAreaStore = create<AreaState>((set) => ({
    areas: [],
    fetchAreas: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/areas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            set({areas: response.data});
        } catch (error) {
            console.error("cannot fetch areas", error);
        }
    },
    createArea: async (name: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/areas`, {
                name: name
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200)
                set((state) => ({
                    areas: [...state.areas, response.data]
                }));
        } catch (error) {
            console.error("Cannot create area", error);
        }
    },
    editArea: async (id: number, name: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/areas/${id}/update`, {
                name: name
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200)
                set((state) => ({
                            areas: state.areas.map((area) =>
                                    area.id === id ? {...area, name: name} : area
                            ),
                        }
                ));
        } catch (error) {
            console.error("cannot update area", error);
        }
    },
    removeArea: async (id: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/areas/${id}`);

            set((state) => ({
                areas: state.areas.filter((area) => area.id !== id)
            }));
        } catch (error) {
            console.error("Cannot delete area:", error);
        }
    }
}));