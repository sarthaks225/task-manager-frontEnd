import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupConfig from "../pages/signup/signupConfig";
// import LoginConfig from "../pages/login/loginConfig.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to the Task Manager</div>,
    errorElement: <div>Error loading the page</div>,
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  //LoginConfig,
  SignupConfig,
  //LogoutConfig,
]);

export default router;
