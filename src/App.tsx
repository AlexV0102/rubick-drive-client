import { RouterProvider } from "react-router-dom";
import "./styles.scss";
import router from "./Router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    refreshToken();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
