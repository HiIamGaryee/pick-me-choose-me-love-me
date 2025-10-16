import React, { useEffect, useState } from "react";
import { Fab, Zoom, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const ScrollToTopButton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.5;
      setVisible(window.scrollY > triggerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMobile) return null;

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.light.main,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <KeyboardArrowUpRoundedIcon fontSize="large" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
