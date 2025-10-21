import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Review } from "../pages/sales/data/salesHistoryData";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Review, "id">) => void;
  planTitle: string;
  existingReview?: Review;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  onSubmit,
  planTitle,
  existingReview,
}) => {
  const theme = useTheme();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [reviewerName, setReviewerName] = useState(
    existingReview?.reviewerName || ""
  );

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating!");
      return;
    }
    if (!reviewerName.trim()) {
      alert("Please enter your name!");
      return;
    }

    onSubmit({
      rating,
      comment: comment.trim(),
      reviewerName: reviewerName.trim(),
      reviewDate: new Date().toISOString().split("T")[0],
    });

    // Reset form
    setRating(0);
    setComment("");
    setReviewerName("");
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setRating(existingReview?.rating || 0);
    setComment(existingReview?.comment || "");
    setReviewerName(existingReview?.reviewerName || "");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <StarIcon
              sx={{
                color: theme.palette.warning.main,
                fontSize: 28,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              {existingReview ? "Update Review" : "Write a Review"}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          How was your experience with "{planTitle}"?
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Rating *
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue || 0);
            }}
            size="large"
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarIcon fontSize="inherit" />}
          />
        </Box>

        <TextField
          label="Your Name *"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          variant="outlined"
        />

        <TextField
          label="Your Review"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          placeholder="Share your experience and thoughts about this date..."
          variant="outlined"
        />
      </DialogContent>

      <DialogActions sx={{ pt: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {existingReview ? "Update Review" : "Submit Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
