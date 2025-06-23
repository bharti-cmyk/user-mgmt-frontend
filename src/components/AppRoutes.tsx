import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./common/Loader";
import Navbar from "./layout/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ResetRequestPage from "../pages/ResetRequestPage";
import PrivateRoute from "./common/PrivateRoute";
import UsersList from "../pages/UserList";
import Profile from "../pages/Profile";
import ProfileEditPage from "../pages/ProfileEditPage";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export const AppRoutes = () => {
    const { loading } = useAuth();
    if (loading) return <Loader />;

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ResetRequestPage />} />
                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage key={window.location.search} />}
                />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <UsersList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile/edit"
                    element={
                        <PrivateRoute>
                            <ProfileEditPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
            </Routes>
        </>
    );
};
