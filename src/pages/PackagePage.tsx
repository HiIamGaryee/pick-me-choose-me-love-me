import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Layout from "../Layout";
import CheckIcon from "@mui/icons-material/Check";

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
              <Card
                sx={{
                  borderRadius: 6,
                  p: 1,
                  bgcolor: plan.surface,
                  border: plan.bordered ? "2px solid #fff" : "none",
                }}
              >
                <CardContent>
                  <Typography
                    variant="overline"
                    sx={{ color: plan.inverted ? "#fff" : "text.secondary" }}
                  >
                    {plan.tierLabel}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: 1, color: plan.inverted ? "#fff" : "inherit" }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: plan.inverted ? "#fff" : "text.secondary",
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
                            color: plan.inverted ? "#fff" : "primary.main",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: plan.inverted ? "#fff" : "inherit" }}
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
                      bgcolor: `${plan.chipColor}.main`,
                      color: plan.inverted ? "#fff" : "#08121A",
                    }}
                  >
                    {plan.chip}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default PackagePage;
