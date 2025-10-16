import { Box, Button, Typography } from "@mui/material";
import RippleGrid from "../RippleGrid";

const LandingBannerSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <RippleGrid gridColor="#ffffff" rippleIntensity={0.06} opacity={0.8} />
      </Box>

      <Box sx={{ zIndex: 1 }}>
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Pick Me Choose Me Love Me
        </Typography>
        <Typography variant="h6" mb={4} sx={{ color: "rgba(255,255,255,0.8)" }}>
          Match by ideas, not looks. Let your date plan do the talking.
        </Typography>
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #fbbf24 100%)",
            borderRadius: "10px",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Enter Network
        </Button>
      </Box>
    </Box>
  );
};

export default LandingBannerSection;
