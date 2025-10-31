import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import type { SouFormData } from "../helpers/types";
import { validateForm } from "../components/Validation";
import { IdentificationForm } from "../components/IdentificationForm";
import { AtendimentoForm } from "../components/AtendimentoForm";
import { SuccessDialog } from "../components/SuccessDialog";
import { FormMenu } from "../components/FormMenu";

export default function SouForm() {
  const [form, setForm] = useState<SouFormData>({
    nome: "",
    idade: "",
    dataNascimento: "",
    curso: "",
    fase: "",
    turno: "",
    dificuldade: "",
    disciplina: false,
    explicacao: false,
    sala: false,
    colegas: false,
    preferencia: "",
    horario: "",
    data: "",
    observacoes: "",
    profissional: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialog, setDialog] = useState<null | "form" | "atendimento">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "horario") {
      value = value.replace(/\D/g, "");
      if (value.length >= 3) value = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (section: "form" | "atendimento") => (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(section, form);
    setErrors(validation);
    if (Object.keys(validation).length === 0) setDialog(section);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#F9EFEF",
        minHeight: "100vh",
        overflowY: "auto",
        padding: 0,
        margin: 0,
      }}
    >
      {/* 🔹 Menu componentizado */}
      <FormMenu />

      {/* 🔹 Conteúdo principal */}
      <div style={{ flex: 1, padding: "40px 60px" }}>
        <Container maxWidth="lg" disableGutters>
          <Typography
            variant="body2"
            align="center"
            sx={{
              fontSize: "0.9rem",
              lineHeight: 1.4,
              color: "#000",
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            CENTRO UNIVERSITÁRIO PROGRAMA DE ATENDIMENTO AO ESTUDANTE CATÓLICA DE SANTA CATARINA EM JARAGUÁ DO SUL
            <br />
            <strong>SERVIÇO DE ORIENTAÇÃO UNIVERSITÁRIA – SOU</strong>
          </Typography>

          <IdentificationForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit("form")}
          />

          <AtendimentoForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit("atendimento")}
          />

          <SuccessDialog
            open={dialog === "form"}
            title="SEU AGENDAMENTO FOI ENCAMINHADO!"
            message="Aguarde o nosso contato via Teams para confirmação da data e horário."
            onClose={() => setDialog(null)}
          />

          <SuccessDialog
            open={dialog === "atendimento"}
            title="ATENDIMENTO SALVO COM SUCESSO!"
            message="Este atendimento foi registrado no histórico de consultas."
            onClose={() => setDialog(null)}
          />
        </Container>
      </div>
    </div>
  );
}
