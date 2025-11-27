import React from "react";
import { Dialog, DialogContent, DialogActions, Typography, Button } from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const SuccessDialog: React.FC<Props> = ({ open, title, message, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      style: { borderRadius: "8px", padding: "10px 20px", textAlign: "center" },
    }}
    BackdropProps={{
      style: { backgroundColor: "rgba(0,0,0,0.4)" },
    }}
  >
    <DialogContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
      <Button
        variant="contained"
        onClick={onClose}
        sx={{
          backgroundColor: "#8A1C1C",
          "&:hover": { backgroundColor: "#6E1616" },
          width: 100,
        }}
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
