import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";

interface FormMenuProps {
  onNavigate?: (route: string) => void;
}

export const FormMenu: React.FC<FormMenuProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* 🔹 Ícone do menu — agora alinhado com os demais */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: menuOpen ? "flex-start" : "center",
          gap: 2,
          px: menuOpen ? 3 : 0,
          py: 1.5,
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#A32929",
          },
        }}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: menuOpen ? "28px" : "100%",
          }}
        >
          <MenuIcon sx={{ color: "#fff", fontSize: 28 }} />
        </Box>
        {menuOpen && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            Menu
          </Typography>
        )}
      </Box>

      {/* 🔹 Itens do menu */}
      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <MenuItem
          icon={<PersonIcon />}
          label="Alunos"
          open={menuOpen}
          onClick={() => onNavigate?.("/alunos")}
        />
        <MenuItem
          icon={<SchoolIcon />}
          label="Coordenadores"
          open={menuOpen}
          onClick={() => onNavigate?.("/coordenadores")}
        />
        <MenuItem
          icon={<HistoryIcon />}
          label="Histórico"
          open={menuOpen}
          onClick={() => onNavigate?.("/historico")}
        />
      </Box>
    </Box>
  );
};

/* 🔹 Subcomponente MenuItem */
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
}) => {
  return (
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
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#A32929",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: open ? "28px" : "100%",
        }}
      >
        {icon}
      </Box>

      {open && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};
