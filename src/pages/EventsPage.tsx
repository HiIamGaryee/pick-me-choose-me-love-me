import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

// Hardcoded event data
const events = [
  {
    id: 1,
    title: "Blind Date Speed Dating",
    description:
      "Meet new people in a fun, low-pressure environment. Each date lasts 5 minutes - perfect for first impressions!",
    date: "2024-02-14",
    time: "19:00",
    location: "The Coffee Bean, Downtown",
    maxParticipants: 20,
    currentParticipants: 15,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop",
    tags: ["Speed Dating", "Blind Date", "Valentine's Day"],
    organizer: "Love Connections",
    status: "upcoming",
    type: "blind_date",
  },
  {
    id: 2,
    title: "Mystery Dinner Date",
    description:
      "Enjoy a romantic dinner with a mystery partner. You'll be matched based on your preferences and interests.",
    date: "2024-02-17",
    time: "18:30",
    location: "Bella Vista Restaurant",
    maxParticipants: 12,
    currentParticipants: 8,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
    tags: ["Dinner", "Mystery", "Romantic"],
    organizer: "Romantic Encounters",
    status: "upcoming",
    type: "blind_date",
  },
  {
    id: 3,
    title: "Blind Date Movie Night",
    description:
      "Watch a romantic movie with a surprise date. Popcorn and drinks included!",
    date: "2024-02-20",
    time: "20:00",
    location: "Cinema Paradiso",
    maxParticipants: 16,
    currentParticipants: 12,
    price: 20,
    image:
      "https://images.unsplash.com/photo-1489599802017-4b0b0b0b0b0b?w=800&h=450&fit=crop",
    tags: ["Movies", "Blind Date", "Entertainment"],
    organizer: "Movie Match",
    status: "upcoming",
    type: "blind_date",
  },
  {
    id: 4,
    title: "Wine Tasting & Blind Dates",
    description:
      "Sip wine while meeting new people. Each round features a different wine and a new potential match.",
    date: "2024-02-24",
    time: "19:30",
    location: "Vineyard Cellars",
    maxParticipants: 24,
    currentParticipants: 18,
    price: 35,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=450&fit=crop",
    tags: ["Wine", "Blind Date", "Tasting"],
    organizer: "Wine & Romance",
    status: "upcoming",
    type: "blind_date",
  },
  {
    id: 5,
    title: "Blind Date Cooking Class",
    description:
      "Learn to cook together with a mystery partner. Create delicious dishes and maybe a connection!",
    date: "2024-02-28",
    time: "18:00",
    location: "Culinary Arts Studio",
    maxParticipants: 14,
    currentParticipants: 10,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
    tags: ["Cooking", "Blind Date", "Learning"],
    organizer: "Cooking Connections",
    status: "upcoming",
    type: "blind_date",
  },
  {
    id: 6,
    title: "Blind Date Art Gallery Tour",
    description:
      "Explore art together with a surprise companion. Discover masterpieces and maybe discover love!",
    date: "2024-03-02",
    time: "14:00",
    location: "Modern Art Museum",
    maxParticipants: 18,
    currentParticipants: 14,
    price: 30,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=450&fit=crop",
    tags: ["Art", "Blind Date", "Culture"],
    organizer: "Art & Hearts",
    status: "upcoming",
    type: "blind_date",
  },
];

const EventCard = ({ event }: { event: (typeof events)[0] }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        p: { xs: 2, md: 3 },
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
        transition: "0.25s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ height: "100%" }}>
        {/* Event Image */}
        <Box
          sx={{
            width: "100%",
            height: { xs: 120, md: 150 },
            borderRadius: 0,
            overflow: "hidden",
            mb: 1,
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Event ID and Status */}
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
            #{event.id}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                fontSize: { xs: "0.65rem", md: "0.7rem" },
                fontWeight: 600,
              }}
            >
              {event.type.replace("_", " ").toUpperCase()}
            </Box>
            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 2,
                bgcolor: theme.palette.success.light,
                color: theme.palette.success.contrastText,
                fontSize: { xs: "0.65rem", md: "0.7rem" },
                fontWeight: 600,
              }}
            >
              {event.status.toUpperCase()}
            </Box>
          </Stack>
        </Box>

        {/* Event Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: { xs: 1.3, md: 1.4 },
            mb: 0.5,
          }}
        >
          {event.title}
        </Typography>

        {/* Event Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.85rem", md: "0.875rem" },
            lineHeight: { xs: 1.4, md: 1.5 },
            mb: 1,
            flexGrow: 1,
          }}
        >
          {event.description}
        </Typography>

        {/* Event Details */}
        <Box sx={{ mt: { xs: 1.5, md: 2 }, flex: 1 }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon
                fontSize="small"
                color="action"
                sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
              >
                {formatDate(event.date)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon
                fontSize="small"
                color="action"
                sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
              >
                {event.time}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon
                fontSize="small"
                color="action"
                sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
              >
                {event.location}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PeopleIcon
                fontSize="small"
                color="action"
                sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
              >
                {event.currentParticipants}/{event.maxParticipants} participants
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Tags */}
        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          sx={{ mt: { xs: 1, md: 1.5 } }}
        >
          {event.tags.map((tag, index) => (
            <Box
              key={index}
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                fontSize: { xs: "0.65rem", md: "0.7rem" },
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {tag}
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: { xs: 1, md: 1.5 } }} />

        {/* Footer */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: "auto" }}
        >
          <Typography
            variant="h6"
            color="primary"
            fontWeight={700}
            sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            ${event.price}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/events/${event.id}`)}
            disabled={event.currentParticipants >= event.maxParticipants}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 0.5,
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              fontWeight: 600,
            }}
          >
            {event.currentParticipants >= event.maxParticipants
              ? "Full"
              : "Join Event"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

const EventsPage = () => {
  const theme = useTheme();
  const blindDateEvents = events.filter((event) => event.type === "blind_date");

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, md: 4 } }}
      >
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Upcoming Events
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              px: { xs: 1, md: 0 },
            }}
          >
            Join our exciting dating events and meet amazing people
          </Typography>
        </Box>

        {/* Blind Date Events Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mb: 2,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              color: theme.palette.primary.main,
              px: { xs: 1, md: 0 },
            }}
          >
            Blind Date Events
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {blindDateEvents.map((event) => (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3.5, md: 4 },
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 0,
            mt: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
          >
            Can't find what you're looking for?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            We're always adding new events! Check back regularly or contact us
            to suggest new event ideas.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#667eea",
              borderRadius: 2,
              px: { xs: 2.5, md: 3 },
              py: { xs: 0.75, md: 1 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Contact Us
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default EventsPage;
