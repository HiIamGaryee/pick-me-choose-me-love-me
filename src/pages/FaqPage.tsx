import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../Layout";

// =========================
// FAQ DATA
// =========================
const faqListGeneral = [
  {
    question: "What is Pick Me Choose Me Love Me?",
    answer:
      "It’s a blind-date app where users post date plans instead of profile pictures. You match by ideas and vibes, not looks.",
  },
  {
    question: "How does it work?",
    answer:
      "You post one date plan, browse others’ plans, pick one that fits your vibe, and go on a real-world date. Afterward, both rate the experience.",
  },
  {
    question: "Why can I only post one plan?",
    answer:
      "Because commitment builds better connections. One plan keeps things intentional, not chaotic.",
  },
  {
    question: "Can I change my plan?",
    answer:
      "Yes, up to three times for free. After that, you’ll need tokens to edit or delete it.",
  },
  {
    question: "What are tokens?",
    answer:
      "Tokens are the app’s in-app currency. You use them to edit, delete, or refresh your date plans.",
  },
];

const faqListBilling = [
  {
    question: "How much does one token cost?",
    answer: "Each token costs RM5. Deleting a plan requires three tokens.",
  },
  {
    question: "How much is the AI plan subscription?",
    answer:
      "RM45 per month gives you personalized date plan recommendations and vibe analysis.",
  },
  {
    question: "Can I report a user or plan?",
    answer:
      "Yes. Every plan and user has a report button. We take safety and respect seriously.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes. Go to Settings → Account → Delete. We’ll miss you, but we get it.",
  },
  {
    question: "What makes Pick Me Choose Me Love Me different?",
    answer:
      "We don’t match faces — we match souls, humor, and actual date plans.",
  },
];

// =========================
// COMPONENT
// =========================
const FaqPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderFaqList = (list: any[], category: string) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 4,
        mb: 10,
        maxWidth: 1000,
        mx: "auto",
        px: 2,
      }}
    >
      {/* LEFT TITLE SIDE */}
      <Box sx={{ flex: isMobile ? "none" : "0 0 250px" }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Everything you need to know. Can’t find an answer?{" "}
          <a
            href="/contact"
            style={{
              color: theme.palette.primary.main,
              textDecoration: "underline",
            }}
          >
            Chat to our team
          </a>
          .
        </Typography>
      </Box>

      {/* RIGHT ACCORDION SIDE */}
      <Box sx={{ flex: 1 }}>
        {list.map((faq, index) => {
          const isOpen = expanded === `panel-${category}-${index}`;
          return (
            <Accordion
              key={index}
              expanded={isOpen}
              onChange={handleChange(`panel-${category}-${index}`)}
              sx={{
                mb: 1,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 0,
                boxShadow: "none",
                "&::before": { display: "none" },
                borderTop: `1px solid ${theme.palette.divider}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <IconButton size="small">
                    {isOpen ? (
                      <RemoveIcon sx={{ color: theme.palette.primary.main }} />
                    ) : (
                      <AddIcon sx={{ color: theme.palette.primary.main }} />
                    )}
                  </IconButton>
                }
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: theme.palette.dark.main,
          color: theme.palette.light.main,
          textAlign: "center",
          py: { xs: 8, md: 10 },
          px: 2,
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2} color="light.main">
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" color="lightgray" maxWidth={600} mx="auto">
          Need help with something? Here are our most frequently asked
          questions.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.light.main,
          py: { xs: 6, md: 10 },
        }}
      >
        {renderFaqList(faqListGeneral, "General FAQs")}
        {renderFaqList(faqListBilling, "Billing FAQs")}
      </Box>

      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            backgroundColor: theme.palette.dark.main,
            color: theme.palette.light.main,
            textAlign: "center",
            py: { xs: 6, md: 10 },
            px: 2,
            borderRadius: "24px",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={1} color="light.main">
            Still have questions?
          </Typography>
          <Typography variant="body2" color="lightgray" mb={3}>
            Join over 4,000 singles already finding love with Pick Me Choose Me
            Love Me.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mx: 1,
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: "12px",
              }}
            >
              Learn More
            </Button>
            <Button
              variant="outlined"
              sx={{
                mx: 1,
                px: 3,
                py: 1,
                borderRadius: "12px",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FaqPage;
