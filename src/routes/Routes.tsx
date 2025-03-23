import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dashboard} from '../pages/Dashboard.tsx';
import {PrivateRoute} from "../PrivateRoute.tsx";
import Login from "../pages/Login.tsx";
import NotFound from "../pages/NotFound.tsx";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};