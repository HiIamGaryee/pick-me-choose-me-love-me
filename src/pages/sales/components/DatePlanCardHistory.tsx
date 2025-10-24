import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReviewDialog from "../../../components/ReviewDialog";
import SuccessDialog from "../../../components/SuccessDialog";
import { Review } from "../data/salesHistoryData";

interface DatePlanCardProps {
  plan: any;
  showReviewButton?: boolean;
  existingReview?: Review;
  onReviewSubmit?: (review: Omit<Review, "id">) => void;
  showJoinButton?: boolean;
  showEditButton?: boolean;
  onJoinDate?: (planId: string) => void;
  onEditDate?: (plan: any) => void;
}

const DatePlanCard: React.FC<DatePlanCardProps> = ({
  plan,
  showReviewButton = false,
  existingReview,
  onReviewSubmit,
  showJoinButton = false,
  showEditButton = false,
  onJoinDate,
  onEditDate,
}) => {
  const theme = useTheme();
  const { owner, date_plan } = plan;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [isCalendarAdded, setIsCalendarAdded] = useState(false);

  // Check if this plan is already added to calendar
  React.useEffect(() => {
    const addedPlans = JSON.parse(
      localStorage.getItem("addedToCalendar") || "[]"
    );
    setIsCalendarAdded(addedPlans.includes(plan.plan_id));
  }, [plan.plan_id]);

  const handleEventClick = () => {
    // Toggle calendar status
    const addedPlans = JSON.parse(
      localStorage.getItem("addedToCalendar") || "[]"
    );

    if (isCalendarAdded) {
      // Remove from calendar
      const updatedPlans = addedPlans.filter(
        (id: string) => id !== plan.plan_id
      );
      localStorage.setItem("addedToCalendar", JSON.stringify(updatedPlans));
      setIsCalendarAdded(false);
    } else {
      // Add to calendar
      addedPlans.push(plan.plan_id);
      localStorage.setItem("addedToCalendar", JSON.stringify(addedPlans));
      setIsCalendarAdded(true);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleReviewClick = () => {
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleReviewSubmit = (review: Omit<Review, "id">) => {
    if (onReviewSubmit) {
      onReviewSubmit(review);
    } else {
      // Fallback for when no onReviewSubmit is provided
      console.log("Review submitted:", review);
    }
    setReviewDialogOpen(false);
  };

  const handleJoinClick = () => {
    if (onJoinDate) {
      onJoinDate(plan.plan_id);
    }
  };

  const handleEditClick = () => {
    if (onEditDate) {
      onEditDate(plan);
    }
  };

  // Format the first timeline event for display
  const getFirstEventDateTime = () => {
    if (date_plan.timeline && date_plan.timeline.length > 0) {
      const firstEvent = date_plan.timeline[0];
      return `${firstEvent.time} - ${firstEvent.title}`;
    }
    return "the scheduled time";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, md: 0 },
        p: { xs: 2, md: 3 },
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: {
          xs: "0 2px 8px rgba(0,0,0,0.08)",
          md: "0 3px 8px rgba(0,0,0,0.05)",
        },
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: { xs: "scale(1.02)", md: "translateY(-3px)" },
          boxShadow: {
            xs: "0 4px 16px rgba(0,0,0,0.12)",
            md: "0 6px 18px rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ height: "100%" }}>
        {/* Plan Image */}
        {date_plan.image && (
          <Box
            sx={{
              width: "100%",
              height: { xs: 120, md: 150 },
              borderRadius: { xs: 1.5, md: 2 },
              overflow: "hidden",
              mb: 1,
            }}
          >
            <img
              src={date_plan.image}
              alt={date_plan.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={600}
            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
          >
            #{plan.plan_id}
          </Typography>

          <Box
            display="flex"
            justifyContent="flex-end"
            gap={0.5}
            sx={{ mt: 0.5 }}
          >
            <IconButton
              color="primary"
              aria-label="add to calendar"
              onClick={handleEventClick}
              size="small"
              sx={{
                backgroundColor: isCalendarAdded ? "#E91E63" : "transparent",
                color: isCalendarAdded ? "white" : theme.palette.primary.main,
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
                "&:hover": {
                  backgroundColor: isCalendarAdded
                    ? "#C2185B"
                    : theme.palette.primary.light,
                  color: "white",
                },
              }}
            >
              <EventIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
            </IconButton>

            {showJoinButton && (
              <IconButton
                color="success"
                aria-label="join date"
                onClick={handleJoinClick}
                size="small"
                sx={{
                  bgcolor: theme.palette.success.light,
                  color: theme.palette.success.contrastText,
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  "&:hover": {
                    bgcolor: theme.palette.success.main,
                  },
                }}
              >
                <PersonAddIcon
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                />
              </IconButton>
            )}

            {showEditButton && (
              <IconButton
                color="info"
                aria-label="edit date plan"
                onClick={handleEditClick}
                size="small"
                sx={{
                  bgcolor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  "&:hover": {
                    bgcolor: theme.palette.info.main,
                  },
                }}
              >
                <EditIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
              </IconButton>
            )}

            {showReviewButton && (
              <IconButton
                color={existingReview ? "success" : "warning"}
                aria-label={existingReview ? "view review" : "write review"}
                onClick={handleReviewClick}
                size="small"
                sx={{
                  bgcolor: existingReview
                    ? theme.palette.success.light
                    : theme.palette.warning.light,
                  color: existingReview
                    ? theme.palette.success.contrastText
                    : theme.palette.warning.contrastText,
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  "&:hover": {
                    bgcolor: existingReview
                      ? theme.palette.success.main
                      : theme.palette.warning.main,
                  },
                }}
              >
                {existingReview ? (
                  <StarIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
                ) : (
                  <RateReviewIcon
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  />
                )}
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: { xs: 1.3, md: 1.4 },
            mb: 0.5,
          }}
        >
          {date_plan.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.85rem", md: "0.875rem" },
            lineHeight: { xs: 1.4, md: 1.5 },
            mb: 1,
          }}
        >
          {date_plan.description}
        </Typography>

        {/* Connected Timeline */}
        <Box
          sx={{ mt: { xs: 1.5, md: 2 }, position: "relative", pl: 1, flex: 1 }}
        >
          {date_plan.timeline.map((slot: any, index: number) => {
            const isLast = index === date_plan.timeline.length - 1;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  mb: isLast ? 0 : { xs: 2, md: 2.5 },
                  position: "relative",
                }}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    width: { xs: 12, md: 14 },
                    height: { xs: 12, md: 14 },
                    borderRadius: "50%",
                    bgcolor:
                      index === 0
                        ? theme.palette.text.primary
                        : theme.palette.primary.main,
                    border: `3px solid ${theme.palette.background.paper}`,
                    zIndex: 2,
                    position: "relative",
                    flexShrink: 0,
                    mt: 0.5,
                  }}
                />

                {/* Timeline line */}
                {!isLast && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: "5px", md: "6px" },
                      top: { xs: "15px", md: "17px" },
                      width: 2,
                      height: "calc(100% + 8px)",
                      bgcolor: theme.palette.primary.main,
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Content */}
                <Box
                  sx={{
                    ml: { xs: 2, md: 2.5 },
                    flex: 1,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      mb: 0.5,
                      display: "block",
                      fontSize: { xs: "0.7rem", md: "0.75rem" },
                      fontWeight: 500,
                    }}
                  >
                    {slot.time}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: { xs: "0.8rem", md: "0.9rem" },
                      lineHeight: { xs: 1.2, md: 1.3 },
                    }}
                  >
                    {slot.title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Tags */}
        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          sx={{ mt: { xs: 1, md: 1.5 } }}
        >
          {date_plan.tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontSize: { xs: "0.65rem", md: "0.7rem" },
                height: { xs: 20, md: 24 },
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.light,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </Stack>

      <SuccessDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        dateTime={getFirstEventDateTime()}
      />

      <ReviewDialog
        open={reviewDialogOpen}
        onClose={handleReviewDialogClose}
        onSubmit={handleReviewSubmit}
        planTitle={date_plan.title}
        existingReview={existingReview}
      />
    </Paper>
  );
};

export default DatePlanCard;
