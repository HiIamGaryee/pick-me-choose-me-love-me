import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  EmailSubscribeParams,
  postEmailSubscribe,
} from "../../api/postEmailSubscribe";
import { useAppMutation } from "../../hooks/useAppMutation";

const footerLinks = [
  {
    title: "SITEMAP",
    links: [
      { name: "About us", link: "/about-us" },
      { name: "Services", link: "#" },
      // { name: "Blog", link: "/blog" },
      { name: "Upcoming Events", link: "#" },
    ],
  },
  {
    title: "HELP",
    links: [
      // { name: "Getting started", link: "/getting-started" },
      { name: "Package", link: "/package" },
      { name: "FAQ", link: "/faq" },
      { name: "Referral", link: "/referral" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailSubscribeParams>({
    resolver: yupResolver(validationSchema),
  });

  // const { mutate } = useAppMutation(postEmailSubscribe);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, reset } = useAppMutation(postEmailSubscribe, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const onSubmit = (data: EmailSubscribeParams) => {
    mutate(data);
  };

  return (
    // <Box>OI</Box>
    <Box
      component="footer"
      sx={{
        position: "relative",
        backgroundColor: (t) => t.palette.secondary.main,
        padding: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: (t) => t.palette.common.white,
        flexWrap: "wrap",
      }}
    >
      {/* Scalloped top border */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: -24,
          left: 0,
          right: 0,
          height: 24,
          backgroundImage: (t) =>
            `radial-gradient(12px 12px at 12px 24px, ${t.palette.light.main} 12px, transparent 13px)`,
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top left",
          pointerEvents: "none",
        }}
      />
      {/* Scalloped bottom border */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: -24,
          left: 0,
          right: 0,
          height: 24,
          backgroundImage: (t) =>
            `radial-gradient(12px 12px at 12px 0px, ${t.palette.light.main} 12px, transparent 13px)`,
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom left",
          pointerEvents: "none",
        }}
      />
      {footerLinks.map((section) => (
        <Box key={section.title} sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            variant="h6"
            sx={{ mt: 4, color: (t) => t.palette.common.white }}
          >
            {section.title}
          </Typography>
          {section.links.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: (t) => t.palette.light.light,
                  mb: 1,
                  "&:hover": {
                    color: (t) => t.palette.info.light,
                  },
                }}
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Box>
      ))}

      {/* <Box sx={{ flex: 1, minWidth: 200, mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: (t) => t.palette.common.white }}
        >
          SUBSCRIBE
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              variant="outlined"
              {...register("email")}
              helperText={errors.email?.message}
              size="small"
              placeholder="Enter email address"
              sx={{
                backgroundColor: (t) => t.palette.light.light,
                borderRadius: 999,
                flex: 1,
                marginRight: 1,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: (t) => t.palette.primary.main,
                color: (t) => t.palette.common.white,
                borderRadius: 999,
                px: 3,
              }}
            >
              SEND
            </Button>
          </Box>
        </form>
        {showSuccess && (
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              bottom: 120,
              right: 16,
              padding: 2,
              borderRadius: "12px",
            }}
          >
            🚀 Successfully submitted!
          </Paper>
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Facebook</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Twitter</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">LinkedIn</Typography>
          </Link>
        </Box>
      </Box> */}
      <Box sx={{ width: "100%", mt: 4, textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: (t) => t.palette.common.white }}
        >
          © 2024 All rights reserved by Pick Me, Choose Me, Love Me Sdn Bhd.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
