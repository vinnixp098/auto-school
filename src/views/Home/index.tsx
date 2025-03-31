import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useState } from "react";
import { loginService } from "../../app/services/user/loginService";

export const HomeView = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (usuario: string, senha: string) => {
    const response = await loginService(usuario, senha);
    setError("");

    // Validação simples de login
    if (response.status === "error") {
      setError("Login ou senha inválidos");
      return;
    }

    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.menu}>Menu</div>
        <div className={styles.lista}>
          <ul>
            <li>Home</li>
            <li>Cadastro</li>
          </ul>
        </div>
      </div>
      <div className={styles.containerItens}>
        <div className={styles.containerLogin}>item 1</div>
        <div className={styles.containerLogin}>item 2</div>
      </div>
    </div>
  );
};
