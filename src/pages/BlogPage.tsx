import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
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
    id: "p1",
    title: "Best Movies to Watch on a Date in July 2025",
    excerpt:
      "From romantic comedies to thrilling adventures - discover the perfect films to share with your special someone this summer.",
    author: "Sarah Chen",
    date: "15 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
    highlight: true,
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

const BlogCard = ({ post, large = false }: { post: Post; large?: boolean }) => (
  <Paper
    elevation={0}
    sx={{
      border: (t) => `1px solid ${t.palette.divider}`,
      borderRadius: 3,
      overflow: "hidden",
      bgcolor: "#fff",
      height: "100%",
    }}
  >
    <Box
      sx={{
        position: "relative",
        pt: large ? "56.25%" : "56.25%",
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 1,
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
