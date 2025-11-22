import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

interface FormMenuProps {
  onNavigate?: (route: string) => void;
}

export const FormMenu: React.FC<FormMenuProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const perfil = localStorage.getItem("perfil");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: menuOpen ? "flex-start" : "center",
        justifyContent: "flex-start",
        backgroundColor: "#8A1C1C",
        padding: "12px 0",
        width: menuOpen ? "220px" : "80px",
        height: "100vh",
        color: "#fff",
        transition: "all 0.3s ease-in-out",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Botão principal */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: menuOpen ? "flex-start" : "center",
          gap: 2,
          px: menuOpen ? 3 : 0,
          py: 1.5,
          cursor: "pointer",
          "&:hover": { backgroundColor: "#A32929" },
        }}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <MenuIcon sx={{ color: "#fff", fontSize: 28 }} />
        {menuOpen && (
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Menu
          </Typography>
        )}
      </Box>

      {/* Opções dinâmicas */}
      <Box sx={{ mt: 2, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        {perfil === "aluno" && (
          <>
            <MenuItem icon={<PersonIcon />} label="Identificação" open={menuOpen} onClick={() => onNavigate?.("/sou-form")} />
            <MenuItem icon={<HistoryIcon />} label="Meu Histórico" open={menuOpen} onClick={() => onNavigate?.("/historico")} />
          </>
        )}

        {perfil === "professor" && (
          <MenuItem icon={<SearchIcon />} label="Buscar Aluno" open={menuOpen} onClick={() => onNavigate?.("/buscar-aluno")} />
        )}

        <MenuItem icon={<LogoutIcon />} label="Sair" open={menuOpen} onClick={handleLogout} />
      </Box>
    </Box>
  );
};

const MenuItem = ({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick?: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: open ? "flex-start" : "center",
      gap: open ? 2 : 0,
      color: "#fff",
      px: open ? 3 : 0,
      py: 1.5,
      cursor: "pointer",
      "&:hover": { backgroundColor: "#A32929" },
    }}
  >
    {icon}
    {open && (
      <Typography variant="body1" sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
        {label}
      </Typography>
    )}
  </Box>
);
