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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SignUpParams, postSignUp } from "../api";
import loginBg from "../assets/signup-bg.jpeg";
import { useAppMutation } from "../hooks/useAppMutation";

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Password confirmation is required"),
    mobile_no: Yup.string().required("Mobile number is required"),
    mobile_prefix_no: Yup.string().required("Mobile prefix is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpParams>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = useAppMutation(postSignUp);

  const onSubmit = (data: SignUpParams) => {
    try {
      // Check if email already exists in localStorage
      const existingMembers = JSON.parse(
        localStorage.getItem("members") || "[]"
      );
      const emailExists = existingMembers.some(
        (member: any) => member.email === data.email
      );

      if (emailExists) {
        setErrorMessage("Email already exists. Please use a different email.");
        setSuccessMessage("");
        return;
      }

      // Create new member object
      const newMember = {
        id: "member-" + Date.now(),
        email: data.email,
        password: data.password,
        mobile_no: data.mobile_no,
        mobile_prefix_no: data.mobile_prefix_no,
        createdAt: new Date().toISOString(),
      };

      // Add to localStorage
      existingMembers.push(newMember);
      localStorage.setItem("members", JSON.stringify(existingMembers));

      // Show success message
      setSuccessMessage("Account created successfully! You can now login.");
      setErrorMessage("");
      reset();

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={12} md={7} sx={{ h: 1 }} />

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            alignitem: { xs: "center", md: "start" },
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "auto",
              width: 120,
              cursor: "pointer",
              objectFit: "cover",
            }}
          />

          <Box>
            <Typography variant="h4" color="light.main">
              Create New Account !
            </Typography>
            <Link href="/login" underline="none">
              <Typography variant="body2" color="light.main" pb={4}>
                Already A Member?{" "}
                <span style={{ color: "#e2994f", fontWeight: "bold" }}>
                  Log in
                </span>
              </Typography>
            </Link>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Success/Error Messages */}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Stack spacing={4}>
              <TextField
                {...register("email")}
                placeholder="Email address"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                {...register("password")}
                placeholder="Password"
                type="password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                {...register("password_confirmation")}
                placeholder="Confirm Password"
                type="password"
                fullWidth
                error={Boolean(errors.password_confirmation)}
                helperText={
                  errors.password_confirmation
                    ? errors.password_confirmation.message
                    : ""
                }
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                {...register("mobile_prefix_no")}
                placeholder="Mobile Prefix"
                fullWidth
                error={Boolean(errors.mobile_prefix_no)}
                helperText={
                  errors.mobile_prefix_no ? errors.mobile_prefix_no.message : ""
                }
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                {...register("mobile_no")}
                placeholder="Mobile Number"
                fullWidth
                error={Boolean(errors.mobile_no)}
                helperText={errors.mobile_no ? errors.mobile_no.message : ""}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
              >
                Sign Up
              </Button>
            </Stack>
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link href="#" underline="none">
                <Typography
                  variant="body2"
                  color="light.main"
                  textAlign="center"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password ?
                </Typography>
              </Link>
              <Link href="/" underline="none">
                <Typography
                  variant="body2"
                  color="light.main"
                  sx={{ cursor: "pointer" }}
                >
                  Back Home
                </Typography>
              </Link>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} md={1} sx={{ h: 1 }} />
      </Grid>
    </Box>
  );
};

export default SignUpPage;
