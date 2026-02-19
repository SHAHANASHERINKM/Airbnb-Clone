import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function UserRoutes({ children }) {
  const user = useSelector((state) => state.auth.user);



  
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default UserRoutes;
