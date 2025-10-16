import EventIcon from "@mui/icons-material/Event";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
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
import React from "react";

interface DatePlanCardProps {
  plan: any;
}

const DatePlanCard: React.FC<DatePlanCardProps> = ({ plan }) => {
  const theme = useTheme();
  const { owner, date_plan } = plan;

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

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 1 }}>
            <IconButton color="primary" aria-label="open date">
              <EventIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight={700}>
          {date_plan.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date_plan.description}
        </Typography>

        {/* Fixed snake timeline — fully connected & balanced */}
        <Stack spacing={3} sx={{ mt: 2, position: "relative" }}>
          {date_plan.timeline
            .reduce((rows: any[], _: any, i: number) => {
              if (i % 2 === 0) rows.push(date_plan.timeline.slice(i, i + 2));
              return rows;
            }, [])
            .map((row: any[], rowIdx: number, allRows: any[]) => {
              const isEven = rowIdx % 2 === 0;
              const hasNextRow = rowIdx < allRows.length - 1;

              return (
                <Box
                  key={rowIdx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isEven ? "row" : "row-reverse",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {row.map((slot, i) => {
                    const isLeft = (isEven && i === 0) || (!isEven && i === 1);
                    const nextExists = i === 0 && row.length > 1;

                    return (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isLeft ? "flex-start" : "flex-end",
                          textAlign: isLeft ? "left" : "right",
                          width: "45%",
                          position: "relative",
                        }}
                      >
                        {/* Time */}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {slot.time}
                        </Typography>

                        {/* Dot + line */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {isLeft && (
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor:
                                  rowIdx === 0 && i === 0
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.main,
                              }}
                            />
                          )}

                          {nextExists && (
                            <Box
                              sx={{
                                flexGrow: 1,
                                height: 2,
                                bgcolor: theme.palette.primary.main,
                                mx: 1,
                              }}
                            />
                          )}

                          {!isLeft && (
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: theme.palette.primary.main,
                              }}
                            />
                          )}
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="subtitle2"
                          fontWeight="700"
                          sx={{ mt: 0.5 }}
                        >
                          {slot.title}
                        </Typography>

                        {/* Vertical connector between rows */}
                        {hasNextRow && i === (isLeft ? 1 : 0) && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: -24,
                              left: isLeft ? "10px" : undefined,
                              right: !isLeft ? "10px" : undefined,
                              width: 2,
                              height: 24,
                              bgcolor: theme.palette.primary.main,
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
        </Stack>

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
    </Paper>
  );
};

export default DatePlanCard;
