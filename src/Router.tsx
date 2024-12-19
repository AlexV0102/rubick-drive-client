import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FilePage from "./pages/FilePage";
import FolderPage from "./pages/FolderPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  {
    path: "/*",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "files/:fileId",
            element: <FilePage />,
          },
          {
            path: "folders/:folderId",
            element: <FolderPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter(routes);
export default router;
