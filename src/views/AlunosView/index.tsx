import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { alunosService } from "../../app/services/aluno/alunosService";
import { formatarTelefone } from "../../utils/formatarTelefone";
import { Search, Plus, Pen, XCircle } from "lucide-react";
import { AlunoInterface } from "../../app/models/interfaces/AlunoInterface";
import { createAlunoService } from "../../app/services/aluno/createAlunoService";

export const AlunosView = () => {
	const [alunos, setAlunos] = useState<AlunoInterface[]>([]);
	const [error, setError] = useState<string>("");
	const [cpf, setCpf] = useState<string>("");
	const [dataInicio, setDataInicio] = useState<string>("");
	const [dataFim, setDataFim] = useState<string>("");

	// Estado para o modal
	const [modalAberto, setModalAberto] = useState(false);
	const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
	const [alunoSelecionado, setAlunoSelecionado] = useState<AlunoInterface | null>(null);

	const [novoAluno, setNovoAluno] = useState<AlunoInterface>({
		cpf: "",
		nome: "",
		telefone: "",
		categoria: "",
		data_final_processo: "",
		data_inicio_processo: "",
		data_matricula: "",
	});

	useEffect(() => {
		const getAllStudents = async () => {
			const response = await alunosService();
			if (response.status === "error") {
				setError("Não foi possível encontrar os alunos");
				return;
			}
			setAlunos(response.data);
		};

		getAllStudents();
	}, []);

	const handleAlunos = async () => {
		try {
			const response = await alunosService();
			if (response.status === "error") {
				setError("Não foi possível encontrar os alunos");
				return;
			}
			setAlunos(response.data);
		} catch (error) {
			console.error(error);
			setError("Erro ao buscar alunos");
		}
	};

	// Abrir modal de detalhes do aluno
	const abrirModal = (aluno: AlunoInterface) => {
		setAlunoSelecionado(aluno);
		setModalAberto(true);
	};

	// Fechar modal de detalhes
	const fecharModal = () => {
		setModalAberto(false);
		setAlunoSelecionado(null);
	};

	// Abrir modal de cadastro de aluno
	const abrirModalCadastro = () => {
		console.log("modal: ", modalCadastroAberto);
		setModalCadastroAberto(true);
	};

	// Fechar modal de cadastro
	const fecharModalCadastro = () => {
		setModalCadastroAberto(false);
	};

	// Função para cadastrar um novo aluno (simulação)
	const cadastrarAluno = async () => {
		console.log("Dados aluno cadastrado: ", novoAluno);
		const response = await createAlunoService(novoAluno);

		if (response.status === "error") {
			setError("Não foi possível cadastrar o aluno");
			return;
		}

		alert("Aluno cadastrado com sucesso!");
		fecharModalCadastro();
	};

	return (
		<div className={styles.container}>
			<HeaderComponent />
			<div className={styles.containerBox}>
				<div className={styles.filtros}>
					<div className={styles.filtro}>
						<label>CPF</label>
						<input type="text" placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />
					</div>
					<div className={styles.filtro}>
						<label>Dt. Início</label>
						<input type="date" onChange={(e) => setDataInicio(e.target.value)} />
					</div>
					<div className={styles.filtro}>
						<label>Dt. Final</label>
						<input type="date" onChange={(e) => setDataFim(e.target.value)} />
					</div>
					<div className={styles.filtro}>
						<button onClick={handleAlunos} title="Buscar alunos"><Search size={14} strokeWidth={3} /> Buscar</button>
					</div>
					<div className={styles.filtro}>
						<button onClick={() => abrirModalCadastro()} title="Cadastrar novo aluno" ><Plus size={14} strokeWidth={3} /> Novo Aluno</button>
					</div>
				</div>

				<div className={styles.tabelaContainer}>
					{error ? (
						<p className={styles.error}>{error}</p>
					) : (
						<table className={styles.tabela}>
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>CPF</th>
									<th>Categoria</th>
									<th>Data Início</th>
									<th>Data Final</th>
									<th>Data Matrícula</th>
									<th>Telefone</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								{alunos.length > 0 ? (
									alunos.map((aluno) => (
										<tr key={aluno.aluno_id}>
											<td>{aluno.aluno_id}</td>
											<td>{aluno.nome}</td>
											<td>{aluno.cpf}</td>
											<td>{aluno.categoria_descricao}</td>
											<td>{new Date(aluno.data_inicio_processo).toLocaleDateString()}</td>
											<td>{new Date(aluno.data_final_processo).toLocaleDateString()}</td>
											<td>{new Date(aluno.data_matricula!).toLocaleDateString()}</td>
											<td>{formatarTelefone(aluno.telefone)}</td>
											<td>
												<button
													className={styles.btnDetalhes}
													onClick={() => abrirModal(aluno)}
													title="Editar"
												>
													<Pen size={14} strokeWidth={3} />
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={9} className={styles.semDados}>
											Nenhum aluno encontrado
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>

			{/* Modal de Detalhes */}
			{modalAberto && alunoSelecionado && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<h2>Detalhes do Aluno</h2>
						<p><strong>ID:</strong> {alunoSelecionado.aluno_id}</p>
						<p><strong>Nome:</strong> {alunoSelecionado.nome}</p>
						<p><strong>CPF:</strong> {alunoSelecionado.cpf}</p>
						<p><strong>Categoria:</strong> {alunoSelecionado.categoria_descricao}</p>
						<p><strong>Data de Início:</strong> {new Date(alunoSelecionado.data_inicio_processo).toLocaleDateString()}</p>
						<p><strong>Data Final:</strong> {new Date(alunoSelecionado.data_final_processo).toLocaleDateString()}</p>
						<p><strong>Data de Matrícula:</strong> {new Date(alunoSelecionado.data_matricula!).toLocaleDateString()}</p>
						<p><strong>Telefone:</strong> {formatarTelefone(alunoSelecionado.telefone)}</p>

						<button className={styles.btnFechar} onClick={fecharModal}>Fechar</button>
					</div>
				</div>
			)}

			{/* Modal de Cadastro */}
			{modalCadastroAberto && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<h2>Cadastrar Aluno</h2>
						<div className={styles.modalForm}>
							<div className={styles.fieldItem}>
								<label>Nome:</label>
								<input
									type="text"
									value={novoAluno.nome}
									onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
								/>
							</div>

							<div className={styles.fieldItem}>
								<label>CPF:</label>
								<input
									type="text"
									value={novoAluno.cpf}
									onChange={(e) => setNovoAluno({ ...novoAluno, cpf: e.target.value })}
								/>
							</div>

							<div className={styles.fieldItem}>
								<label>Telefone:</label>
								<input
									type="text"
									value={novoAluno.telefone}
									onChange={(e) => setNovoAluno({ ...novoAluno, telefone: e.target.value })}
								/>
							</div>

							<div className={styles.fieldItem}>
								<label>Categoria:</label>
								<select
									value={novoAluno.categoria}
									onChange={(e) => setNovoAluno({ ...novoAluno, categoria: e.target.value })}
								>
									<option value="">Selecione uma categoria</option>
									<option value="A">Categoria A</option>
									<option value="B">Categoria B</option>
									<option value="AB">Categoria A e B</option>
									<option value="C">Categoria C</option>
									<option value="D">Categoria D</option>
								</select>
							</div>

							<div className={styles.fieldItem}>
								<label>Data de Início do Processo:</label>
								<input
									type="date"
									value={novoAluno.data_inicio_processo}
									onChange={(e) => setNovoAluno({ ...novoAluno, data_inicio_processo: e.target.value })}
								/>
							</div>

							<div className={styles.fieldItem}>
								<label>Data Final do Processo:</label>
								<input
									type="date"
									value={novoAluno.data_final_processo}
									onChange={(e) => setNovoAluno({ ...novoAluno, data_final_processo: e.target.value })}
								/>
							</div>
						</div>

						<div className={styles.modalButtons}>
							<button className={styles.btnFechar} onClick={fecharModalCadastro}>
								Fechar
							</button>
							<button
								onClick={cadastrarAluno}
								disabled={
									!novoAluno.nome ||
									!novoAluno.cpf ||
									!novoAluno.telefone ||
									!novoAluno.categoria ||
									!novoAluno.data_inicio_processo ||
									!novoAluno.data_final_processo
								}
							>
								Salvar
							</button>


						</div>
					</div>
				</div>
			)}

		</div>
	);
};
