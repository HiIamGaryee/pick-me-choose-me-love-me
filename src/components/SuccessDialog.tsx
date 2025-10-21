import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  dateTime: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  dateTime,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 0,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      {/* Confetti Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {/* Confetti shapes */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: Math.random() * 12 + 8,
              height: Math.random() * 12 + 8,
              backgroundColor: [
                "#4CAF50", // Green
                "#2196F3", // Blue
                "#FFEB3B", // Yellow
                "#FFFFFF", // White
                "#E91E63", // Pink
              ][Math.floor(Math.random() * 5)],
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.8,
              animation: `confettiFall ${
                2 + Math.random() * 3
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </Box>

      <DialogContent
        sx={{
          p: 4,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "white",
              fontSize: 40,
            }}
          />
        </Box>

        {/* Success Message */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "#333",
            mb: 2,
            fontSize: "1.75rem",
          }}
        >
          Success!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 1,
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          Successfully added the date to your calendar!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#888",
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          See you on {dateTime}
        </Typography>

        {/* Action Button */}
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "white",
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#333",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            },
          }}
        >
          Your dashboard
        </Button>
      </DialogContent>

      {/* CSS Animation for confetti */}
      <style>
        {`
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </Dialog>
  );
};

export default SuccessDialog;
