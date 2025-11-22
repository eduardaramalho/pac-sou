import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const formatDate = (date: string) => {
  if (!date) return "—";
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return date;
  return `${d}/${m}/${y}`;
};

const formatIsoDate = (iso: string) => {
  if (!iso) return "—";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "—";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const capitalize = (text: string) => {
  if (!text) return "—";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const InfoLine = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value: any;
  full?: boolean;
}) => (
  <Box sx={{ gridColumn: full ? "span 2" : "span 1", mb: 1 }}>
    <Typography sx={{ fontWeight: 600, color: "#444" }}>{label}:</Typography>
    <Typography sx={{ mt: "2px" }}>{value || "—"}</Typography>
  </Box>
);

interface Props {
  item: any;
  onOpen: (item: any) => void;
  onDownloadPdf: (item: any) => void;
}

export default function HistoryCard({ item, onOpen, onDownloadPdf }: Props) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#6D2323",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          mb: 2,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "#5A1D1D",
          },
        }}
        onClick={() => onOpen(item)}
      >
        <Box>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {item.nome}
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            {item.profissional || "—"}
          </Typography>

          <Typography sx={{ opacity: 0.7 }}>
            {formatIsoDate(item.data)}
          </Typography>
        </Box>

        <PictureAsPdfIcon
          sx={{ fontSize: 32, cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onDownloadPdf(item);
          }}
        />
      </Box>
    </>
  );
}
