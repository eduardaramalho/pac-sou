import React from "react";
import { Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material";
import type { SouFormData } from "../helpers/types";

interface Props {
  form: SouFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AtendimentoForm: React.FC<Props> = ({ form, errors, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Card className="shadow-md border border-gray-200" sx={{ p: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Atendimento
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Observações"
              name="observacoes"
              value={form.observacoes}
              onChange={onChange}
              error={!!errors.observacoes}
              helperText={errors.observacoes}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nome do profissional"
              name="profissional"
              value={form.profissional}
              onChange={onChange}
              error={!!errors.profissional}
              helperText={errors.profissional}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 4,
            backgroundColor: "#8A1C1C",
            "&:hover": { backgroundColor: "#6E1616" },
          }}
        >
          SALVAR ATENDIMENTO
        </Button>
      </CardContent>
    </Card>
  </form>
);
