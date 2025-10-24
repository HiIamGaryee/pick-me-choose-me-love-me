import { Add as AddIcon } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Fab,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableCard from "../../components/SwipeableCard";
import { useSalesContext } from "../../context/sales-context";
import Layout from "../../Layout";
import DatePlanCard from "./components/DatePlanCard";
import { dateData } from "./data/dateData";

const SalesPage = () => {
  const { newlyAddedSales } = useSalesContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [likedPlans, setLikedPlans] = useState<string[]>([]);
  const [passedPlans, setPassedPlans] = useState<string[]>([]);

  // Combine existing data with newly added sales
  const allSales = [...newlyAddedSales, ...dateData];

  const handleAddNewPlan = () => {
    navigate("/add-sales");
  };

  const handleSwipeRight = (planId: string) => {
    setLikedPlans((prev) => [...prev, planId]);
    console.log("Liked plan:", planId);
  };

  const handleSwipeLeft = (planId: string) => {
    setPassedPlans((prev) => [...prev, planId]);
    console.log("Passed plan:", planId);
  };

  // Filter out passed plans for mobile swipe view
  const availablePlans = allSales.filter(
    (plan) => !passedPlans.includes(plan.plan_id)
  );

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, md: 4 } }}
      >
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 1,
              fontSize: { xs: "1.75rem", sm: "2.125rem", md: "2.5rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Date Plans
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Discover amazing date ideas and connect with like-minded people
          </Typography>
        </Box>

        {/* Newly Added Plans Section */}
        {newlyAddedSales.length > 0 && (
          <>
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  color: theme.palette.primary.main,
                }}
              >
                Your Newly Added Plans
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {newlyAddedSales.map((plan) => (
                  <Grid item xs={12} sm={6} lg={4} key={plan.plan_id}>
                    <DatePlanCard plan={plan} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />
          </>
        )}

        {/* All Available Plans Section */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mb: 2,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: theme.palette.text.primary,
            }}
          >
            {newlyAddedSales.length > 0
              ? "All Available Plans"
              : "Available Date Plans"}
          </Typography>

          {/* Mobile Swipe View vs Desktop Grid View */}
          {isMobile ? (
            <Box sx={{ minHeight: "60vh", position: "relative" }}>
              {availablePlans.slice(0, 3).map((plan, index) => (
                <Box
                  key={plan.plan_id}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: availablePlans.length - index,
                    transform: `translateY(${index * 8}px) scale(${
                      1 - index * 0.05
                    })`,
                  }}
                >
                  <SwipeableCard
                    onSwipeRight={() => handleSwipeRight(plan.plan_id)}
                    onSwipeLeft={() => handleSwipeLeft(plan.plan_id)}
                    leftAction="Pass"
                    rightAction="Like"
                  >
                    <DatePlanCard plan={plan} />
                  </SwipeableCard>
                </Box>
              ))}

              {availablePlans.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "40vh",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    No more plans to swipe!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check back later for new date ideas
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            /* Desktop Grid View */
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {allSales.map((plan) => (
                <Grid item xs={12} sm={6} lg={4} key={plan.plan_id}>
                  <DatePlanCard plan={plan} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Floating Action Button for Mobile */}
        <Fab
          color="primary"
          aria-label="add new plan"
          onClick={handleAddNewPlan}
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            zIndex: 1000,
            background:
              "linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #fbbf24 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #7c3aed 100%)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Layout>
  );
};

export default SalesPage;
