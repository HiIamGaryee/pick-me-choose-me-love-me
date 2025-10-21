import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  highlight?: boolean;
};

const posts: Post[] = [
  {
    id: "cafe-hopping-brunch-trail",
    title: "Cafe Hopping & Brunch Trail: The Ultimate Guide",
    excerpt:
      "Discover the best cafés and brunch spots in the city. From cozy corners to Instagram-worthy lattes, plan your perfect morning adventure.",
    author: "Sarah Chen",
    date: "20 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "movie-chill-night-guide",
    title: "Movie & Chill Night: Perfect Low-Key Evening Plan",
    excerpt:
      "Everything you need for the perfect movie night at home. From snack ideas to film recommendations that spark conversation.",
    author: "Alex Rodriguez",
    date: "18 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "beach-picnic-sunset-walk",
    title: "Beach Picnic & Sunset Walk: Romance by the Sea",
    excerpt:
      "Plan the perfect beach date with our guide to sunset picnics, romantic walks, and creating unforgettable moments by the water.",
    author: "Emma Thompson",
    date: "16 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wall-bouldering-coffee-date",
    title: "Wall Bouldering & Coffee: Climb, Laugh, and Caffeinate",
    excerpt:
      "Combine adventure with relaxation in this unique date idea. Perfect for active couples who love trying new things together.",
    author: "Mike Johnson",
    date: "14 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "art-gallery-dessert-date",
    title: "Art Gallery & Dessert Date: Feed Your Creativity",
    excerpt:
      "Explore local galleries followed by indulgent desserts. A perfect blend of culture and sweetness for art-loving couples.",
    author: "Lisa Park",
    date: "12 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "bookstore-tea-tasting",
    title: "Bookstore Hideout & Tea Tasting: Books, Tea, and Quiet Charm",
    excerpt:
      "Discover hidden bookstores and artisanal tea shops. Perfect for bookworms and tea enthusiasts seeking intimate conversations.",
    author: "David Kim",
    date: "10 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "food-truck-skyline-drive",
    title: "Food Truck Night & Skyline Drive: Urban Bites and Neon Views",
    excerpt:
      "Experience the city's vibrant food truck scene followed by a romantic drive with stunning skyline views.",
    author: "Maria Garcia",
    date: "8 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "concert-late-night-supper",
    title: "Concert & Late Night Supper: Music, Laughter, and Noodles at 2am",
    excerpt:
      "From live music venues to late-night ramen spots. Experience the city's nightlife and create memories that last until dawn.",
    author: "James Wilson",
    date: "6 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p1",
    title: "Best Movies to Watch on a Date in January 2025",
    excerpt:
      "From romantic comedies to thrilling adventures - discover the perfect films to share with your special someone this winter.",
    author: "Sarah Chen",
    date: "4 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Dating a Nerd Boy: A Complete Guide",
    excerpt:
      "Everything you need to know about dating someone who's passionate about tech, games, and intellectual conversations.",
    author: "Alex Rodriguez",
    date: "12 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "10 Creative Date Ideas for Introverts",
    excerpt:
      "Perfect date activities for those who prefer intimate, low-key settings over crowded social gatherings.",
    author: "Emma Thompson",
    date: "10 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "How to Plan the Perfect Coffee Date",
    excerpt:
      "From choosing the right café to conversation starters - master the art of the coffee date.",
    author: "Marcus Johnson",
    date: "8 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "First Date Conversation Topics That Actually Work",
    excerpt:
      "Skip the awkward silences with these engaging topics that help you connect on a deeper level.",
    author: "Lisa Park",
    date: "5 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    title: "Dating Apps vs Real Life: Finding Love in 2025",
    excerpt:
      "Exploring the pros and cons of digital dating versus meeting someone organically in today's world.",
    author: "David Kim",
    date: "3 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p7",
    title: "The Art of Flirting: Subtle vs Direct Approaches",
    excerpt:
      "Learn when to be subtle and when to be direct in your romantic pursuits for maximum success.",
    author: "Sophie Williams",
    date: "1 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p8",
    title: "Long Distance Dating: Making It Work",
    excerpt:
      "Essential tips and strategies for maintaining a strong connection when miles apart.",
    author: "Ryan Chen",
    date: "28 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p9",
    title: "Dating Someone with Different Interests: A Guide",
    excerpt:
      "How to navigate relationships when you and your partner have completely different hobbies and passions.",
    author: "Maya Patel",
    date: "25 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p10",
    title: "The Science of Attraction: What Really Draws People Together",
    excerpt:
      "Exploring the psychological and biological factors that influence who we're attracted to.",
    author: "Dr. James Wilson",
    date: "22 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p11",
    title: "Budget-Friendly Date Ideas That Still Feel Special",
    excerpt:
      "Romantic and memorable date activities that won't break the bank but will create lasting memories.",
    author: "Jessica Lee",
    date: "20 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p12",
    title: "How to Know When You're Ready for a Relationship",
    excerpt:
      "Signs that indicate you're emotionally prepared to commit to a serious romantic relationship.",
    author: "Michael Brown",
    date: "18 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
  },
];

const BlogCard = ({ post, large = false }: { post: Post; large?: boolean }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "#fff",
        height: "100%",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderColor: (t) => t.palette.primary.main,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          pt: large ? "56.25%" : "56.25%",
          backgroundImage: `url(${post.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
        }}
      />
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant={large ? "h5" : "h6"} fontWeight={700} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.excerpt}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 28, height: 28 }}>{post.author[0]}</Avatar>
          <Typography variant="caption" color="text.secondary">
            {post.author} — {post.date}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default function BlogPage() {
  const featured = posts.find((p) => p.highlight) || posts[0];
  const rest = posts.filter((p) => p.id !== featured.id);

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          sx={{ mb: 2 }}
        >
          Dating & Relationship Blog
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Expert advice, tips, and insights for your dating journey
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <BlogCard post={featured} large />
          </Grid>
          <Grid item xs={12} md={4}>
            <BlogCard post={rest[0]} />
          </Grid>
          {rest.slice(1).map((p) => (
            <Grid key={p.id} item xs={12} md={4}>
              <BlogCard post={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
