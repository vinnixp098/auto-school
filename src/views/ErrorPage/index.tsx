

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { ResponseInterface } from "../../app/models/interfaces/ResponseInterface";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeAtual = location.pathname;


  const dadosString = localStorage.getItem("dados");
  const dados: ResponseInterface = dadosString ? JSON.parse(dadosString) : null;

  const toBack = () => {

    if (dados?.status === "success" && routeAtual !== "/") {
      navigate("/home");
    } else {
      navigate("/");
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

