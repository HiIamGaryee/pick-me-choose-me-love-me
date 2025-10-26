import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionDialog from "../../components/SubscriptionDialog";
import TopUpDialog from "../../components/TopUpDialog";
import { useReviewContext } from "../../context/review-context";
import Layout from "../../Layout";
import DatePlanCard from "./components/DatePlanCard";
import { salesHistoryData, SalesHistoryItem } from "./data/salesHistoryData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`history-tabpanel-${index}`}
      aria-labelledby={`history-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const SalesHistoryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getReviewByPlanId, addReview } = useReviewContext();
  // Removed Web3 hooks - using simple client-side random now
  const [tabValue, setTabValue] = useState(0);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<any>(null);
  const [soulMeetDialogOpen, setSoulMeetDialogOpen] = useState(false);
  const [randomDatePlan, setRandomDatePlan] = useState<any>(null);
  const [canClickSoulMeet, setCanClickSoulMeet] = useState(true);

  // Load user plan from localStorage on component mount and when page becomes active
  const loadUserPlan = () => {
    const storedPlan = localStorage.getItem("userDatePlan");
    if (storedPlan) {
      setUserPlan(JSON.parse(storedPlan));
    } else {
      setUserPlan(null);
    }
  };

  useEffect(() => {
    loadUserPlan();
    checkSoulMeetCooldown();

    // Reload plan when page becomes active (e.g., returning from AddSalesPage)
    const handleFocus = () => {
      loadUserPlan();
      checkSoulMeetCooldown();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Save plan to localStorage
  const savePlanToStorage = (plan: any) => {
    localStorage.setItem("userDatePlan", JSON.stringify(plan));
    setUserPlan(plan);
  };

  // Delete plan from localStorage
  const deletePlanFromStorage = () => {
    localStorage.removeItem("userDatePlan");
    setUserPlan(null);
  };

  // Check if user can click "Today Soul Most Meet U" button (24-hour cooldown)
  const checkSoulMeetCooldown = () => {
    const lastClickTime = localStorage.getItem("soulMeetLastClick");
    if (lastClickTime) {
      const timeDiff = Date.now() - parseInt(lastClickTime);
      const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      setCanClickSoulMeet(timeDiff >= hours24);
    } else {
      setCanClickSoulMeet(true);
    }
  };

  // Handle "Today Soul Most Meet U" button click
  const handleSoulMeetClick = () => {
    if (!canClickSoulMeet) return;

    // Store click time in localStorage
    localStorage.setItem("soulMeetLastClick", Date.now().toString());
    setCanClickSoulMeet(false);

    // Get random date plan from other users
    const otherUsersPlans = salesHistoryData.filter(
      (plan) => plan.status === "upcoming"
    );

    if (otherUsersPlans.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherUsersPlans.length);
      setRandomDatePlan(otherUsersPlans[randomIndex]);
    } else {
      // Fallback to any plan if no upcoming plans
      const randomIndex = Math.floor(Math.random() * salesHistoryData.length);
      setRandomDatePlan(salesHistoryData[randomIndex]);
    }

    setSoulMeetDialogOpen(true);
  };

  // Get remaining cooldown time
  const getRemainingCooldownTime = () => {
    const lastClickTime = localStorage.getItem("soulMeetLastClick");
    if (lastClickTime) {
      const timeDiff = Date.now() - parseInt(lastClickTime);
      const hours24 = 24 * 60 * 60 * 1000;
      const remainingTime = hours24 - timeDiff;

      if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor(
          (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
        );
        return `${hours}h ${minutes}m`;
      }
    }
    return null;
  };

  // Navigate to add/edit plan page
  const handleAddEditPlan = () => {
    if (userPlan) {
      // Edit existing plan
      navigate("/add-sales", { state: { editPlan: userPlan } });
    } else {
      // Add new plan
      navigate("/add-sales");
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleJoinDate = (planId: string) => {
    console.log("Joining date:", planId);
    alert(
      "Successfully joined the date! You'll receive confirmation details soon."
    );
  };

  const handleEditDate = (plan: any) => {
    const editData = encodeURIComponent(JSON.stringify(plan));
    navigate(`/add-sales?edit=${editData}`);
  };

  // Filter data based on status
  const completedDates = salesHistoryData.filter(
    (item) => item.status === "completed"
  );
  const upcomingDates = salesHistoryData.filter(
    (item) => item.status === "upcoming"
  );
  const cancelledDates = salesHistoryData.filter(
    (item) => item.status === "cancelled"
  );

  const getStatusChip = (status: string) => {
    const statusConfig = {
      completed: { color: "success", label: "Completed" },
      upcoming: { color: "primary", label: "Upcoming" },
      cancelled: { color: "error", label: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Chip
        label={config.label}
        color={config.color as any}
        size="small"
        sx={{ fontWeight: 600 }}
      />
    );
  };

  const renderDateCards = (items: SalesHistoryItem[]) => {
    if (items.length === 0) {
      return (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ py: 4 }}
        >
          No dates found in this category.
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.plan_id}>
            <Box sx={{ position: "relative" }}>
              {/* Status Chip */}
              <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 1 }}>
                {getStatusChip(item.status)}
              </Box>

              {/* Review Status Chip */}
              {item.review && (
                <Box
                  sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
                >
                  <Chip
                    label="Reviewed"
                    color="info"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              )}

              <DatePlanCard
                plan={item}
                showReviewButton={item.status === "completed"}
                showJoinButton={item.status === "upcoming"}
                showEditButton={item.status === "upcoming"}
                existingReview={item.review}
                onReviewSubmit={(review) => addReview(item.plan_id, review)}
                onJoinDate={handleJoinDate}
                onEditDate={handleEditDate}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Sales History
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track your dating journey - past experiences, upcoming dates, and
          reviews.
        </Typography>

        {/* Subscription, Top-up, Add Plan, and Soul Meet buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          {/* <Button
            variant="contained"
            startIcon={<CreditCardIcon />}
            onClick={() => setSubscriptionDialogOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Subscribe to Premium
          </Button> */}
          <Button
            variant="outlined"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => setTopUpDialogOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Top Up Wallet
          </Button>
          <Button
            variant={userPlan ? "outlined" : "contained"}
            startIcon={<AddIcon />}
            onClick={handleAddEditPlan}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              bgcolor: userPlan ? "transparent" : "primary.main",
              color: userPlan ? "primary.main" : "white",
              borderColor: userPlan ? "primary.main" : "transparent",
              "&:hover": {
                bgcolor: userPlan ? "primary.light" : "primary.dark",
                color: "white",
              },
            }}
          >
            {userPlan ? "Edit Plan" : "Add Plan"}
          </Button>
          <Button
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={handleSoulMeetClick}
            disabled={!canClickSoulMeet}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              bgcolor: canClickSoulMeet ? "secondary.main" : "grey.400",
              color: canClickSoulMeet ? "secondary.contrastText" : "grey.600",
              "&:hover": {
                bgcolor: canClickSoulMeet ? "secondary.dark" : "grey.400",
              },
              "&:disabled": {
                bgcolor: "grey.400",
                color: "grey.600",
              },
            }}
          >
            {canClickSoulMeet
              ? "Today Soul Most Meet U"
              : `Cooldown: ${getRemainingCooldownTime()}`}
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="history tabs"
          >
            <Tab
              label={`Completed (${completedDates.length})`}
              id="history-tab-0"
              aria-controls="history-tabpanel-0"
            />
            <Tab
              label={`Upcoming (${upcomingDates.length})`}
              id="history-tab-1"
              aria-controls="history-tabpanel-1"
            />
            <Tab
              label={`Cancelled (${cancelledDates.length})`}
              id="history-tab-2"
              aria-controls="history-tabpanel-2"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {/* Display latest user plan if exists */}
          {userPlan && (
            <>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Your Latest Plan
              </Typography>
              <Box sx={{ mb: 4 }}>
                <DatePlanCard
                  plan={userPlan}
                  showEditButton={true}
                  showReviewButton={false}
                  onEditDate={(plan) => handleAddEditPlan()}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <IconButton
                    color="error"
                    onClick={deletePlanFromStorage}
                    sx={{
                      bgcolor: "error.light",
                      color: "error.contrastText",
                      "&:hover": {
                        bgcolor: "error.main",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Completed Dates
              </Typography>
            </>
          )}
          {!userPlan && (
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              Completed Dates
            </Typography>
          )}
          {renderDateCards(completedDates)}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Upcoming Dates
          </Typography>
          {renderDateCards(upcomingDates)}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Cancelled Dates
          </Typography>
          {renderDateCards(cancelledDates)}
        </TabPanel>

        {/* Web3 features removed temporarily */}
      </Box>

      {/* Subscription and Top-up Dialogs */}
      <SubscriptionDialog
        open={subscriptionDialogOpen}
        onClose={() => setSubscriptionDialogOpen(false)}
        planTitle="Premium Dating Experience"
      />

      <TopUpDialog
        open={topUpDialogOpen}
        onClose={() => setTopUpDialogOpen(false)}
        planTitle="Premium Dating Experience"
      />

      {/* Today Soul Most Meet U Dialog */}
      <Dialog
        open={soulMeetDialogOpen}
        onClose={() => setSoulMeetDialogOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            💕 Today Soul Most Meet U 💕
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Your perfect match is waiting for you!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {randomDatePlan && (
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 2,
                p: 3,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                {randomDatePlan.date_plan.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                {randomDatePlan.date_plan.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {randomDatePlan.date_plan.tags.map(
                  (tag: string, index: number) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  )
                )}
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  component="img"
                  src={randomDatePlan.owner.avatar}
                  alt={randomDatePlan.owner.name}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {randomDatePlan.owner.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {randomDatePlan.owner.age_range} •{" "}
                    {randomDatePlan.owner.gender}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    📍 {randomDatePlan.date_plan.location.city}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Timeline:
              </Typography>
              {randomDatePlan.date_plan.timeline.map(
                (item: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, minWidth: 80 }}
                    >
                      {item.time}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {item.title}
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setSoulMeetDialogOpen(false)}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setSoulMeetDialogOpen(false);
              handleJoinDate(randomDatePlan?.plan_id || "");
            }}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            variant="contained"
          >
            Join This Date! 💕
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SalesHistoryPage;
