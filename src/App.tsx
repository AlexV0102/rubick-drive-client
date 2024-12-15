import { RouterProvider } from "react-router-dom";
import "./styles.scss";
import router from "./Router";
import { useEffect } from "react";
import { useHandleTokenRefresh } from "./hooks/useHandleRefreshToken";

//TODO: to utils
const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const refreshIfNeeded = (fn) => {
  const token = sessionStorage.getItem("authToken");
  console.log("token", token);
  if (token && isTokenExpired(token)) {
    console.log("token expired, refreshing...");
    fn();
  }
};

function App() {
  const { refresh } = useHandleTokenRefresh();

  useEffect(() => {
    refreshIfNeeded(refresh);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
