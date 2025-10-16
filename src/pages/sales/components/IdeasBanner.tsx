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

interface Idea {
  title: string;
  slug: string;
  description: string;
}

const ideas: Idea[] = [
  {
    title: "Cafe Hopping & Brunch Trail",
    slug: "cafe-hopping-brunch",
    description: "Explore cozy cafés and brunch spots.",
  },
  {
    title: "Movie & Chill Night",
    slug: "movie-chill",
    description: "Perfect low-key evening plan.",
  },
  {
    title: "Beach Picnic & Sunset Walk",
    slug: "beach-picnic-sunset",
    description: "Sun, sand, and conversation.",
  },
  {
    title: "Wall Bouldering & Coffee",
    slug: "boulder-coffee",
    description: "Climb, laugh, and caffeinate.",
  },
  {
    title: "Art Gallery & Dessert Date",
    slug: "art-dessert",
    description: "Feed both your creativity and sweet tooth.",
  },
  {
    title: "Bookstore Hideout & Tea Tasting",
    slug: "book-tea",
    description: "Books, tea, and quiet charm.",
  },
  {
    title: "Food Truck Night & Skyline Drive",
    slug: "foodtruck-drive",
    description: "Urban bites and neon views.",
  },
  {
    title: "Concert & Late Night Supper",
    slug: "concert-supper",
    description: "Music, laughter, and noodles at 2am.",
  },
];

const IdeasBanner = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
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
            sx={{
              minWidth: 260,
              flexShrink: 0,
              scrollSnapAlign: "start",
              borderRadius: 3,
              p: 2,
              bgcolor: theme.palette.background.paper,
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
