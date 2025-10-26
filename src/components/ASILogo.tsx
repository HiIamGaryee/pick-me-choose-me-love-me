import PsychologyIcon from "@mui/icons-material/Psychology";
import { Box, Typography, TypographyProps, useTheme } from "@mui/material";
import React from "react";

interface ASILogoProps {
  variant?: "full" | "compact" | "icon";
  showText?: boolean;
  size?: "small" | "medium" | "large";
}

const ASILogo: React.FC<ASILogoProps> = ({
  variant = "full",
  showText = true,
  size = "medium",
}) => {
  const theme = useTheme();

  const sizeConfig: Record<
    "small" | "medium" | "large",
    { icon: number; text: TypographyProps["variant"] }
  > = {
    small: { icon: 16, text: "caption" },
    medium: { icon: 24, text: "body2" },
    large: { icon: 32, text: "h6" },
  };

  const config = sizeConfig[size];

  if (variant === "icon") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: config.icon + 8,
          height: config.icon + 8,
          borderRadius: "50%",
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <PsychologyIcon sx={{ fontSize: config.icon }} />
      </Box>
    );
  }

  if (variant === "compact") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: config.icon + 8,
            height: config.icon + 8,
            borderRadius: "50%",
            bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <PsychologyIcon sx={{ fontSize: config.icon }} />
        </Box>
        {showText && (
          <Typography variant={config.text} fontWeight={600}>
            ASI
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: config.icon + 8,
          height: config.icon + 8,
          borderRadius: "50%",
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <PsychologyIcon sx={{ fontSize: config.icon }} />
      </Box>
      {showText && (
        <Box>
          <Typography variant={config.text} fontWeight={600}>
            Artificial Superintelligence Alliance
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by ASI
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ASILogo;
