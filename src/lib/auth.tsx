import {z} from "zod";
import {api} from "@/lib/api-client.tsx";
import {User} from "@/types/User.tsx";
import {AuthResponse} from "@/types/auth-response.tsx";
import {configureAuth} from "react-query-auth";
import {queryClient} from "@/lib/queryclient.ts";

const getUser = async (): Promise<User> => {
    return api.get('/auth/validate');
};

const logout = async (): Promise<void> => {
    localStorage.removeItem('token');
    await queryClient.invalidateQueries({queryKey: ["authenticated-user"]});

    return Promise.resolve();
};

export const loginInputSchema = z.object({
    username: z.string().min(1, 'Required'),
    password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
    return api.post('/auth/login', data);
};

export const {useUser, useLogin, useLogout, AuthLoader} = configureAuth({
    userFn: getUser,
    loginFn: async (data: LoginInput) => {
        return await loginWithEmailAndPassword(data).then(async (data) => {
            localStorage.setItem('token', data.token);
            await queryClient.invalidateQueries({queryKey: ["authenticated-user"]});

            return data.user;
        });
    },
    registerFn: (): Promise<Awaited<null>> => Promise.resolve(null),
    logoutFn: logout,
});
