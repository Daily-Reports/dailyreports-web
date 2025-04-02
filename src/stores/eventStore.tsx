import {create} from "zustand/index";
import axios from "axios";
import {Event} from "@/types/event.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface EventState {
    events: Event[];
    fetchEvents: () => Promise<void>;
    editEvent: (id: number, name: string) => Promise<void>;
    createEvent: (name: string) => Promise<void>;
    removeEvent: (id: number) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],
    fetchEvents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            set({events: response.data});
        } catch (error) {
            console.error("cannot fetch event", error);
        }
    },
    createEvent: async (name: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/events`, {
                name: name
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200)
                set((state) => ({
                    events: [...state.events, response.data]
                }));
        } catch (error) {
            console.error("Cannot create event", error);
        }
    },
    editEvent: async (id: number, name: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/events/${id}/update`, {
                name: name
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200)
                set((state) => ({
                            events: state.events.map((event) =>
                                    event.id === id ? {...event, name: name} : event
                            ),
                        }
                ));
        } catch (error) {
            console.error("cannot update event", error);
        }
    },
    removeEvent: async (id: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/events/${id}`);

            set((state) => ({
                events: state.events.filter((event) => event.id !== id)
            }));
        } catch (error) {
            console.error("Cannot delete event:", error);
        }
    }
}));