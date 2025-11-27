import type { SouFormData } from "../helpers/types";

export const validateForm = (section: "form" | "atendimento", form: SouFormData) => {
  const errors: Record<string, string> = {};

  if (section === "form") {
    if (!form.nome.trim()) errors.nome = "Informe o nome";
    else if (!/^[A-Za-zÀ-ú\s]+$/.test(form.nome))
      errors.nome = "O nome deve conter apenas letras";

    if (!form.idade.trim()) errors.idade = "Informe a idade";
    else if (!/^\d+$/.test(form.idade))
      errors.idade = "A idade deve conter apenas números";

    if (!form.dataNascimento.trim()) errors.dataNascimento = "Informe a data de nascimento";

    if (!form.curso.trim()) errors.curso = "Informe o curso";

    if (!form.fase.trim()) errors.fase = "Informe a fase";
    else if (!/^\d+$/.test(form.fase))
      errors.fase = "A fase deve conter apenas números";

    if (!form.turno) errors.turno = "Selecione o turno";

    if (!form.dificuldade.trim()) errors.dificuldade = "Descreva a dificuldade";

    if (!form.preferencia.trim()) errors.preferencia = "Escolha a preferência";

    if (!form.horario.trim()) errors.horario = "Informe o horário";
    else if (!/^\d{2}:\d{2}$/.test(form.horario))
      errors.horario = "Formato de horário inválido (HH:MM)";

    if (!form.data.trim()) errors.data = "Informe a data";
  }

  if (section === "atendimento") {
    if (!form.observacoes.trim()) errors.observacoes = "Informe as observações";
    if (!form.profissional.trim()) errors.profissional = "Informe o nome do profissional";
  }

  return errors;
};
