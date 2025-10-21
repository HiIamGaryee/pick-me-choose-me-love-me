import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  CardContent,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../Layout";

// Pricing tiles: Free, Tokens, AI Cupid Plan
export const PRICING_PLANS = [
  {
    id: "free",
    tierLabel: "For starters",
    title: "Free",
    description: "Get productive with essentials. No credit card.",
    chip: "free",
    chipColor: "success",
    surface: "#FFFFFF",
    inverted: false,
    features: [
      "Unlimited tasks",
      "1 list & basic reminders",
      "Community read-only",
    ],
  },
  {
    id: "tokens",
    tierLabel: "Power ups",
    title: "Tokens",
    description: "Buy tokens to unlock pro actions when you need them.",
    chip: "RM5 / token",
    chipColor: "info",
    surface: "#FFE5F6",
    inverted: false,
    features: [
      "Undo/Redo edits with token",
      "Pin tasks & export",
      "Priority queue boosts",
    ],
  },
  {
    id: "ai",
    tierLabel: "Most popular",
    title: "AI Cupid Plan",
    description: "RM45/month for AI that suggests plans you’ll enjoy.",
    chip: "RM45 / month",
    chipColor: "primary",
    surface: "transparent",
    inverted: true,
    bordered: true,
    features: [
      "AI date/task suggestions",
      "1:1 chat prompts",
      "Smart scheduling",
    ],
  },
];

const PackagePage = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#FF4D6D",
          backgroundImage: (t) =>
            `radial-gradient(800px 200px at 0% 100%, ${t.palette.secondary.light}22 0%, transparent 60%), radial-gradient(800px 200px at 100% 0%, ${t.palette.info.light}22 0%, transparent 60%)`,
          p: { xs: 4, md: 8 },
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Plans & Pricing
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6, color: "#fff" }}
        >
          Cancel anytime • Secure payments • No hidden fees
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}></Box>

        {/* Package Cards - from PRICING_PLANS */}
        <Grid container spacing={4} justifyContent="center">
          {PRICING_PLANS.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 0,
                  p: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    {plan.tierLabel}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: "text.secondary",
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {plan.features.map((f: string) => (
                      <Box
                        key={f}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <CheckIcon
                          fontSize="small"
                          sx={{
                            color: "primary.main",
                          }}
                        />
                        <Typography variant="body2">{f}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 2,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: `${plan.chipColor}.main`,
                      color: `${plan.chipColor}.contrastText`,
                    }}
                  >
                    {plan.chip}
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default PackagePage;
