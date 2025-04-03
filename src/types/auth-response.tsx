import {User} from "@/types/User.tsx";

export type AuthResponse = {
    user: User;
    token: string;
};