import React, { Suspense } from "react";
// import Loader from "../../../components/Loader/Loader";

const Signup = React.lazy(() => import("./Signup.jsx"));

const SignupContainer = () => {
  return (
    <Suspense
      fallback={
        <div>
          {/* <Loader /> */}
          <h2>Loading Signup...</h2>
        </div>
      }
    >
      <Signup />
    </Suspense>
  );
};

const SignupConfig = {
  path: "/signup",
  title: "Signup",
  element: <SignupContainer />,
};

export default SignupConfig;
