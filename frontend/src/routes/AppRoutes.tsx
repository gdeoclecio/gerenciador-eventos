import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { CadastroPage } from "../pages/CadastroPage";

export function AppRoutes() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path ="/login" element={<LoginPage/>}/>
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/eventos"
             element={
             <ProtectedRoute>
                <HomePage/>
            </ProtectedRoute>}
            />
          </Routes>
        </BrowserRouter>
    )
}