import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function HistorySearchBar({ value, onChange }: Props) {
  return (
    <TextField
      fullWidth
      variant="filled"
      placeholder="Buscar por aluno ou atendimento"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: "#F8F3F3",
        borderRadius: 1,
        "& .MuiFilledInput-root": { borderRadius: 1 },
      }}
    />
  );
}
