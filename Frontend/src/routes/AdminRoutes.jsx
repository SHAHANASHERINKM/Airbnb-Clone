import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoutes({ children }) {
  const user = useSelector((state) => state.auth.user);

  // Not logged in → login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but NOT admin → block access
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin → allow access
  return children;
}

export default AdminRoutes;
