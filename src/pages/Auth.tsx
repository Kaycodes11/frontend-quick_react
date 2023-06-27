import React, { useEffect } from "react";
import Register from "../Register";
import Login from "../Login";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const user = getAuth().currentUser;
  
  // if (user) return <Navigate to={"/profile"} />;

  return (
    <>
      <Register />
      <Login />
    </>
  );
}
