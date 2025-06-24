import React, { Suspense } from "react";

const Login = React.lazy(() => import("./Login.jsx"));

const LoginContainer = () => (
  <Suspense
    fallback={
      <div>
        <h2>Loading Login...</h2>
      </div>
    }
  >
    <Login />
  </Suspense>
);

const LoginConfig = {
  path: "/login",
  title: "Login",
  element: <LoginContainer />,
};

export default LoginConfig;
