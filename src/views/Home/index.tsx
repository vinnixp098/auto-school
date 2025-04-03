import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { HeaderComponent } from "../../components/Header";

export const HomeView = () => {
  const navigate = useNavigate();

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
