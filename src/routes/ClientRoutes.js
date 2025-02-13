// Constants
import { ROLE } from "@/constants";
// Route Guard
import RequireAuth from "@/guard";
import { lazy } from "react";

// Pages
const HomeTemp = lazy(() => import("@/containers/HomeTemplate"));
const HomePage = lazy(() => import("@/containers/HomeTemplate/HomePage"));
const EventDetailPage = lazy(() => import("@/containers/HomeTemplate/EventDetailsPage"));
const TicketBookingPage = lazy(() => import("@/containers/HomeTemplate/TicketBookingPage"));
const ProfilePage = lazy(() => import("@/containers/HomeTemplate/ProfilePage"));

const ClientRoutes = {
  path: "/",
  element: <HomeTemp />,
  children: [
    {
      path: "",
      element: <HomePage />,
    },
    { path: "event-detail/:id", element: <EventDetailPage /> },
    {
      path: "event-booking/:scheduleId",
      element: (
        <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
          <TicketBookingPage />
        </RequireAuth>
      ),
    },
    {
      path: "profile",
      element: (
        <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
          <ProfilePage />
        </RequireAuth>
      ),
    },
  ],
};

export default ClientRoutes;
