export interface AlunoInterface {
  aluno_id?: number;
  nome: string;
  cpf: string;
  categoria: string;
  categoria_descricao?: string;
  data_inicio_processo: string;
  data_final_processo: string;
  data_matricula?: string;
  telefone: string;
  excluido?: number;
}