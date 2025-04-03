import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useEffect } from "react";
import { HeaderComponent } from "../../components/Header";

export const HomeView = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const token = localStorage.getItem('token');
  //     console.log("token atualizado: ", token);

  //     if (!token) {
  //       navigate('/');

  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   handleStorageChange();

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [navigate]);

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <div className={styles.containerBox}>
        <div className={styles.containerItens}>
          <div className={styles.containerItem} onClick={() => navigate("/alunos")}>Alunos</div>
          <div className={styles.containerItem}>Instrutores</div>
          <div className={styles.containerItem}>Veículos</div>
          <div className={styles.containerItem}>Aulas</div>
        </div>
      </div>
    </div>
  );
};
