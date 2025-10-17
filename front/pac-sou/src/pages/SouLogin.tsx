import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
// import logoCentro from "../assets/logo-catolicasc.png";
import logoTopo from "../assets/logo-catolica.png";

export default function SouLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuário:", usuario, "Senha:", senha);
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-[#F9EFEF] font-[Montserrat] text-[#333] overflow-hidden">
      {/* TOPO */}
      <header className="bg-[#8A1C1C] flex items-center px-10 shadow-md h-[120px] flex-shrink-0">
        <img
          src={logoTopo}
          alt="Católica SC"
          className="h-12 object-contain"
          style={{ maxWidth: "220px" }}
        />
      </header>

      {/* CONTEÚDO CENTRAL */}
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        <Card
          sx={{
            width: 380,
            height: 520,
            backgroundColor: "#8A1C1C",
            color: "#FFFFFF",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            p: 3,
          }}
        >
          {/* LOGO CENTRAL */}
          <div className="bg-white w-full flex justify-center mb-4 rounded-t-xl pt-3 pb-2">
            <img
              src={logoTopo}
              alt="Católica de Santa Catarina"
              className="h-24 object-contain"
              style={{ maxWidth: "260px" }}
            />
          </div>

          {/* TÍTULO */}
          <CardHeader
            title="PORTAL DO ALUNO"
            titleTypographyProps={{
              align: "center",
              fontWeight: "bold",
              letterSpacing: "0.2em",
              fontSize: "1.1rem",
              color: "#FFFFFF",
            }}
            sx={{ p: 0, mb: 2 }}
          />

          {/* CAMPOS */}
          <CardContent sx={{ width: "100%", flex: 1 }}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center w-full"
                style={{ gap: "20px" }} // 👉 espaçamento vertical entre os campos
              >
              <TextField
                label="Usuário"
                variant="filled"
                fullWidth
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "#EAAE3C" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#F2F2F2",
                  borderRadius: "8px",
                  "& .MuiFilledInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#F2F2F2",
                    "&:before": { borderBottom: "1px solid #EAAE3C" },
                    "&:hover:before": { borderBottom: "2px solid #C9971A" },
                    "&.Mui-focused:after": {
                      borderBottom: "2px solid #8A1C1C",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#8A1C1C",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#8A1C1C",
                  },
                }}
              />

              <TextField
                label="Senha"
                type="password"
                variant="filled"
                fullWidth
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon style={{ color: "#EAAE3C" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#F2F2F2",
                  borderRadius: "8px",
                  "& .MuiFilledInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#F2F2F2",
                    "&:before": { borderBottom: "1px solid #EAAE3C" },
                    "&:hover:before": { borderBottom: "2px solid #C9971A" },
                    "&.Mui-focused:after": {
                      borderBottom: "2px solid #8A1C1C",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#8A1C1C",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#8A1C1C",
                  },
                }}
              />

              {/* BOTÃO */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#A32929",
                  color: "#FFFFFF",
                  fontWeight: "600",
                  borderRadius: "8px",
                  textTransform: "none",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#8C2222",
                  },
                }}
              >
                ACESSAR
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
