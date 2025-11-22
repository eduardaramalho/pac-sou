import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
  onDownloadPdf: () => void;
}

export default function HistoryDetailsDialog({
  open,
  onClose,
  data,
  onDownloadPdf,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Faz aparecer a barra de rolagem já no início
  useEffect(() => {
    if (open && contentRef.current) {
      setTimeout(() => {
        contentRef.current!.scrollTop = 20;
      }, 80);
    }
  }, [open]);

  const formatDateBR = (value: string) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString("pt-BR");
  };

  const capitalize = (value: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "—";

  if (!data) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", paddingTop: "8px" },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          color: "#6B1F1F",
          fontWeight: 700,
          fontSize: "1.6rem",
        }}
      >
        Detalhes do Atendimento
      </DialogTitle>

      <DialogContent
        ref={contentRef}
        sx={{
          padding: "24px 40px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {/* ----------- Identificação ----------- */}
        <Typography
          sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#6B1F1F", mb: 2 }}
        >
          Dados de Identificação
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item label="Nome" value={data.nome} />
            <Item label="Data de nascimento" value={formatDateBR(data.dataNascimento)} />
            <Item label="Fase" value={data.fase} />
          </Grid>
          <Grid item xs={6}>
            <Item label="Idade" value={data.idade} />
            <Item label="Curso" value={data.curso} />
            <Item label="Turno" value={data.turno} />
          </Grid>
        </Grid>

        {/* ----------- Dificuldades ----------- */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#6B1F1F",
            mt: 4,
            mb: 2,
          }}
        >
          Dificuldades Relatadas
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item label="Disciplina" value={data.disciplina ? "Sim" : "Não"} />
            <Item label="Sala" value={data.sala ? "Sim" : "Não"} />
          </Grid>
          <Grid item xs={6}>
            <Item label="Explicação" value={data.explicacao ? "Sim" : "Não"} />
            <Item label="Colegas" value={data.colegas ? "Sim" : "Não"} />
          </Grid>
        </Grid>

        {/* ----------- Atendimento ----------- */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#6B1F1F",
            mt: 4,
            mb: 2,
          }}
        >
          Informações do Atendimento
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item label="Preferência" value={capitalize(data.preferencia)} />
            <Item label="Data" value={formatDateBR(data.data)} />
            <Item label="Status" value={data.status?.toUpperCase()} />
          </Grid>

          <Grid item xs={6}>
            <Item label="Horário" value={data.horario} />
            <Item label="Profissional" value={data.profissional || "—"} />
          </Grid>
        </Grid>

        <Typography sx={{ fontWeight: 600, mt: 3 }}>Observações:</Typography>
        <Typography sx={{ mb: 4 }}>
          {data.observacoes || "Nenhuma observação registrada."}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", padding: "20px 35px" }}>
        <Button onClick={onClose} sx={{ textTransform: "none", fontWeight: 600 }}>
          Fechar
        </Button>

        <Button
          variant="contained"
          onClick={onDownloadPdf}
          sx={{
            backgroundColor: "#6B1F1F",
            "&:hover": { backgroundColor: "#571919" },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Baixar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Item = ({ label, value }: { label: string; value: any }) => (
  <div style={{ marginBottom: "12px" }}>
    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>{label}:</Typography>
    <Typography sx={{ fontSize: "0.95rem" }}>{value}</Typography>
  </div>
);
