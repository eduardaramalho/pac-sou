import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryCard from "../components/HistoryCard";
import HistoryDetailsDialog from "../components/HistoryDetailsDialog";
import jsPDF from "jspdf";
import { getUsuarioLogado } from "../helpers/authStorage";
import { useCookies } from "react-cookie";
import type { SouFormData } from "../helpers/types";
import { useNavigate } from "react-router-dom";



export default function SouHistory() {
  const usuarioLogado = getUsuarioLogado();

  const storageKey = `sou_atendimentos_${usuarioLogado}`;

  const [atendimentos, setAtendimentos] = useState<SouFormData[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'formId']);
  const navigate = useNavigate();
  const getAllForms = async () => {
    const response = await fetch('http://localhost:8082/form/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
    });
    const data = await response.json();
    console.log(data);

    setAtendimentos(data)
  }

  const getUserInfo = async () => {
    const response = await fetch('http://localhost:8082/form/user/infos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
    });
    const data = await response.json();
    setUserRole(data.role)

  }

  useEffect(() => {
    getUserInfo();
    getAllForms();
    removeCookie('formId');
  }, []);

  const filtrados = atendimentos.filter((item) => {
    const nome = (item.nome || "").toLowerCase();
    const buscaLower = busca.toLowerCase();

    return nome.includes(buscaLower);
  });

  const updateForm = async (item: any) => {
    setCookie('formId', item.id);
    navigate('/sou-form');
  };

  const gerarPdf = (item: any) => {
    const doc = new jsPDF();

    const formatIsoDate = (iso: string) => {
      if (!iso) return "—";
      const date = new Date(iso);
      if (isNaN(date.getTime())) return "—";
      const d = String(date.getDate() + 1).padStart(2, "0");
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    let y = 20;

    doc.setFontSize(20);
    doc.setTextColor(109, 35, 35);
    doc.text("Relatório de Atendimento SOU", 20, y);
    y += 15;

    doc.setDrawColor(180, 180, 180);
    doc.line(20, y, 190, y);
    y += 10;

    const addSectionTitle = (title: string) => {
      doc.setFontSize(14);
      doc.setTextColor(109, 35, 35);
      doc.text(title, 20, y);
      y += 8;
      doc.setDrawColor(220, 220, 220);
      doc.line(20, y, 190, y);
      y += 10;
    };

    const addField = (label: string, value: any) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${label}:`, 20, y);
      doc.text(String(value || "—"), 70, y);
      y += 7;
    };

    addSectionTitle("Dados de Identificação");
    addField("Nome", item.nome);
    addField("Idade", item.idade);
    addField("Data de nascimento", formatIsoDate(item.dataNascimento));
    addField("Curso", item.curso);
    addField("Fase", item.fase);
    addField("Turno", item.turno);

    y += 5;

    addSectionTitle("Dificuldades Relatadas");
    addField("Disciplina", item.disciplina ? "Sim" : "Não");
    addField("Explicação", item.explicacao ? "Sim" : "Não");
    addField("Sala", item.sala ? "Sim" : "Não");
    addField("Colegas", item.colegas ? "Sim" : "Não");

    y += 5;

    addSectionTitle("Informações do Atendimento");
    addField("Preferência", item.preferencia);
    addField("Horário", item.horario);
    addField("Data", formatIsoDate(item.data));
    addField("Profissional", item.profissional || "—");
    addField("Status", item.status?.toUpperCase());

    y += 5;

    if (userRole == "professor") {
      addSectionTitle("Observações");
      doc.setFontSize(12);
      const obs = item.observacoes || "Nenhuma.";
      const splitObs = doc.splitTextToSize(obs, 170);
      doc.text(splitObs, 20, y);
      y += splitObs.length * 7;
    }

    doc.save(`atendimento_${item.nome}.pdf`);
  };


  return (
    <Box sx={{ padding: "40px 60px" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#6B1F1F" }}>
        Histórico de Atendimentos
      </Typography>

      <TextField
        placeholder="Buscar por aluno ou atendimento"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: "#EFEAEA",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {filtrados.length === 0 && (
        <Typography sx={{ mt: 4, opacity: 0.7, textAlign: "center" }}>
          Nenhum atendimento encontrado.
        </Typography>
      )}

      {filtrados.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onOpen={(i: any) => setSelecionado(i)}
          onDownloadPdf={(i: any) => gerarPdf(i)}
        />
      ))}
      <HistoryDetailsDialog
        open={!!selecionado}
        data={selecionado}
        onClose={() => setSelecionado(null)}
        onDownloadPdf={() => selecionado && gerarPdf(selecionado)}
        onDownUpdate={() => selecionado && updateForm(selecionado)}
        userRole={userRole}
      />
    </Box>
  );
}
