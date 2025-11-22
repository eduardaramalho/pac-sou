import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryCard from "../components/HistoryCard";
import HistoryDetailsDialog from "../components/HistoryDetailsDialog";
import jsPDF from "jspdf";
import { getUsuarioLogado, getPerfilUsuario } from "../helpers/authStorage";

export default function SouHistory() {
  const usuarioLogado = getUsuarioLogado();
  const perfil = getPerfilUsuario();

  const storageKey = `sou_atendimentos_${usuarioLogado}`;

  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<any | null>(null);

  useEffect(() => {
    console.log(">>> Usuário logado:", usuarioLogado);
    console.log(">>> Perfil:", perfil);

    if (perfil === "professor") {
      const chaves = Object.keys(localStorage).filter((k) =>
        k.startsWith("sou_atendimentos_")
      );
      

      console.log(">>> Chaves encontradas:", chaves);

      let lista: any[] = [];

      chaves.forEach((chave) => {
        const dados = JSON.parse(localStorage.getItem(chave) || "[]");
        console.log(">>> Carregando:", chave, dados);
        lista = [...lista, ...dados];
      });

      console.log(">>> Lista final:", lista);
      setAtendimentos(lista);
    } else {
      const dados = JSON.parse(localStorage.getItem(storageKey) || "[]");
      console.log(">>> Carregado para aluno:", dados);
      setAtendimentos(dados);
    }
  }, []);

  const filtrados = atendimentos.filter((item) => {
  const nome = (item.nome || "").toLowerCase();
  const buscaLower = busca.toLowerCase();

  return nome.includes(buscaLower);
});


  const gerarPdf = (item: any) => {
    const doc = new jsPDF();

    const formatIsoDate = (iso: string) => {
      if (!iso) return "—";
      const date = new Date(iso);
      if (isNaN(date.getTime())) return "—";
      const d = String(date.getDate()).padStart(2, "0");
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

    addSectionTitle("Observações");
    doc.setFontSize(12);
    const obs = item.observacoes || "Nenhuma.";
    const splitObs = doc.splitTextToSize(obs, 170);
    doc.text(splitObs, 20, y);
    y += splitObs.length * 7;

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
      />
    </Box>
  );
}
