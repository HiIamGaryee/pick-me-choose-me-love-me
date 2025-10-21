import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Box,
  Button,
  Chip,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
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
  const [tabValue, setTabValue] = useState(0);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);

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
                showEditButton={true}
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

        {/* Subscription and Top-up buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
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
          </Button>
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
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Completed Dates
          </Typography>
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
    </Layout>
  );
};

export default SalesHistoryPage;
