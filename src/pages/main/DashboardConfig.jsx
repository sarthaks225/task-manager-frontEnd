import React, { Suspense } from "react";
// import Loader from "../../../components/Loader/Loader";

const Dashboard = React.lazy(() => import("./Dashboard.jsx"));

const DashboardContainer = () => {
  return (
    <Suspense
      fallback={
        <div>
          {/* <Loader /> */}
          <h2>Loading Dashboard...</h2>
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
};

const SignupConfig = {
  path: "/dashboard",
  title: "Dashboard",
  element: <DashboardContainer />,
};

export default SignupConfig;
