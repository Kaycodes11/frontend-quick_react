import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

const PublicRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
