import { Event as EventIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface DatePlanCardProps {
  plan: any;
}

const DatePlanCard: React.FC<DatePlanCardProps> = ({ plan }) => {
  const { owner, date_plan, ratings } = plan;

  return (
    <Card sx={{ borderRadius: 4, height: "100%" }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            #{plan.plan_id}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {date_plan.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date_plan.description}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {date_plan.tags.slice(0, 4).map((t: string) => (
              <Chip
                key={t}
                size="small"
                label={t}
                color="secondary"
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              By {owner.name} • {date_plan.location.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ratings.total_dates} dates • {ratings.average_score.toFixed(1)}★
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton color="primary" aria-label="open date">
              <EventIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DatePlanCard;
