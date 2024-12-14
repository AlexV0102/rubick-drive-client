import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useFolderStore } from "../store/folderStore";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const getFiles = useFolderStore((state) => state.getFiles);
  const loadFolders = useFolderStore((state) => state.loadFolders);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user) {
      getFiles(user?.id);
      loadFolders(user?.id);
    }
  }, [isAuthenticated, user]);

  return <Outlet />;
};

export default ProtectedRoute;
