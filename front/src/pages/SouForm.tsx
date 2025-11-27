import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import type { SouFormData } from "../helpers/types";
import { validateForm } from "../components/Validation";
import { IdentificationForm } from "../components/IdentificationForm";
import { AtendimentoForm } from "../components/AtendimentoForm";
import { SuccessDialog } from "../components/SuccessDialog";
import { getUsuarioLogado, getPerfilUsuario } from "../helpers/authStorage";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function SouForm() {
  const usuarioLogado = getUsuarioLogado();

  const storageKey = `sou_atendimentos_${usuarioLogado}`;

  const [form, setForm] = useState<SouFormData>({
    id: "",
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


  const [userRole, setUserRole] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialog, setDialog] = useState<null | "form" | "atendimento">(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'formId']);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "horario") {
      value = value.replace(/\D/g, "");
      if (value.length >= 3) value = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      if (cookies.formId) {
        getFormById(userInfo);
      }
    };
    fetchData();
  }, []);
  const getUserInfo = async (): Promise<{ nome: string; role: string }> => {
    const response = await fetch('http://localhost:8082/form/user/infos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
    });
    const data = await response.json();
    if (!cookies.formId) {
      setForm({ ...form, nome: data.nome, idade: data.idade, dataNascimento: data.dataNascimento });
    } else {
      setUserRole(data.role)
    }
    return { nome: data.nome, role: data.role };
  }

  const getFormById = async (userInfo: { nome: string; role: string }) => {
    const response = await fetch(`http://localhost:8082/form/${cookies.formId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }


    });
    const data = await response.json();
    console.log("userInfo:", userInfo.nome);

    setForm({ ...data, profissional: userInfo?.role == "professor" ? userInfo.nome : data.profissional });
  }


  const createForm = async () => {
    if (
      !form.nome ||
      !form.idade ||
      !form.dataNascimento ||
      !form.curso ||
      !form.fase ||
      !form.turno ||
      !form.dificuldade ||
      !form.preferencia ||
      !form.horario ||
      !form.data
    ) {
      console.error('Campos obrigatórios estão vazios ou nulos. O save não será realizado.');
      return;
    }
    console.log(form.data);

    const formData = {
      name: form.nome,
      age: form.idade,
      birth_date: form.dataNascimento,
      course: form.curso,
      phase: form.fase,
      shift: form.turno,
      difficulty: form.dificuldade,
      discipline: form.disciplina ?? false,
      explanation: form.explicacao ?? false,
      room: form.sala ?? false,
      colleagues: form.colegas ?? false,
      preference: form.preferencia,
      time: form.horario,
      date: form.data
    };

    const response = await fetch('http://localhost:8082/form/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      console.error('Failed to create form');
      return;
    } else {
      navigate("/historico");
    }
  }

  const updateForm = async () => {
    if (
      !form.id ||
      !form.horario ||
      !form.data
    ) {
      console.error('Campos obrigatórios estão vazios ou nulos. O save não será realizado.');
      return;
    }

    const formData = {
      id: form.id,
      profissional: form.profissional,
      observations: form.observacoes,
      time: form.horario,
      date: form.data
    };

    const response = await fetch('http://localhost:8082/form/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      console.error('Failed to update form');
      return;
    } else {
      navigate("/historico");
    }
  }
  const handleSubmit =
    (section: "form" | "atendimento") => (e: React.FormEvent) => {
      e.preventDefault();

      const validation = validateForm(section, form);
      setErrors(validation);
      if (Object.keys(validation).length !== 0) return;

      let currentId = form.id || crypto.randomUUID();
      const salvos = JSON.parse(localStorage.getItem(storageKey) || "[]");

      if (section === "form") {
        const novo = {
          ...form,
          id: currentId,
          usuario: usuarioLogado,
          status: "rascunho",
          data: new Date().toISOString(),
        };

        const atualizados = salvos.filter((a: any) => a.id !== currentId);
        atualizados.push(novo);
        localStorage.setItem(storageKey, JSON.stringify(atualizados));

        setForm((prev) => ({ ...prev, id: currentId }));
        setDialog("form");
      }

      if (section === "atendimento") {
        const atualizados = salvos.map((a: any) =>
          a.id === currentId
            ? {
              ...a,
              ...form,
              id: currentId,
              usuario: usuarioLogado,
              status: "completo",
              data: new Date().toISOString(),
            }
            : a
        );

        const existe = atualizados.find((a: any) => a.id === currentId);

        if (!existe) {
          atualizados.push({
            ...form,
            id: currentId,
            usuario: usuarioLogado,
            status: "completo",
            data: new Date().toISOString(),
          });
        }

        localStorage.setItem(storageKey, JSON.stringify(atualizados));
        setDialog("atendimento");
      }
    };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F9EFEF",
        minHeight: "100vh",
      }}
    >
      <div style={{ flex: 1, padding: "40px 60px" }}>
        <Container maxWidth="lg">
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
            saveForm={createForm}
            userRole={userRole}
          />

          {userRole === "professor" && (
            <AtendimentoForm
              form={form}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit("atendimento")}
              updateForm={updateForm}

            />
          )}

          <SuccessDialog
            open={dialog === "form"}
            title="IDENTIFICAÇÃO SALVA!"
            message="Continue para registrar o atendimento completo."
            onClose={() => setDialog(null)}
          />

          <SuccessDialog
            open={dialog === "atendimento"}
            title="ATENDIMENTO SALVO COM SUCESSO!"
            message="O atendimento foi registrado no histórico de consultas."
            onClose={() => setDialog(null)}
          />
        </Container>
      </div>
    </div >
  );
}
