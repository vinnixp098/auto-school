import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { useState } from 'react';
import { loginService } from '../../app/services/user/loginService';

export const LoginView = () => {
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false); 
	const [error, setError] = useState<string>('');

	const handleLogin = async (usuario: string, senha: string) => {
		const response = await loginService(usuario, senha);
		setError('');

		// Validação simples de login
		if (response.status === "error") {
			setError('Login ou senha inválidos');
			return
		}

		navigate("/home");
	};

	return (
		<div className={styles.container}>
			<div className={styles.containerLogin}>
				<div className={styles.header}>Login</div>
				<div className={styles.form}>

					<input
						type="text"
						value={usuario}
						onFocus={() => setError('')}
						onChange={(e) => setUsuario(e.target.value)}
						className={error ? styles.inputError : ''}
						placeholder="Usuário"
					/>
					<input
						type={senhaVisivel ? 'text' : 'password'} 
						value={senha}
						onFocus={() => setError('')}
						onChange={(e) => setSenha(e.target.value)}
						className={error ? styles.inputError : ''}
						placeholder="Senha"
					/>

					{senha &&
						<label onClick={() => setSenhaVisivel(!senhaVisivel)}>

							<div>{senhaVisivel ? "Esconder" : "Mostrar"} senha</div>
						</label>
					}

					{error && <div className={styles.errorMessage}>{error}</div>}

				</div>
				<button
					onClick={() => handleLogin(usuario, senha)}
					className={styles.loginButton}
				>
					Entrar
				</button>
			</div>
		</div>
	);
};
