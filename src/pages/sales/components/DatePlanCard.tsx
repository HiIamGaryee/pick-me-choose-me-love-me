import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import WcIcon from "@mui/icons-material/Wc";
import {
  Avatar,
  Box,
  Chip,
  Divider,
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

  const handleEventClick = () => {
    setDialogOpen(true);
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
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={600}
          >
            #{plan.plan_id}
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={1} sx={{ mt: 1 }}>
            <IconButton
              color="primary"
              aria-label="add to calendar"
              onClick={handleEventClick}
            >
              <EventIcon />
            </IconButton>

            {showJoinButton && (
              <IconButton
                color="success"
                aria-label="join date"
                onClick={handleJoinClick}
                sx={{
                  bgcolor: theme.palette.success.light,
                  color: theme.palette.success.contrastText,
                  "&:hover": {
                    bgcolor: theme.palette.success.main,
                  },
                }}
              >
                <PersonAddIcon />
              </IconButton>
            )}

            {showEditButton && (
              <IconButton
                color="info"
                aria-label="edit date plan"
                onClick={handleEditClick}
                sx={{
                  bgcolor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                  "&:hover": {
                    bgcolor: theme.palette.info.main,
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            )}

            {showReviewButton && (
              <IconButton
                color={existingReview ? "success" : "warning"}
                aria-label={existingReview ? "view review" : "write review"}
                onClick={handleReviewClick}
                sx={{
                  bgcolor: existingReview
                    ? theme.palette.success.light
                    : theme.palette.warning.light,
                  color: existingReview
                    ? theme.palette.success.contrastText
                    : theme.palette.warning.contrastText,
                  "&:hover": {
                    bgcolor: existingReview
                      ? theme.palette.success.main
                      : theme.palette.warning.main,
                  },
                }}
              >
                {existingReview ? <StarIcon /> : <RateReviewIcon />}
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography variant="h6" fontWeight={700}>
          {date_plan.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date_plan.description}
        </Typography>

        {/* Connected Timeline */}
        <Box sx={{ mt: 2, position: "relative" }}>
          {date_plan.timeline.map((slot: any, index: number) => {
            const isLast = index === date_plan.timeline.length - 1;
            const isEven = index % 2 === 0;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: isLast ? 0 : 3,
                  position: "relative",
                }}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor:
                      index === 0
                        ? theme.palette.text.primary
                        : theme.palette.primary.main,
                    border: `2px solid ${theme.palette.background.paper}`,
                    zIndex: 2,
                    position: "relative",
                  }}
                />

                {/* Timeline line */}
                {!isLast && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "5px",
                      top: "12px",
                      width: 2,
                      height: "calc(100% + 12px)",
                      bgcolor: theme.palette.primary.main,
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Content */}
                <Box
                  sx={{
                    ml: 2,
                    flex: 1,
                    textAlign: isEven ? "left" : "right",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    {slot.time}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="700"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: "0.9rem",
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
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {date_plan.tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontSize: "0.7rem",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.light,
              }}
            />
          ))}
        </Stack>

        <Divider />

        {/* Footer */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              src={owner.avatar}
              alt={owner.name}
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {owner.name} ({owner.age_range})
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {owner.gender}
              </Typography>
            </Box>
          </Box>

          {/* Two-icon gender pairing */}
          <Box display="flex" alignItems="center" gap={0.3}>
            {owner.gender === "Male" && owner.looking_for_gender === "Male" && (
              <>
                <MaleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
                <MaleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
              </>
            )}
            {owner.gender === "Female" &&
              owner.looking_for_gender === "Female" && (
                <>
                  <FemaleIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <FemaleIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                </>
              )}
            {((owner.gender === "Male" &&
              owner.looking_for_gender === "Female") ||
              (owner.gender === "Female" &&
                owner.looking_for_gender === "Male")) && (
              <>
                <MaleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
                <FemaleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
              </>
            )}
            {owner.looking_for_gender === "Any" && (
              <WcIcon
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            )}
          </Box>
        </Box>
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
