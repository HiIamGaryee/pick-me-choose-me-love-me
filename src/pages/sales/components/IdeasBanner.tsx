import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Idea {
  title: string;
  slug: string;
  description: string;
  blogUrl: string;
}

const ideas: Idea[] = [
  {
    title: "Cafe Hopping & Brunch Trail",
    slug: "cafe-hopping-brunch",
    description: "Explore cozy cafés and brunch spots.",
    blogUrl: "/blog/cafe-hopping-brunch-trail",
  },
  {
    title: "Movie & Chill Night",
    slug: "movie-chill",
    description: "Perfect low-key evening plan.",
    blogUrl: "/blog/movie-chill-night-guide",
  },
  {
    title: "Beach Picnic & Sunset Walk",
    slug: "beach-picnic-sunset",
    description: "Sun, sand, and conversation.",
    blogUrl: "/blog/beach-picnic-sunset-walk",
  },
  {
    title: "Wall Bouldering & Coffee",
    slug: "boulder-coffee",
    description: "Climb, laugh, and caffeinate.",
    blogUrl: "/blog/wall-bouldering-coffee-date",
  },
  {
    title: "Art Gallery & Dessert Date",
    slug: "art-dessert",
    description: "Feed both your creativity and sweet tooth.",
    blogUrl: "/blog/art-gallery-dessert-date",
  },
  {
    title: "Bookstore Hideout & Tea Tasting",
    slug: "book-tea",
    description: "Books, tea, and quiet charm.",
    blogUrl: "/blog/bookstore-tea-tasting",
  },
  {
    title: "Food Truck Night & Skyline Drive",
    slug: "foodtruck-drive",
    description: "Urban bites and neon views.",
    blogUrl: "/blog/food-truck-skyline-drive",
  },
  {
    title: "Concert & Late Night Supper",
    slug: "concert-supper",
    description: "Music, laughter, and noodles at 2am.",
    blogUrl: "/blog/concert-late-night-supper",
  },
];

const IdeasBanner = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleIdeaClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography fontWeight={700}>Date Ideas</Typography>
        <Stack direction="row" spacing={1}>
          {/* When search icon is present, hide refresh button per requirement */}
          <IconButton
            size="small"
            color="primary"
            sx={{ border: (t) => `1px solid ${t.palette.divider}` }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
          {/* Refresh button (decorative) */}
          <IconButton size="small" color="primary">
            <RefreshIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          py: 1,
          px: 0.5,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: theme.palette.primary.light,
            borderRadius: 3,
          },
        }}
      >
        {ideas.map((idea) => (
          <Paper
            key={idea.slug}
            variant="outlined"
            onClick={() => handleIdeaClick(idea.slug)}
            sx={{
              minWidth: 260,
              flexShrink: 0,
              scrollSnapAlign: "start",
              borderRadius: 4,
              p: 2,
              bgcolor: theme.palette.background.paper,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <Typography fontWeight={800} sx={{ mb: 0.5 }}>
              {idea.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {idea.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default IdeasBanner;
