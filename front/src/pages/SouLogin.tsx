import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import logoTopo from "../assets/logo-catolica.png";
import { login } from "../helpers/authStorage";

export default function SouLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'formId']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = usuario.trim().toLowerCase();
    const pass = senha.trim();
    const userData = await login(user, pass)
    setCookie('token', userData?.token, { path: '/' });
    // 🔹 Validação de usuário + senha
    console.log(userData?.role);
    if (userData?.role === "professor") {
      localStorage.setItem("perfil", "professor");
      localStorage.setItem("usuario", usuario);
      navigate("/historico");
    } else if (userData?.role === "aluno") {
      localStorage.setItem("perfil", "aluno");
      localStorage.setItem("usuario", usuario);
      navigate("/sou-form");
    } else {
      alert("Usuário ou senha inválidos.");
    }
  };
  useEffect(() => {
    // Limpar token ao carregar a página de login
    removeCookie('formId');
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F9EFEF", fontFamily: "Montserrat, sans-serif" }}
    >
      {/* 🔹 TOPO */}
      <header className="bg-[#8A1C1C] py-4 px-6 flex items-center shadow-md">
        <img
          src={logoTopo}
          alt="Católica SC"
          className="h-10 object-contain"
          style={{ maxWidth: "180px" }}
        />
      </header>

      {/* 🔹 CONTEÚDO CENTRAL */}
      <main className="flex-1 flex items-center justify-center">
        <Card
          elevation={12}
          sx={{
            backgroundColor: "#8A1C1C",
            borderRadius: "16px",
            padding: "40px 32px",
            width: "400px",
            height: "460px",
            textAlign: "center",
            color: "white",
          }}
        >
          {/* 🔸 LOGO CENTRAL */}
          <div className="flex justify-center mb-6">
            <img
              src={logoTopo}
              alt="Católica de Santa Catarina"
              style={{ height: "100px", objectFit: "contain" }}
            />
          </div>

          {/* 🔸 TÍTULO */}
          <h2 className="text-[#FFFFFF] font-bold text-xl tracking-[0.2em] mb-6">
            PORTAL DO ALUNO
          </h2>

          {/* 🔸 FORMULÁRIO */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full"
            style={{ gap: "20px" }}
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
                maxWidth: 320,
                alignSelf: "center",
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                "& .MuiFilledInput-root": {
                  borderRadius: "8px",
                  "&:before": { borderBottom: "1px solid #EAAE3C" },
                  "&:hover:before": { borderBottom: "2px solid #C9971A" },
                  "&.Mui-focused:after": { borderBottom: "2px solid #EAAE3C" },
                },
                "& .MuiInputLabel-root": {
                  color: "#8A1C1C",
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
                maxWidth: 320,
                alignSelf: "center",
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                "& .MuiFilledInput-root": {
                  borderRadius: "8px",
                  "&:before": { borderBottom: "1px solid #EAAE3C" },
                  "&:hover:before": { borderBottom: "2px solid #C9971A" },
                  "&.Mui-focused:after": { borderBottom: "2px solid #EAAE3C" },
                },
                "& .MuiInputLabel-root": {
                  color: "#8A1C1C",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#8A1C1C",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                maxWidth: 320,
                alignSelf: "center",
                backgroundColor: "#A32929",
                color: "#FFFFFF",
                fontWeight: "600",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#8C2222",
                },
              }}
            >
              ACESSAR
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
