import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfilePicture from "../assets/profile-avatar.jpg";
import Layout from "../Layout";

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            {/* Profile header */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar src={ProfilePicture} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" fontWeight={700}>
                    Jack Adams
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Designer • Los Angeles, CA
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip size="small" label="Verified" color="success" />
                    <Chip size="small" label="Member since 2024" />
                  </Stack>
                </Grid>
                <Grid item>
                  <Button variant="outlined">Edit</Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Last date plans posted */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Last Date Plans
              </Typography>
              <Stack spacing={2}>
                {[
                  {
                    title: "Boulders, Brew & Banter",
                    tags: ["Active", "Coffee", "Chill"],
                    status: "Active",
                  },
                  {
                    title: "Groove, Grind & Glow",
                    tags: ["Music", "Art"],
                    status: "Completed",
                  },
                ].map((p, i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{ p: 2, borderRadius: 2 }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography fontWeight={600}>{p.title}</Typography>
                        <Stack direction="row" spacing={1} mt={0.5}>
                          {p.tags.map((t) => (
                            <Chip key={t} size="small" label={t} />
                          ))}
                        </Stack>
                      </Box>
                      <Chip
                        color={p.status === "Active" ? "info" : "success"}
                        label={p.status}
                      />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={4}>
            {/* Last date quick card */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Last Date Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Went to: Rooftop tea • Status: Completed
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Chip key={s} size="small" label={`${s}★`} />
                ))}
              </Stack>
              <Button fullWidth sx={{ mt: 2 }} variant="contained">
                View Ratings
              </Button>
            </Paper>

            {/* Ads / Subscription */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "secondary.dark",
                color: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={1}>
                Premium Plan
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                • AI Cupid suggestions • Unlimited edits • Priority support
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
              >
                Subscribe
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
