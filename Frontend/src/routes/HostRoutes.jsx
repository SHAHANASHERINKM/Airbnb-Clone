import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HostRoutes({ children }) {
  const user = useSelector((state) => state.auth.user);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (user.hostStatus !== "active") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default HostRoutes;
