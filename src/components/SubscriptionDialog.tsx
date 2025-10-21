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
import CreditCardIcon from "@mui/icons-material/CreditCard";

interface SubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  planTitle: string;
}

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  open,
  onClose,
  planTitle,
}) => {
  const theme = useTheme();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const subscriptionPlans = [
    { id: "basic", name: "Basic Plan", price: "RM 29/month", features: "5 dates per month" },
    { id: "premium", name: "Premium Plan", price: "RM 49/month", features: "Unlimited dates + priority matching" },
    { id: "vip", name: "VIP Plan", price: "RM 99/month", features: "Unlimited dates + VIP support + exclusive events" },
  ];

  const handleSubscribe = () => {
    if (!selectedPlan || !paymentMethod) {
      alert("Please select a plan and payment method!");
      return;
    }
    
    console.log("Subscription:", { selectedPlan, paymentMethod, planTitle });
    alert("Subscription successful! Welcome to our premium service!");
    onClose();
    
    // Reset form
    setSelectedPlan("");
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
            <CreditCardIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: 28,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              Subscribe to Premium
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Unlock unlimited access to "{planTitle}" and all our premium features!
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Choose Your Plan</InputLabel>
          <Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            label="Choose Your Plan"
          >
            {subscriptionPlans.map((plan) => (
              <MenuItem key={plan.id} value={plan.id}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {plan.name} - {plan.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {plan.features}
                  </Typography>
                </Box>
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
          label="Promo Code (Optional)"
          fullWidth
          placeholder="Enter promo code"
          variant="outlined"
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
          onClick={handleSubscribe}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Subscribe Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog;
