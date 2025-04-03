import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { HeaderComponent } from "../../components/Header";
import { Users, Car, Book, User, BookOpen } from "lucide-react";

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <div className={styles.containerBox}>
        <div className={styles.containerItens}>
          <div className={styles.containerItem} onClick={() => navigate("/alunos")}>
            <Users size={24} color="white" /> Alunos
          </div>
          <div className={styles.containerItem}>
            <User size={24} color="white" /> Instrutores
          </div>
          <div className={styles.containerItem}>
            <Car size={24} color="white" /> Veículos
          </div>
          <div className={styles.containerItem}>
            <BookOpen size={24} color="white" /> Aulas
          </div>
          <div className={styles.containerItem}>
            <Book size={24} color="white" /> Meus Dados
          </div>
        </div>
      </div>
    </div>
  );
};
