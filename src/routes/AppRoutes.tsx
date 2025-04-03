import {createBrowserRouter} from "react-router-dom";
import { LoginView } from "../views/Login";
import { HomeView } from "../views/Home";
import {ErrorPage} from "../views/ErrorPage";
import { AlunosView } from "../views/AlunosView";

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
      path: "/alunos",
      element: <AlunosView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);
