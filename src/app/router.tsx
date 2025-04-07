import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./route/private-route.tsx";
import LoginRoute from "./route/auth/login";
import DashboardRoute from "./route/app/dashboard";
import SubareaRoute from "./route/app/subarea";
import NotFoundRoute from "./route/not-found";
import AreaRoute from "@/app/route/app/area";
import EventRoute from "@/app/route/app/event";
import OrderRoute from "@/app/route/app/order";
import EmployeeRoute from "@/app/route/app/employee.tsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardRoute />} />
          <Route path="*" element={<NotFoundRoute />} />
          <Route path="employees" element={<EmployeeRoute />} />
          <Route path="events" element={<EventRoute />} />
          <Route path="areas" element={<AreaRoute />} />
          <Route path="subareas" element={<SubareaRoute />} />
          <Route path="orders" element={<OrderRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
