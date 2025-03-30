import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { LoginView } from "../views/Login";
import { HomeView } from "../views/Home";
import {ErrorPage} from "../views/ErrorPage";

export const AppRoutes: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};
