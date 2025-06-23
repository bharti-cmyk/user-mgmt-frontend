import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {AppRoutes} from "./components/AppRoutes";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};
