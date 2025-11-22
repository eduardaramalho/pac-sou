import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
} from "@mui/material";
import type { SouFormData } from "../helpers/types";

interface Props {
  form: SouFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
   disabled?: boolean
}

export const IdentificationForm: React.FC<Props> = ({ form, errors, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Card className="shadow-md border border-gray-200" sx={{ mb: 6, p: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Identificação
        </Typography>

        {/* Nome, Idade, Data */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={onChange}
              error={!!errors.nome}
              helperText={errors.nome}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Idade"
              name="idade"
              value={form.idade}
              onChange={onChange}
              error={!!errors.idade}
              helperText={errors.idade}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={onChange}
              error={!!errors.dataNascimento}
              helperText={errors.dataNascimento}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {/* Curso / Fase / Turno */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Curso"
              name="curso"
              value={form.curso}
              onChange={onChange}
              error={!!errors.curso}
              helperText={errors.curso}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Fase"
              name="fase"
              value={form.fase}
              onChange={onChange}
              error={!!errors.fase}
              helperText={errors.fase}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl error={!!errors.turno}>
              <FormLabel>Turno</FormLabel>
              <RadioGroup row name="turno" value={form.turno} onChange={onChange}>
                <FormControlLabel value="Matutino" control={<Radio />} label="Matutino" />
                <FormControlLabel value="Vespertino" control={<Radio />} label="Vespertino" />
                <FormControlLabel value="Noturno" control={<Radio />} label="Noturno" />
              </RadioGroup>
              {errors.turno && (
                <Typography color="error" variant="caption">
                  {errors.turno}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* Dificuldade */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Fale sobre a sua dificuldade"
            name="dificuldade"
            value={form.dificuldade}
            onChange={onChange}
            error={!!errors.dificuldade}
            helperText={errors.dificuldade}
            fullWidth
            multiline
            rows={3}
            required
          />
        </Grid>

        {/* Preferência e horário */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <FormControl required error={!!errors.preferencia}>
              <FormLabel>Preferência no atendimento</FormLabel>
              <RadioGroup row name="preferencia" value={form.preferencia} onChange={onChange}>
                <FormControlLabel value="presencial" control={<Radio />} label="Presencial" />
                <FormControlLabel value="online" control={<Radio />} label="Online" />
              </RadioGroup>
              {errors.preferencia && (
                <Typography color="error" variant="caption">
                  {errors.preferencia}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Horário (HH:MM)"
              name="horario"
              value={form.horario}
              onChange={onChange}
              error={!!errors.horario}
              helperText={errors.horario}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Data"
              name="data"
              type="date"
              value={form.data}
              onChange={onChange}
              error={!!errors.data}
              helperText={errors.data}
              InputLabelProps={{ shrink: true }}
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
          SALVAR FORMULÁRIO
        </Button>
      </CardContent>
    </Card>
  </form>
);
