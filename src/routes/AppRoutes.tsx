import {createBrowserRouter} from "react-router-dom";
import { LoginView } from "../views/Login";
import { HomeView } from "../views/Home";
import {ErrorPage} from "../views/ErrorPage";

export const AppRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginView />,
      errorElement: <ErrorPage />, 
    },
    {
      path: "/home",
      element: <HomeView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);
