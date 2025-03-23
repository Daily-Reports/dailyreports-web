import {create} from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    validateToken: (token: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => {
    const storedToken = localStorage.getItem("token");

    return {
        token: storedToken,
        user: null,
        isAuthenticated: !!storedToken,

        login: async (username, password) => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username, password}),
                });

                if (!response.ok) return false;

                const data = await response.json();
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                set({token: data.token, user: data.userData, isAuthenticated: true});
                return true;
            } catch (error) {
                console.error("Login failed:", error);
                return false;
            }
        },

        logout: () => {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            set({token: null, user: null, isAuthenticated: false})
        },

        validateToken: async (token) => {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/validate`, {params: {token}});
                if (response.status === 200) {
                    set({user: response.data, isAuthenticated: true});
                    return true;
                } else {
                    useAuthStore.getState().logout();
                    return false;
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                useAuthStore.getState().logout();

                return false;
            }
        },
    };
});

(async () => {
    const token = localStorage.getItem("token");
    if (token) await useAuthStore.getState().validateToken(token);
})();