import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import DashboardConfig from "../pages/main/DashboardConfig";
import SignupConfig from "../pages/signup/signupConfig";
import LoginConfig from "../pages/login/LoginConfig";
import { useAuthStore } from "../stores/auth/authStore";

// ProtectedRoute component
const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />, // Redirect root to dashboard
    errorElement: <div>Error loading the page</div>,
  },
  {
    element: <ProtectedRoute />,
    children: [DashboardConfig],
  },
  LoginConfig,
  SignupConfig,
  //LogoutConfig,
]);

export default router;
