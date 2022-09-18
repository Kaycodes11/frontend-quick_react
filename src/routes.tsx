import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const Login = () => {
  return <div>Login</div>;
};

const Dashboard = () => <div>dashboard</div>;

const Profile = () => <div>Profile</div>;

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/** Public Routes: Wrap all Route under PublicRoutes element */}
      <Route path="login" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
