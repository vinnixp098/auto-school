import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { loginService } from '../../app/services/user/loginService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/authReducer';
import { tokenService } from '../../app/services/user/loginByTokenUser';

export const LoginView: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [usuario, setUsuario] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const handleStorageChange = () => {
			const token = localStorage.getItem('token');
			if (token) {
				validateToken(token);
			} 
		};

		const validateToken = async (token: string) => {
			try {
				const response = await tokenService(token);
				console.log("response token service", response);
				if (response.status === "error") {
					navigate('/');
					return
				} 
				navigate('/home');
				dispatch(setUser(response.data))

			} catch (error) {
				console.error("Erro ao validar token:", error);
				navigate('/');
			}
		};

		window.addEventListener("storage", handleStorageChange);

		handleStorageChange(); // Chamada inicial

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [navigate]);


	const handleLogin = async (usuario: string, senha: string) => {
		const response = await loginService(usuario, senha);
		setError('');

		if (response.status === "error") {
			setError('Login ou senha inválidos');
			return
		}

		dispatch(setUser(response.data));
		localStorage.setItem('token', response.data.token);
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
