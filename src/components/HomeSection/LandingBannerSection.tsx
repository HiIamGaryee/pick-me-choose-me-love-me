import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClickSpark from "../ReactBits/ClickSpark";
import TrueFocus from "../ReactBits/TrueFocus";
import RippleGrid from "../RippleGrid";

const LandingBannerSection = () => {
  const navigate = useNavigate();

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
        <ClickSpark
          sparkColor="#FF7AD9"
          sparkSize={12}
          sparkRadius={25}
          sparkCount={12}
          duration={600}
          easing="ease-out"
          extraScale={1.2}
        >
          <Box sx={{ mb: 2 }}>
            <TrueFocus
              sentence="Pick Me Choose Me Love Me"
              delimiter=" "
              groupSize={2}
              manualMode={false}
              blurAmount={4}
              borderColor="#FF7AD9"
              glowColor="rgba(255, 122, 217, 0.6)"
              animationDuration={0.6}
              pauseBetweenAnimations={0.6}
              textGradient="linear-gradient(90deg, #E40303 0%, #FF8C00 25%, #FFED00 50%, #008026 65%, #004DFF 80%, #750787 100%)"
            />
          </Box>
        </ClickSpark>
        <Typography variant="h6" mb={4} sx={{ color: "rgba(0, 0, 0, 0.8)" }}>
          Match by ideas, not looks. Let your date plan do the talking.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(`/login`)}
          //   onClick={() => navigate(`/signup`)}
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
              background:
                "linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #7c3aed 100%)",
            },
          }}
        >
          Try it now
        </Button>
      </Box>
    </Box>
  );
};

export default LandingBannerSection;
