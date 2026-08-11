import { Navigate } from "react-router-dom";
import { obterToken } from "../services/authService";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
    const token = obterToken();

    if(!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}