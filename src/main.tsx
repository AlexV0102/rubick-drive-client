import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastProvider } from "./context/ToatsContext.tsx";

const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache(),
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </ToastProvider>
  // </StrictMode>
);
