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
import coffeeImg from "../assets/coffee1.png";
import upcoming1Img from "../assets/upcoming1.jpeg";
import upcoming3Img from "../assets/upcoming3.jpeg";
import upcoming4Img from "../assets/upcoming4.jpeg";
import LandingBannerSection from "../components/HomeSection/LandingBannerSection";
import TeamMemberSection from "../components/HomeSection/TeamMemberSection";
import CircularGallery from "../components/ReactBits/CircularGallery";
import Layout from "../Layout";

const HomePage = () => {
  const navigate = useNavigate();
  const galleryItems = [
    { image: upcoming1Img, text: "Skate" },
    {
      image: upcoming3Img,
      text: "Wall Bouldering",
    },
    { image: upcoming4Img, text: "Sleep" },
    { image: coffeeImg, text: "Coffee Date" },
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
          Plan Dates That Actually Happen
        </Typography>
        <Typography
          px={{ xs: 2, md: 10 }}
          textAlign="center"
          mb={6}
          color="text.secondary"
        >
          Create detailed date plans, find your perfect match, and turn "maybe
          someday" into "this weekend." From coffee crawls to adventure days,
          make every date count.
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Create Date Plans",
              desc: "Design detailed timelines with activities, locations, and vibes that match your style.",
            },
            {
              title: "Find Your Match",
              desc: "Browse date plans by vibe: Adventure, Chill, Creative, Foodie, or Romantic.",
            },
            {
              title: "Join & Connect",
              desc: "RSVP to dates that excite you and meet people who share your interests.",
            },
            {
              title: "Share & Review",
              desc: "Rate your dates and help others discover amazing experiences.",
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
          Ready to Plan Your Perfect Date?
        </Typography>
        <Typography
          variant="body1"
          color="light.light"
          textAlign="center"
          sx={{ maxWidth: 700, mb: 4, px: 2 }}
        >
          Join thousands of people creating meaningful connections through
          shared experiences. Start planning your next adventure today.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(`/signup`)}>
            Create Your First Date Plan
          </Button>
          <Button onClick={() => navigate(`/sales`)} variant="text">
            Browse Date Ideas
          </Button>
        </Stack>
      </Box>
      <TeamMemberSection />
    </Layout>
  );
};

export default HomePage;
