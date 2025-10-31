export interface SouFormData {
  nome: string;
  idade: string;
  dataNascimento: string;
  curso: string;
  fase: string;
  turno: string;
  dificuldade: string;
  disciplina: boolean;
  explicacao: boolean;
  sala: boolean;
  colegas: boolean;
  preferencia: string;
  horario: string;
  data: string;
  observacoes: string;
  profissional: string;
}

export type SouSection = "form" | "atendimento";
