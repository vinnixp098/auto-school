import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { LoginView } from "../views/Login";
import { HomeView } from "../views/Home";
import { UserInterface } from "../app/models/interfaces/UserInterface";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../views/ErrorPage";

export const AppRoutes: React.FC = () => {
    // const navigate = useNavigate();
    const user: UserInterface = useSelector(
        (state: RootState) => state.auth.user
    );

    useEffect(() => {
        if (user.usuario_id === 0) {
            // navigate("/");
            console.log(user);
        }
    }, [user]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/home" element={<HomeView />} />
                {/* Rota de fallback que redireciona para a página inicial */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};
