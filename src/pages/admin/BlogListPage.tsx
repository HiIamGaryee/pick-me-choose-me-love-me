import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { deleteBlog, getAllBlogsAdmin } from "../../api/blog";
import { useBlog } from "../../context/blog-context";

// Hardcoded blog data - in real app this would come from API
const blogPosts = [
  {
    id: "cafe-hopping-brunch-trail",
    title: "Cafe Hopping & Brunch Trail: The Ultimate Guide",
    excerpt:
      "Discover the best cafés and brunch spots in the city. From cozy corners to Instagram-worthy lattes, plan your perfect morning adventure.",
    author: "Sarah Chen",
    date: "20 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coffee", "Brunch", "Adventure", "Food"],
    status: "published",
    views: 1250,
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
    tags: ["Movies", "Home", "Cozy", "Entertainment"],
    status: "published",
    views: 980,
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
    tags: ["Beach", "Sunset", "Picnic", "Romance"],
    status: "draft",
    views: 0,
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
    tags: ["Adventure", "Active", "Coffee", "Teamwork"],
    status: "published",
    views: 756,
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
    tags: ["Art", "Culture", "Dessert", "Creative"],
    status: "published",
    views: 892,
  },
];

const BlogListPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useBlog();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    blogId: number | null;
  }>({
    open: false,
    blogId: null,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogs = await getAllBlogsAdmin();
        dispatch({ type: "SET_BLOGS", payload: { blogs } });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  const handleAddNew = () => {
    navigate("/admin/blog/add");
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteDialog({ open: true, blogId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.blogId) return;

    try {
      await deleteBlog(deleteDialog.blogId);
      dispatch({ type: "DELETE_BLOG", payload: deleteDialog.blogId });
      setDeleteDialog({ open: false, blogId: null });
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete blog. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, blogId: null });
  };

  const getStatusColor = (isPublished: boolean) => {
    return isPublished ? "success" : "warning";
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

  if (loading) {
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

  if (error) {
    return (
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      </Layout>
    );
  }

  const blogs = state.blogs;
  const publishedCount = blogs.filter((blog) => blog.is_published).length;
  const draftCount = blogs.filter((blog) => !blog.is_published).length;
  const totalViews = blogs.reduce((sum, blog) => sum + blog.view_count, 0);

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Blog Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{
              background:
                "linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #fbbf24 100%)",
              borderRadius: "10px",
              px: 3,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                background:
                  "linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #7c3aed 100%)",
              },
            }}
          >
            Add New Post
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "primary.main", color: "white" }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>
                  {blogs.length}
                </Typography>
                <Typography variant="body2">Total Posts</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "success.main", color: "white" }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>
                  {publishedCount}
                </Typography>
                <Typography variant="body2">Published</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "warning.main", color: "white" }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>
                  {draftCount}
                </Typography>
                <Typography variant="body2">Drafts</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "info.main", color: "white" }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>
                  {totalViews.toLocaleString()}
                </Typography>
                <Typography variant="body2">Total Views</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Blog Posts Table */}
        <Paper
          elevation={0}
          sx={{
            border: (t) => `1px solid ${t.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Post</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="h6" color="text.secondary">
                        No blog posts found
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Create your first blog post to get started!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((post) => {
                    const tags = getTags(post.tags);
                    return (
                      <TableRow key={post.id} hover>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 60,
                                height: 40,
                                borderRadius: 1,
                                backgroundImage: post.featured_image
                                  ? `url(${post.featured_image})`
                                  : "url(https://via.placeholder.com/60x40/f0f0f0/666666?text=No+Image)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body1"
                                fontWeight={600}
                                sx={{ mb: 0.5 }}
                              >
                                {post.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                {post.excerpt
                                  ? post.excerpt.substring(0, 80) + "..."
                                  : "No excerpt available"}
                              </Typography>
                              <Stack direction="row" spacing={0.5}>
                                {tags.slice(0, 2).map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: "0.7rem", height: 20 }}
                                  />
                                ))}
                                {tags.length > 2 && (
                                  <Chip
                                    label={`+${tags.length - 2}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: "0.7rem", height: 20 }}
                                  />
                                )}
                              </Stack>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {post.author_name || "Anonymous"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={post.is_published ? "published" : "draft"}
                            color={getStatusColor(post.is_published) as any}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {post.view_count.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(post.created_at)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(post.id)}
                              sx={{ color: "primary.main" }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(post.id)}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Blog Post</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default BlogListPage;
