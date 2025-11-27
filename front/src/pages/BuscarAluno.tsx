import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BuscarAluno() {
  const [search, setSearch] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const atendimentos = JSON.parse(localStorage.getItem("sou_atendimentos") || "[]");
    if (search.trim() === "") {
      setResultados([]);
      return;
    }

    const filtrados = atendimentos.filter((a: any) =>
      a.nome.toLowerCase().includes(search.toLowerCase())
    );
    setResultados(filtrados);
  }, [search]);

  return (
    <Box sx={{ backgroundColor: "#F9EFEF", minHeight: "100vh", p: "40px 60px" }}>
      <Container maxWidth="lg" disableGutters>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#7B2E2E", mb: 4 }}>
          Buscar Aluno
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Buscar por nome do aluno"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
        />

        {resultados.length === 0 ? (
          <Typography>Nenhum aluno encontrado.</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {resultados.map((r, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: "#7B2E2E",
                  color: "#fff",
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{r.nome}</Typography>
                <Button
                  variant="outlined"
                  sx={{ borderColor: "#fff", color: "#fff" }}
                  onClick={() => navigate(`/sou-form?id=${r.id}`)}
                >
                  Abrir Ficha
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
