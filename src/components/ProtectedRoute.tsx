import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
