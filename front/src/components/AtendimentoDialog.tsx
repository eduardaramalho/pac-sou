import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  atendimento: any | null;
  onClose: () => void;
}

export function AtendimentoDialog({ atendimento, onClose }: Props) {
  if (!atendimento) return null;

  return (
    <Dialog open={Boolean(atendimento)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#7B2E2E" }}>
        Detalhes do Atendimento
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {Object.entries(atendimento).map(([key, value]) => (
            <Typography key={key} variant="body2">
              <strong>{key}:</strong> {String(value) || "—"}
            </Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#7B2E2E" }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
