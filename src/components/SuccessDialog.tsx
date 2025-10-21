import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircleIcon
              sx={{
                color: theme.palette.success.main,
                fontSize: 28,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              Success!
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Successfully added the date to your calendar!
        </Typography>
        <Typography variant="body2" fontWeight={600} color="primary.main">
          See you on {dateTime}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ pt: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
