import {AppRouter} from "./router.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {AuthLoader} from "@/lib/auth.tsx";
import {queryClient} from "@/lib/queryclient.ts";

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthLoader
                renderLoading={() => <div>Loading ...</div>}>
                <AppRouter/>
            </AuthLoader>
        </QueryClientProvider>
    );
};