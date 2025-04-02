import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./route/protected-route.tsx";
import LoginRoute from "./route/auth/login.tsx";
import DashboardRoute from "./route/app/dashboard.tsx";
import SubareaRoute from "./route/app/subarea.tsx";
import NotFoundRoute from "./route/not-found.tsx";
import AreaRoute from "@/app/route/app/area.tsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRoute />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<DashboardRoute />} />
                    <Route path="*" element={<NotFoundRoute />} />
                    <Route path="areas" element={<AreaRoute />} />
                    <Route path="subareas" element={<SubareaRoute />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};