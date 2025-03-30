

import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import styles from "./index.module.css"; // Importando o CSS Module
import { useDispatch } from "react-redux";
import { ResponseInterface } from "../../app/models/interfaces/ResponseInterface";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const routeAtual = location.pathname;

  const toBoolean = (value: string | null) => value?.toLowerCase() === "true";

  const dadosString = localStorage.getItem("dados");
  const dados: ResponseInterface = dadosString ? JSON.parse(dadosString) : null;

  const toBack = () => {

    // dispatch(setNavigation({ ...navigation, header: menu, nav }));

    if (dados?.status === "success" && routeAtual !== "/") {
      navigate("/home");
    //   dispatch(setNavigation({ ...navigation, header: true, nav: true }));
    //   dispatch(setSnackbar({ status: dados.status }));
    } else {
      navigate("/");
    //   dispatch(setNavigation({ ...navigation, header: false, nav: false }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Oops! Algo deu errado.</h1>
        <p className={styles.message}>Rota não encontrada!</p>
        <button onClick={toBack} className={styles.button}>
          {dados.status === "error" ? "Voltar para tela de login" : "Voltar para a tela anterior"}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
