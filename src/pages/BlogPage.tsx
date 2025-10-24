import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { BlogList, getPublishedBlogs } from "../api/blog";
import { useBlog } from "../context/blog-context";

const BlogCard = ({
  post,
  large = false,
}: {
  post: BlogList;
  large?: boolean;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTags = (tagsString?: string) => {
    if (!tagsString) return [];
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
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
          backgroundImage: post.featured_image
            ? `url(${post.featured_image})`
            : "url(https://via.placeholder.com/800x450/f0f0f0/666666?text=No+Image)",
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
          {post.excerpt || "No excerpt available"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Avatar sx={{ width: 28, height: 28 }}>
            {post.author_name ? post.author_name[0] : "A"}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {post.author_name || "Anonymous"} — {formatDate(post.created_at)}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {post.view_count} views
        </Typography>
      </Box>
    </Paper>
  );
};

export default function BlogPage() {
  const navigate = useNavigate();
  const { state, dispatch, setLoading, setError } = useBlog();
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLocalLoading(true);
        setLocalError(null);
        const blogs = await getPublishedBlogs();
        dispatch({ type: "SET_BLOGS", payload: { blogs } });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLocalError("Failed to load blogs. Please try again later.");
      } finally {
        setLocalLoading(false);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  if (localLoading) {
    return (
      <Layout>
        <Box
          sx={{
            px: { xs: 2, md: 6 },
            py: { xs: 3, md: 6 },
            textAlign: "center",
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading blogs...
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (localError) {
    return (
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {localError}
          </Alert>
        </Box>
      </Layout>
    );
  }

  const blogs = state.blogs;
  const featured = blogs[0]; // First blog as featured
  const rest = blogs.slice(1);

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

        {blogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No blog posts available yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Check back later for new content!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {featured && (
              <Grid item xs={12} md={8}>
                <BlogCard post={featured} large />
              </Grid>
            )}
            {rest[0] && (
              <Grid item xs={12} md={4}>
                <BlogCard post={rest[0]} />
              </Grid>
            )}
            {rest.slice(1).map((post) => (
              <Grid key={post.id} item xs={12} md={4}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
