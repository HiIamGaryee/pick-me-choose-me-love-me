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
    title: "Step by step to conduct usability testing",
    excerpt:
      "Examining how fintech is promoting access to financial services for underserved populations.",
    author: "Andrea William",
    date: "21 Jan, 2023",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "p2",
    title: "Minimal workspace for inspirations",
    excerpt: "How a tidy space fuels creativity and focus.",
    author: "Harsh Patel",
    date: "21 Feb, 2023",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Morning routine to boost your mood",
    excerpt: "Small habits for big energy.",
    author: "John Doe",
    date: "21 Mar, 2023",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Analyze holdings of your portfolio",
    excerpt: "Simple ways to review risk and returns.",
    author: "Alexa Kimberly",
    date: "21 Apr, 2023",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Should UI designers learn how to code",
    excerpt: "Bridging the gap between design and dev.",
    author: "James Lilian",
    date: "21 May, 2023",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
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
          sx={{ mb: 4 }}
        >
          Our Blog
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
