import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";

// Hardcoded event data
const events = [
  {
    id: 1,
    title: "Blind Date Speed Dating",
    description:
      "Meet new people in a fun, low-pressure environment. Each date lasts 5 minutes - perfect for first impressions!",
    fullDescription:
      "Join us for an exciting evening of speed dating where you'll meet potential matches in a relaxed, friendly atmosphere. Each round lasts 5 minutes - just enough time to spark a connection without the pressure of a full dinner date. We'll have icebreaker activities and fun conversation starters to help you get to know each other. At the end of the evening, you'll have the chance to exchange contact information with anyone you'd like to see again.",
    date: "2024-02-14",
    time: "19:00",
    location: "The Coffee Bean, Downtown",
    address: "123 Main Street, Downtown",
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
    requirements: [
      "Age 21+",
      "Valid ID required",
      "Casual dress code",
      "Arrive 15 minutes early",
    ],
    includes: [
      "Light refreshments",
      "Icebreaker games",
      "Professional hosts",
      "Follow-up matchmaking session",
    ],
  },
  {
    id: 2,
    title: "Mystery Dinner Date",
    description:
      "Enjoy a romantic dinner with a mystery partner. You'll be matched based on your preferences and interests.",
    fullDescription:
      "Experience the thrill of dining with a mystery partner carefully matched to your preferences. You'll enjoy a romantic 3-course dinner at one of the city's finest restaurants. Before the event, you'll fill out a detailed questionnaire about your interests, values, and dating preferences. We'll use this information to match you with someone compatible. Dress to impress - this is a special evening filled with great food, conversation, and maybe romance!",
    date: "2024-02-17",
    time: "18:30",
    location: "Bella Vista Restaurant",
    address: "456 Oak Avenue, Midtown",
    maxParticipants: 12,
    currentParticipants: 8,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
    tags: ["Dinner", "Mystery", "Romantic"],
    organizer: "Romantic Encounters",
    organizerEmail: "hello@romanticencounters.com",
    organizerPhone: "(555) 234-5678",
    status: "upcoming",
    type: "blind_date",
    requirements: [
      "Age 25+",
      "Dress code: Smart casual",
      "Must arrive by 6:30 PM",
      "Dietary restrictions must be noted",
    ],
    includes: [
      "3-course meal",
      "Pre-dinner drinks",
      "Professional matchmaking",
      "Photo opportunities",
    ],
  },
  {
    id: 3,
    title: "Blind Date Movie Night",
    description:
      "Watch a romantic movie with a surprise date. Popcorn and drinks included!",
    fullDescription:
      "Enjoy a movie night with a twist! Watch a romantic film with a surprise date handpicked by our matchmaking team. We'll provide popcorn, drinks, and snacks to make the evening complete. After the movie, you'll have time to discuss the film and get to know each other better. This low-pressure event is perfect for those who prefer a casual first meeting.",
    date: "2024-02-20",
    time: "20:00",
    location: "Cinema Paradiso",
    address: "789 Elm Street, Riverside",
    maxParticipants: 16,
    currentParticipants: 12,
    price: 20,
    image:
      "https://images.unsplash.com/photo-1489599802017-4b0b0b0b0b0b?w=800&h=450&fit=crop",
    tags: ["Movies", "Blind Date", "Entertainment"],
    organizer: "Movie Match",
    organizerEmail: "info@moviematch.com",
    organizerPhone: "(555) 345-6789",
    status: "upcoming",
    type: "blind_date",
    requirements: [
      "Age 18+",
      "Casual attire",
      "Arrive 30 minutes before showtime",
    ],
    includes: [
      "Movie ticket",
      "Popcorn & drink",
      "Post-movie discussion",
      "Meetup with other attendees",
    ],
  },
  {
    id: 4,
    title: "Wine Tasting & Blind Dates",
    description:
      "Sip wine while meeting new people. Each round features a different wine and a new potential match.",
    fullDescription:
      "Combine your love of wine with the excitement of meeting new people! This unique event pairs wine tasting with blind dating. You'll sample different wines throughout the evening while rotating through different potential matches. Each round introduces a new wine and a new person to chat with. Perfect for wine enthusiasts who want to meet someone who shares their passion.",
    date: "2024-02-24",
    time: "19:30",
    location: "Vineyard Cellars",
    address: "321 Vine Street, Wine District",
    maxParticipants: 24,
    currentParticipants: 18,
    price: 35,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=450&fit=crop",
    tags: ["Wine", "Blind Date", "Tasting"],
    organizer: "Wine & Romance",
    organizerEmail: "cheers@wineandromance.com",
    organizerPhone: "(555) 456-7890",
    status: "upcoming",
    type: "blind_date",
    requirements: [
      "Age 21+",
      "Must show ID",
      "Smart casual dress",
      "Designated driver recommended",
    ],
    includes: [
      "Wine tasting (5 wines)",
      "Cheese & charcuterie board",
      "Expert sommelier guide",
      "Take-home wine list",
    ],
  },
  {
    id: 5,
    title: "Blind Date Cooking Class",
    description:
      "Learn to cook together with a mystery partner. Create delicious dishes and maybe a connection!",
    fullDescription:
      "Put your culinary skills to the test with a mystery partner! Our professional chef will guide you through creating a delicious 3-course meal together. This hands-on experience is perfect for food lovers who want to bond over a shared activity. You'll learn new cooking techniques, enjoy the fruits of your labor, and potentially create a lasting connection.",
    date: "2024-02-28",
    time: "18:00",
    location: "Culinary Arts Studio",
    address: "654 Foodie Lane, Culinary Quarter",
    maxParticipants: 14,
    currentParticipants: 10,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
    tags: ["Cooking", "Blind Date", "Learning"],
    organizer: "Cooking Connections",
    organizerEmail: "hello@cookingconnections.com",
    organizerPhone: "(555) 567-8901",
    status: "upcoming",
    type: "blind_date",
    requirements: [
      "Age 21+",
      "Aprons provided",
      "No cooking experience needed",
      "Allergies must be disclosed",
    ],
    includes: [
      "3-course cooking class",
      "All ingredients provided",
      "Professional chef instruction",
      "Dinner with your matches",
    ],
  },
  {
    id: 6,
    title: "Blind Date Art Gallery Tour",
    description:
      "Explore art together with a surprise companion. Discover masterpieces and maybe discover love!",
    fullDescription:
      "Art lovers unite! Take a guided tour of our current exhibition with a carefully matched mystery partner. You'll explore contemporary art installations, discuss your interpretations, and enjoy light refreshments together. This cultural event is perfect for creative souls who appreciate art and meaningful conversation.",
    date: "2024-03-02",
    time: "14:00",
    location: "Modern Art Museum",
    address: "987 Art Blvd, Cultural District",
    maxParticipants: 18,
    currentParticipants: 14,
    price: 30,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=450&fit=crop",
    tags: ["Art", "Blind Date", "Culture"],
    organizer: "Art & Hearts",
    organizerEmail: "info@artandhearts.com",
    organizerPhone: "(555) 678-9012",
    status: "upcoming",
    type: "blind_date",
    requirements: [
      "Age 22+",
      "Casual chic attire",
      "Comfortable walking shoes",
      "Arrive 15 minutes early",
    ],
    includes: [
      "Guided gallery tour",
      "Curator presentation",
      "Light refreshments",
      "Art discussion session",
    ],
  },
];

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Typography variant="h4">Event not found</Typography>
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </Container>
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, md: 4 } }}
      >
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/events")}
          sx={{
            mb: { xs: 2, md: 3 },
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          Back to Events
        </Button>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Event Image */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                overflow: "hidden",
                mb: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 300, md: 400 },
                  position: "relative",
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
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 8, md: 16 },
                    right: { xs: 8, md: 16 },
                    display: "flex",
                    gap: { xs: 0.5, md: 1 },
                  }}
                >
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { bgcolor: "white" },
                      width: { xs: 32, md: 40 },
                      height: { xs: 32, md: 40 },
                    }}
                  >
                    {isFavorite ? (
                      <FavoriteIcon
                        color="error"
                        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                      />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={handleShare}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { bgcolor: "white" },
                      width: { xs: 32, md: 40 },
                      height: { xs: 32, md: 40 },
                    }}
                  >
                    <ShareIcon
                      sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Paper>

            {/* Event Details */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                p: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`,
                mb: { xs: 2, md: 3 },
              }}
            >
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                <Box>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                  >
                    Event #{event.id}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      lineHeight: { xs: 1.6, md: 1.5 },
                    }}
                  >
                    {event.fullDescription}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Event Details
                  </Typography>
                  <Stack spacing={{ xs: 1.25, md: 1.5 }}>
                    <Stack direction="row" spacing={{ xs: 1, md: 1.5 }}>
                      <CalendarTodayIcon
                        color="action"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          mt: 0.5,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                        >
                          Date
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                        >
                          {formatDate(event.date)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={{ xs: 1, md: 1.5 }}>
                      <AccessTimeIcon
                        color="action"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          mt: 0.5,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                        >
                          Time
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                        >
                          {event.time}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={{ xs: 1, md: 1.5 }}>
                      <LocationOnIcon
                        color="action"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          mt: 0.5,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                        >
                          Location
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                        >
                          {event.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                        >
                          {event.address}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={{ xs: 1, md: 1.5 }}>
                      <PeopleIcon
                        color="action"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          mt: 0.5,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                        >
                          Participants
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                        >
                          {event.currentParticipants}/{event.maxParticipants}{" "}
                          spots taken
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    What's Included
                  </Typography>
                  <Stack spacing={{ xs: 0.75, md: 1 }}>
                    {event.includes.map((item, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                          lineHeight: { xs: 1.5, md: 1.4 },
                        }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Requirements
                  </Typography>
                  <Stack spacing={{ xs: 0.75, md: 1 }}>
                    {event.requirements.map((req, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                          lineHeight: { xs: 1.5, md: 1.4 },
                        }}
                      >
                        • {req}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Organizer
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                  >
                    {event.organizer}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Email: {event.organizerEmail}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Phone: {event.organizerPhone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                p: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`,
                position: { md: "sticky" },
                top: { md: 100 },
              }}
            >
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="primary"
                    sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                  >
                    ${event.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    per person
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={event.currentParticipants >= event.maxParticipants}
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1.25, md: 1.5 },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: 600,
                  }}
                >
                  {event.currentParticipants >= event.maxParticipants
                    ? "Event Full"
                    : "Join This Event"}
                </Button>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Availability
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                  >
                    {event.maxParticipants - event.currentParticipants} spots
                    remaining
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Event Type
                  </Typography>
                  <Chip
                    label={event.type.replace("_", " ").toUpperCase()}
                    color="primary"
                    size="small"
                    sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                  />
                  <Box sx={{ mt: 1 }}>
                    {event.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          fontSize: { xs: "0.65rem", md: "0.75rem" },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default EventDetailPage;
