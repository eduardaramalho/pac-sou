import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function CampoUsuario() {
  return (
    <TextField
      label="Usuário"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle style={{ color: "#EAAE3C" }} />
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: "#F9EFEF",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#EAAE3C",
          },
          "&:hover fieldset": {
            borderColor: "#C9971A",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#8A1C1C",
            borderWidth: "2px",
          },
        },
      }}
    />
  );
}
