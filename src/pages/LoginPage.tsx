import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { LoginParams, postLogin } from "../api";
import loginBg from "../assets/login-bg.jpeg";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useAppMutation } from "../hooks/useAppMutation";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = useAppMutation(postLogin);

  const onSubmit = async (data: LoginParams) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await login(data);

      // Redirect to intended page or admin dashboard
      const from = location.state?.from?.pathname || "/";
      if (data.email === "admin@admin.com") {
        navigate("/admin/blog-list");
      } else {
        navigate(from);
      }
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "dark.main",
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: 1100,
          width: "100%",
          border: (t) => `1px solid ${t.palette.divider}`,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "light.light",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            minHeight: 520,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${loginBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              color: "#fff",
              p: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: 1,
            }}
          >
            <Typography variant="h4" fontWeight={800} mb={1}>
              Create your Account
            </Typography>
            <Typography variant="body1">
              Share your artwork and Get projects!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 6 }, bgcolor: "#fff" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: 100, cursor: "pointer" }}
              onClick={() => navigate(`/`)}
            />
            <Link href="/sign-up" underline="none">
              <Typography variant="body2" color="text.secondary">
                Don't have an account? <b>Sign up</b>
              </Typography>
            </Link>
          </Box>
          <Typography variant="h3" fontWeight={800} mb={3}>
            Sign In
          </Typography>

          {/* Error Message */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* Admin Login Info */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Admin Login:</strong> admin@admin.com / admin123
            </Typography>
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                {...register("email")}
                placeholder="Email address"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
              />
              <TextField
                {...register("password")}
                placeholder="Password"
                type="password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
            <Box
              mt={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link href="#" underline="none">
                <Typography variant="body2" color="text.secondary">
                  Forgot Password?
                </Typography>
              </Link>
              <Link href="/" underline="none">
                <Typography variant="body2" color="text.secondary">
                  Back Home
                </Typography>
              </Link>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
