import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface TopUpDialogProps {
  open: boolean;
  onClose: () => void;
  planTitle: string;
}

const TopUpDialog: React.FC<TopUpDialogProps> = ({
  open,
  onClose,
  planTitle,
}) => {
  const theme = useTheme();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const topUpAmounts = [
    { value: "10", label: "RM 10" },
    { value: "25", label: "RM 25" },
    { value: "50", label: "RM 50" },
    { value: "100", label: "RM 100" },
    { value: "200", label: "RM 200" },
  ];

  const handleTopUp = () => {
    if (!amount || !paymentMethod) {
      alert("Please select an amount and payment method!");
      return;
    }
    
    console.log("Top Up:", { amount, paymentMethod, planTitle });
    alert(`Successfully topped up RM ${amount}! You can now join "${planTitle}".`);
    onClose();
    
    // Reset form
    setAmount("");
    setPaymentMethod("");
  };

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
            <AccountBalanceWalletIcon
              sx={{
                color: theme.palette.success.main,
                fontSize: 28,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              Top Up Wallet
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add credits to your wallet to join "{planTitle}" and other premium dates!
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Amount</InputLabel>
          <Select
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Select Amount"
          >
            {topUpAmounts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Payment Method"
          >
            <MenuItem value="credit">Credit Card</MenuItem>
            <MenuItem value="debit">Debit Card</MenuItem>
            <MenuItem value="ewallet">E-Wallet (GrabPay, Touch 'n Go)</MenuItem>
            <MenuItem value="bank">Bank Transfer</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Custom Amount (Optional)"
          fullWidth
          placeholder="Enter custom amount"
          variant="outlined"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </DialogContent>

      <DialogActions sx={{ pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleTopUp}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Top Up Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TopUpDialog;
