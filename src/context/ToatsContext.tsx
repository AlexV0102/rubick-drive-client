import { createContext, ReactNode, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastMessage {
  id: number;
  message: string;
  variant?: "success" | "danger" | "info" | "warning";
}

interface ToastContextType {
  addToast: (
    message: string,
    variant?: "success" | "danger" | "info" | "warning"
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (
    message: string,
    variant: "success" | "danger" | "info" | "warning" = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer className="p-3" position="top-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} bg={toast.variant}>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
