import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";

// Hardcoded event data (same as EventsPage)
const events = [
  {
    id: 1,
    title: "Blind Date Speed Dating",
    description:
      "Meet new people in a fun, low-pressure environment. Each date lasts 5 minutes - perfect for first impressions!",
    fullDescription:
      "Join us for an exciting evening of speed dating where you'll meet multiple potential matches in a fun, relaxed atmosphere. Each conversation lasts exactly 5 minutes, giving you just enough time to make a great first impression. Our experienced hosts will guide you through the process and ensure everyone has a wonderful time. Perfect for singles looking to expand their social circle and meet new people.",
    date: "2024-02-14",
    time: "19:00",
    location: "The Coffee Bean, Downtown",
    address: "123 Main Street, Downtown District",
    maxParticipants: 20,
    currentParticipants: 15,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop",
    tags: ["Speed Dating", "Blind Date", "Valentine's Day"],
    organizer: "Love Connections",
    organizerEmail: "info@loveconnections.com",
    organizerPhone: "(555) 123-4567",
    status: "upcoming",
    type: "blind_date",
    requirements: "Must be 21+ years old, Single status required",
    whatToExpect:
      "5-minute speed dates, icebreaker activities, refreshments included",
    cancellationPolicy: "Full refund if cancelled 24 hours before event",
  },
  {
    id: 2,
    title: "Mystery Dinner Date",
    description:
      "Enjoy a romantic dinner with a mystery partner. You'll be matched based on your preferences and interests.",
    fullDescription:
      "Experience the ultimate blind date with our mystery dinner event. You'll be carefully matched with someone based on your preferences, interests, and personality. Enjoy a delicious 3-course meal while getting to know your mystery date. The restaurant provides an intimate setting perfect for meaningful conversations. All dietary restrictions will be accommodated.",
    date: "2024-02-17",
    time: "18:30",
    location: "Bella Vista Restaurant",
    address: "456 Oak Avenue, Uptown",
    maxParticipants: 12,
    currentParticipants: 8,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
    tags: ["Dinner", "Mystery", "Romantic"],
    organizer: "Romantic Encounters",
    organizerEmail: "hello@romanticencounters.com",
    organizerPhone: "(555) 987-6543",
    status: "upcoming",
    type: "blind_date",
    requirements: "Must be 25+ years old, Dress code: Smart casual",
    whatToExpect: "3-course dinner, wine pairing, private table setting",
    cancellationPolicy: "Full refund if cancelled 48 hours before event",
  },
  {
    id: 3,
    title: "Blind Date Movie Night",
    description:
      "Watch a romantic movie with a surprise date. Popcorn and drinks included!",
    fullDescription:
      "Enjoy a cozy movie night with a surprise companion! We'll pair you with someone based on your movie preferences and interests. Watch a carefully selected romantic film while sharing popcorn and drinks. After the movie, there's a 30-minute discussion session where you can chat about the film and get to know each other better.",
    date: "2024-02-20",
    time: "20:00",
    location: "Cinema Paradiso",
    address: "789 Theater Lane, Arts District",
    maxParticipants: 16,
    currentParticipants: 12,
    price: 20,
    image:
      "https://images.unsplash.com/photo-1489599802017-4b0b0b0b0b0b?w=800&h=450&fit=crop",
    tags: ["Movies", "Blind Date", "Entertainment"],
    organizer: "Movie Match",
    organizerEmail: "contact@moviematch.com",
    organizerPhone: "(555) 456-7890",
    status: "upcoming",
    type: "blind_date",
    requirements: "Must be 18+ years old, Movie preferences survey required",
    whatToExpect: "Movie screening, popcorn & drinks, post-movie discussion",
    cancellationPolicy: "Full refund if cancelled 12 hours before event",
  },
  {
    id: 4,
    title: "Wine Tasting & Blind Dates",
    description:
      "Sip wine while meeting new people. Each round features a different wine and a new potential match.",
    fullDescription:
      "Indulge in a sophisticated evening of wine tasting while meeting new people. Each round features a different wine varietal and a new potential match. Our sommelier will guide you through the tasting notes while you discover new wines and new connections. Perfect for wine enthusiasts and those looking to learn more about wine in a social setting.",
    date: "2024-02-24",
    time: "19:30",
    location: "Vineyard Cellars",
    address: "321 Wine Street, Vineyard District",
    maxParticipants: 24,
    currentParticipants: 18,
    price: 35,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=450&fit=crop",
    tags: ["Wine", "Blind Date", "Tasting"],
    organizer: "Wine & Romance",
    organizerEmail: "events@wineandromance.com",
    organizerPhone: "(555) 234-5678",
    status: "upcoming",
    type: "blind_date",
    requirements: "Must be 21+ years old, Wine knowledge not required",
    whatToExpect: "5 wine tastings, cheese pairing, sommelier guidance",
    cancellationPolicy: "Full refund if cancelled 24 hours before event",
  },
  {
    id: 5,
    title: "Blind Date Cooking Class",
    description:
      "Learn to cook together with a mystery partner. Create delicious dishes and maybe a connection!",
    fullDescription:
      "Join us for a hands-on cooking class where you'll be paired with a mystery partner to create delicious dishes together. Our professional chef will guide you through preparing a 3-course meal while you work as a team. This interactive experience is perfect for food lovers and those who enjoy collaborative activities. All skill levels welcome!",
    date: "2024-02-28",
    time: "18:00",
    location: "Culinary Arts Studio",
    address: "654 Chef's Way, Culinary Quarter",
    maxParticipants: 14,
    currentParticipants: 10,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
    tags: ["Cooking", "Blind Date", "Learning"],
    organizer: "Cooking Connections",
    organizerEmail: "classes@cookingconnections.com",
    organizerPhone: "(555) 345-6789",
    status: "upcoming",
    type: "blind_date",
    requirements: "Must be 18+ years old, Aprons provided",
    whatToExpect: "3-course meal preparation, chef instruction, meal included",
    cancellationPolicy: "Full refund if cancelled 48 hours before event",
  },
  {
    id: 6,
    title: "Blind Date Art Gallery Tour",
    description:
      "Explore art together with a surprise companion. Discover masterpieces and maybe discover love!",
    fullDescription:
      "Discover art and potential love on this guided gallery tour. You'll be paired with a mystery companion to explore the museum's current exhibitions. Our art historian guide will share fascinating stories about the artworks while you discuss your thoughts and interpretations. Perfect for art lovers and those looking to expand their cultural horizons.",
    date: "2024-03-02",
    time: "14:00",
    location: "Modern Art Museum",
    address: "987 Gallery Row, Arts District",
    maxParticipants: 18,
    currentParticipants: 14,
    price: 30,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=450&fit=crop",
    tags: ["Art", "Blind Date", "Culture"],
    organizer: "Art & Hearts",
    organizerEmail: "tours@artandhearts.com",
    organizerPhone: "(555) 567-8901",
    status: "upcoming",
    type: "blind_date",
    requirements:
      "Must be 18+ years old, Comfortable walking shoes recommended",
    whatToExpect: "Guided tour, art discussion, museum admission included",
    cancellationPolicy: "Full refund if cancelled 24 hours before event",
  },
];

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === parseInt(id || "0"));

  if (!event) {
    return (
      <Layout>
        <Box
          sx={{
            px: { xs: 2, md: 6 },
            py: { xs: 3, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Event Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The event you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/events")}
          >
            Back to Events
          </Button>
        </Box>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "success";
      case "ongoing":
        return "warning";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blind_date":
        return "primary";
      case "speed_dating":
        return "secondary";
      case "group_event":
        return "info";
      default:
        return "default";
    }
  };

  const isEventFull = event.currentParticipants >= event.maxParticipants;

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/events")}
          sx={{ mb: 3 }}
        >
          Back to Events
        </Button>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Event Image */}
            <Box
              sx={{
                width: "100%",
                height: 400,
                borderRadius: 2,
                overflow: "hidden",
                mb: 3,
                backgroundImage: `url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Event Info */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                label={event.type.replace("_", " ").toUpperCase()}
                color={getTypeColor(event.type) as any}
                size="small"
              />
              <Chip
                label={event.status.toUpperCase()}
                color={getStatusColor(event.status) as any}
                size="small"
              />
            </Stack>

            <Typography variant="h3" component="h1" gutterBottom>
              {event.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              {event.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Full Description */}
            <Typography variant="h5" gutterBottom>
              About This Event
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {event.fullDescription}
            </Typography>

            {/* What to Expect */}
            <Typography variant="h5" gutterBottom>
              What to Expect
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {event.whatToExpect}
            </Typography>

            {/* Requirements */}
            <Typography variant="h5" gutterBottom>
              Requirements
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {event.requirements}
            </Typography>

            {/* Cancellation Policy */}
            <Typography variant="h5" gutterBottom>
              Cancellation Policy
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {event.cancellationPolicy}
            </Typography>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: "sticky", top: 20 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Event Details
                </Typography>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon color="action" />
                    <Typography variant="body1">
                      {formatDate(event.date)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon color="action" />
                    <Typography variant="body1">{event.time}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon color="action" />
                    <Box>
                      <Typography variant="body1">{event.location}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.address}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PeopleIcon color="action" />
                    <Typography variant="body1">
                      {event.currentParticipants}/{event.maxParticipants}{" "}
                      participants
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AttachMoneyIcon color="action" />
                    <Typography variant="h6" color="primary">
                      ${event.price}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Organizer Info */}
                <Typography variant="h6" gutterBottom>
                  Organizer
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <PersonIcon color="action" />
                  <Typography variant="body1">{event.organizer}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {event.organizerEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.organizerPhone}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Join Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isEventFull}
                  sx={{ mb: 2 }}
                >
                  {isEventFull ? "Event Full" : "Join Event"}
                </Button>

                {isEventFull && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    This event is currently full. Check back for cancellations
                    or join our waitlist.
                  </Typography>
                )}

                {/* Tags */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {event.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default EventDetailPage;
