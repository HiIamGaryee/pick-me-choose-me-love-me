import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../Layout";
import { CheckoutParams, postCheckout } from "../../api/admin";
import { useAppMutation } from "../../hooks/useAppMutation";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(c);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [cart]
  );

  const { mutate, reset } = useAppMutation(postCheckout, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setCart([]);
      localStorage.removeItem("cart");
    },
  });

  const handleCheckout = () => {
    const payload: CheckoutParams = {
      shipping: "0",
      total: subtotal.toFixed(2),
      address,
      mobile,
      email,
      status: "pending",
      products: cart.map((p) => ({
        code: p.code,
        price: String(p.price),
        quantity: p.quantity,
      })),
    };
    mutate(payload);
  };

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Items
                </Typography>
                <Stack spacing={1}>
                  {cart.length === 0 ? (
                    <Typography color="text.secondary">
                      Your cart is empty.
                    </Typography>
                  ) : (
                    cart.map((it) => (
                      <Box
                        key={it.code}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          {it.name} x {it.quantity}
                        </Typography>
                        <Typography>
                          ${(it.price * it.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Delivery Details
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Typography sx={{ mt: 2 }}>
                  Subtotal: ${subtotal.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {showSuccess && (
          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              p: 2,
              borderRadius: 2,
            }}
          >
            ✅ Checkout completed
          </Paper>
        )}
      </Box>
    </Layout>
  );
};

export default CheckoutPage;
