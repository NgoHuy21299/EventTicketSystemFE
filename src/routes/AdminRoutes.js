import { Navigate } from "react-router-dom";
// Constants
import { ROLE } from "@/constants";
// Route Guard
import RequireAuth from "@/guard";
import { lazy } from "react";

// Pages
const AdminTemplate = lazy(() => import("@/containers/AdminTemplate"));
const EventDashboard = lazy(() => import("@/containers/AdminTemplate/EventDashBoard"));
const UserDashboard = lazy(() => import("@/containers/AdminTemplate/UserDashBoard"));

const AdminRoutes = {
  path: "admin",
  element: (
    // <RequireAuth roles={[ROLE.ADMIN]}>
    <AdminTemplate />
    // </RequireAuth>
  ),
  children: [
    { path: "", element: <Navigate to="user-management" /> },
    { path: "user-management", element: <UserDashboard /> },
    { path: "event-management", element: <EventDashboard /> },
  ],
};

export default AdminRoutes;
