import {
  ArrowBack as ArrowBackIcon,
  Preview as PreviewIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";

// Hardcoded blog data for editing
const existingBlogPosts = [
  {
    id: "cafe-hopping-brunch-trail",
    title: "Cafe Hopping & Brunch Trail: The Ultimate Guide",
    excerpt:
      "Discover the best cafés and brunch spots in the city. From cozy corners to Instagram-worthy lattes, plan your perfect morning adventure.",
    content: `
      <h2>Why Cafe Hopping Makes the Perfect Date</h2>
      <p>Cafe hopping isn't just about coffee—it's about creating shared experiences and discovering new places together. This date idea combines adventure, conversation, and delicious treats in a relaxed setting.</p>
      
      <h3>Planning Your Cafe Trail</h3>
      <p>Start by researching cafes in your area. Look for places with different vibes: a cozy corner cafe for intimate conversation, a trendy spot for Instagram photos, and a hidden gem for authentic local flavor.</p>
      
      <h3>What to Order</h3>
      <ul>
        <li><strong>First Stop:</strong> Light pastries and coffee to start the day</li>
        <li><strong>Second Stop:</strong> Hearty brunch items and specialty drinks</li>
        <li><strong>Final Stop:</strong> Dessert and a final coffee to end on a sweet note</li>
      </ul>
    `,
    author: "Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coffee", "Brunch", "Adventure", "Food"],
    status: "published",
  },
  // Add more posts as needed
];

const BlogAddEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  // Find existing post if editing
  const existingPost = isEdit
    ? existingBlogPosts.find((post) => post.id === id)
    : null;

  // Form state
  const [formData, setFormData] = useState({
    title: existingPost?.title || "",
    excerpt: existingPost?.excerpt || "",
    content: existingPost?.content || "",
    author: existingPost?.author || "",
    image: existingPost?.image || "",
    tags: existingPost?.tags || [],
    status: existingPost?.status || "draft",
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    // In real app, this would call API to save
    console.log("Saving blog post:", formData);
    alert(`${isEdit ? "Updated" : "Created"} blog post successfully!`);
    navigate("/admin/blog-list");
  };

  const handlePreview = () => {
    // In real app, this would open preview modal or navigate to preview page
    alert("Preview functionality would be implemented here");
  };

  const handleBack = () => {
    navigate("/admin/blog-list");
  };

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ borderRadius: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" fontWeight={700}>
            {isEdit ? "Edit Blog Post" : "Add New Blog Post"}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Main Form */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Basic Information */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Basic Information
                </Typography>

                <Stack spacing={3}>
                  <TextField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    fullWidth
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    placeholder="Enter blog post title..."
                  />

                  <TextField
                    label="Excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    fullWidth
                    multiline
                    rows={3}
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    placeholder="Brief description of the blog post..."
                  />

                  <TextField
                    label="Author"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    fullWidth
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    placeholder="Author name..."
                  />

                  <TextField
                    label="Featured Image URL"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    fullWidth
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    placeholder="https://example.com/image.jpg"
                  />
                </Stack>
              </Paper>

              {/* Content */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Content
                </Typography>

                <TextField
                  label="Blog Content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  fullWidth
                  multiline
                  rows={15}
                  variant="filled"
                  sx={{ bgcolor: "light.main" }}
                  placeholder="Write your blog post content here... You can use HTML tags for formatting."
                  helperText="You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; for formatting"
                />
              </Paper>

              {/* Tags */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Tags
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {formData.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      label="Add Tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      size="small"
                      variant="filled"
                      sx={{ bgcolor: "light.main", flex: 1 }}
                    />
                    <Button variant="outlined" onClick={handleAddTag}>
                      Add
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Publish Settings */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Publish Settings
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="draft"
                      control={<Radio />}
                      label="Save as Draft"
                    />
                    <FormControlLabel
                      value="published"
                      control={<Radio />}
                      label="Publish Now"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>

              {/* Image Preview */}
              {formData.image && (
                <Paper
                  elevation={0}
                  sx={{
                    border: (t) => `1px solid ${t.palette.divider}`,
                    borderRadius: 1,
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Image Preview
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      borderRadius: 1,
                      backgroundImage: `url(${formData.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Paper>
              )}

              {/* Actions */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Actions
                </Typography>

                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #fbbf24 100%)",
                      borderRadius: "10px",
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #7c3aed 100%)",
                      },
                    }}
                  >
                    {isEdit ? "Update Post" : "Create Post"}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<PreviewIcon />}
                    onClick={handlePreview}
                    fullWidth
                    sx={{ borderRadius: "10px", py: 1.5 }}
                  >
                    Preview
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default BlogAddEditPage;
