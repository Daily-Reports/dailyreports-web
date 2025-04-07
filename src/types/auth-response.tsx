import { User } from "@/types/user.tsx";

export type AuthResponse = {
  user: User;
  token: string;
};
