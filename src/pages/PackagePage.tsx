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
    surface: "#e7eae5",
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
          background:
            "linear-gradient(90deg, #E6E1FF 0%, #D4C4FF 40%, #A580FF 100%)",
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
          {PRICING_PLANS.map((plan) => {
            const isHighlight = plan.id === "ai";

            return (
              <Grid item xs={12} md={4} key={plan.id}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 0,
                    p: 3,
                    border: isHighlight
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                    background: isHighlight
                      ? "linear-gradient(180deg, #16A34A 0%, #15803D 60%, #14532D 100%)"
                      : theme.palette.background.paper,
                    color: isHighlight
                      ? theme.palette.common.white
                      : theme.palette.text.primary,
                    boxShadow: isHighlight
                      ? "0 18px 40px rgba(22, 163, 74, 0.35)"
                      : "0 3px 8px rgba(15,23,42,0.08)",
                    transition: "0.25s",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isHighlight
                        ? "0 22px 55px rgba(22, 163, 74, 0.45)"
                        : "0 10px 24px rgba(15,23,42,0.14)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: isHighlight
                          ? "rgba(255,255,255,0.8)"
                          : "text.secondary",
                        fontWeight: 600,
                      }}
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
                        color: isHighlight
                          ? "rgba(255,255,255,0.85)"
                          : "text.secondary",
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
                              color: isHighlight
                                ? theme.palette.success.light
                                : theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: isHighlight
                                ? "rgba(255,255,255,0.9)"
                                : "text.primary",
                            }}
                          >
                            {f}
                          </Typography>
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
                        bgcolor: isHighlight
                          ? "rgba(15,118,110,0.15)"
                          : `${plan.chipColor}.main`,
                        color: isHighlight
                          ? theme.palette.common.white
                          : `${plan.chipColor}.contrastText`,
                      }}
                    >
                      {plan.chip}
                    </Box>

                    {/* Subscribe gradient bar */}
                    <Box
                      sx={{
                        mt: 3,
                        borderRadius: 999,
                        py: 1.1,
                        textAlign: "center",
                        fontWeight: 600,
                        background: isHighlight
                          ? "linear-gradient(90deg, #22C55E 0%, #16A34A 50%, #4ADE80 100%)"
                          : "linear-gradient(90deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)",
                        color: isHighlight
                          ? theme.palette.common.white
                          : theme.palette.text.primary,
                        cursor: "pointer",
                      }}
                    >
                      Subscribe this plan
                    </Box>
                  </CardContent>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
};

export default PackagePage;
