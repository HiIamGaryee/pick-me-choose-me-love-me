import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import whyImg from "../assets/upcoming2.jpg";
import LandingBannerSection from "../components/HomeSection/LandingBannerSection";
import TeamMemberSection from "../components/HomeSection/TeamMemberSection";
import CircularGallery from "../components/ReactBits/CircularGallery";
import Layout from "../Layout";

const HomePage = () => {
  const navigate = useNavigate();
  const galleryItems = [
    { image: "https://picsum.photos/800/600?random=1", text: "Skate" },
    {
      image: "https://picsum.photos/800/600?random=2",
      text: "Wall Bouldering",
    },
    { image: "https://picsum.photos/800/600?random=3", text: "Sleep" },
    { image: "https://picsum.photos/800/600?random=4", text: "Coffee Date" },
  ];

  return (
    <Layout>
      <LandingBannerSection />

      <CircularGallery items={galleryItems} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          flexDirection: "column",
          p: 6,
          bgcolor: (theme) => theme.palette.light.main,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          color="secondary.dark"
        >
          Make Tasks Feel Fun
        </Typography>
        <Typography
          px={{ xs: 2, md: 10 }}
          textAlign="center"
          mb={6}
          color="text.secondary"
        >
          Build lists by vibe, add reminders, and track streaks. Everything you
          need to plan great days and better dates.
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Quick Add",
              desc: "Create tasks in seconds with natural language.",
            },
            {
              title: "Vibe Groups",
              desc: "Cluster tasks by mood: Chill, Adventure, Errands.",
            },
            {
              title: "Smart Reminders",
              desc: "Get nudges before plans, not after.",
            },
            {
              title: "Progress Streaks",
              desc: "See your weekly momentum and keep it rolling.",
            },
          ].map((f, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography
                      variant="h6"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {f.desc}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Needed (split) */}
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: 8,
          bgcolor: (t) => t.palette.light.light,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={whyImg}
              alt="Why we built this"
              sx={{
                width: 1,
                height: "auto",
                borderRadius: 6,
                boxShadow: (t) => `0 20px 60px rgba(0,0,0,0.25)`,
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Card
              sx={{ bgcolor: "dark.light", color: "#fff", borderRadius: 6 }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Not just any to‑do app.
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Most task apps add pressure. We add play. Our vibe‑first
                    lists make planning dates and days feel light, colorful and
                    achievable. Less guilt, more done.
                  </Typography>
                  <Button variant="contained" color="success">
                    Why it works
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 10,
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.dark.light} 0%, ${theme.palette.dark.main} 100%)`,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="secondary.main"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Fuel Playtime With Tasks You’ll Finish
        </Typography>
        <Typography
          variant="body1"
          color="light.light"
          textAlign="center"
          sx={{ maxWidth: 700, mb: 4, px: 2 }}
        >
          Start a list, pick your vibe, and watch the checkmarks roll in.
          Simple, colorful, and actually motivating.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(`/signup`)}>
            Create Free Account
          </Button>
          <Button onClick={() => navigate(`/faq`)} variant="text">
            Learn More
          </Button>
        </Stack>
      </Box>
      <TeamMemberSection />
    </Layout>
  );
};

export default HomePage;
