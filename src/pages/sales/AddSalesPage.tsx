import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSalesContext } from "../../context/sales-context";
import Layout from "../../Layout";
import IdeasBanner from "./components/IdeasBanner";

interface NewSaleData {
  plan_id: string;
  owner: any;
  date_plan: any;
  location_enhance: string;
}

const states = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
];
const genders = ["Male", "Female", "Non-binary"];
const prefGenders = ["Male", "Female", "Any"];

// NFT Avatar options
const nftAvatars = [
  {
    id: "avatar_1",
    name: "Cool Cat",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=cat&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_2",
    name: "Robot Friend",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=robot&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_3",
    name: "Space Explorer",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=space&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_4",
    name: "Artistic Soul",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_5",
    name: "Music Lover",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=music&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_6",
    name: "Nature Spirit",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=nature&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_7",
    name: "Tech Guru",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
  {
    id: "avatar_8",
    name: "Adventure Seeker",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=adventure&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
  },
];

// Date plan templates
const datePlanTemplates = [
  {
    id: "coffee_date",
    name: "Coffee Date",
    icon: "☕",
    timeline: [
      { time: "2:00pm", title: "Meet at café" },
      { time: "2:30pm", title: "Coffee & conversation" },
      { time: "4:00pm", title: "Walk in the park" },
    ],
    tags: ["Coffee", "Chill", "Conversation"],
  },
  {
    id: "dinner_date",
    name: "Dinner Date",
    icon: "🍽️",
    timeline: [
      { time: "7:00pm", title: "Meet at restaurant" },
      { time: "7:30pm", title: "Dinner" },
      { time: "9:30pm", title: "Evening walk" },
    ],
    tags: ["Dinner", "Romantic", "Food"],
  },
  {
    id: "adventure_date",
    name: "Adventure Date",
    icon: "🏃‍♂️",
    timeline: [
      { time: "10:00am", title: "Meet at activity center" },
      { time: "10:30am", title: "Adventure activity" },
      { time: "12:30pm", title: "Lunch break" },
      { time: "2:00pm", title: "Continue adventure" },
    ],
    tags: ["Adventure", "Active", "Fun"],
  },
  {
    id: "movie_date",
    name: "Movie Date",
    icon: "🎬",
    timeline: [
      { time: "6:00pm", title: "Meet at cinema" },
      { time: "6:30pm", title: "Watch movie" },
      { time: "8:30pm", title: "Post-movie discussion" },
    ],
    tags: ["Movie", "Entertainment", "Chill"],
  },
  {
    id: "art_date",
    name: "Art & Culture",
    icon: "🎨",
    timeline: [
      { time: "11:00am", title: "Meet at gallery" },
      { time: "11:30am", title: "Gallery tour" },
      { time: "1:00pm", title: "Art workshop" },
      { time: "3:00pm", title: "Coffee & discussion" },
    ],
    tags: ["Art", "Creative", "Cultural"],
  },
  {
    id: "beach_date",
    name: "Beach Date",
    icon: "🏖️",
    timeline: [
      { time: "9:00am", title: "Meet at beach" },
      { time: "9:30am", title: "Beach activities" },
      { time: "12:00pm", title: "Beachside lunch" },
      { time: "2:00pm", title: "Relax & swim" },
    ],
    tags: ["Beach", "Outdoor", "Relaxing"],
  },
];

const AddSalesPage = () => {
  const theme = useTheme();
  const { addNewSale } = useSalesContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showIdeas, setShowIdeas] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [timelineErrors, setTimelineErrors] = useState<string[]>([]);

  const [form, setForm] = useState<any>({
    owner: {
      user_id: "",
      name: "",
      avatar: "",
      age_range: "",
      gender: "",
      looking_for_gender: "",
    },
    date_plan: {
      title: "",
      description: "",
      tags: [""],
      city: "",
      timeline: [""],
    },
    location_enhance: "",
  });

  // Handle edit mode initialization
  useEffect(() => {
    // Check if we have edit data from navigation state
    const editPlan = location.state?.editPlan;

    if (editPlan) {
      setIsEditMode(true);
      setEditingPlan(editPlan);

      // Pre-populate form with existing data
      setForm({
        owner: {
          user_id: editPlan.owner?.user_id || "",
          name: editPlan.owner?.name || "",
          avatar: editPlan.owner?.avatar || "",
          age_range: editPlan.owner?.age_range || "",
          gender: editPlan.owner?.gender || "",
          looking_for_gender: editPlan.owner?.looking_for_gender || "",
        },
        date_plan: {
          title: editPlan.date_plan?.title || "",
          description: editPlan.date_plan?.description || "",
          tags: editPlan.date_plan?.tags || [""],
          city: editPlan.date_plan?.location?.city || "",
          timeline: editPlan.date_plan?.timeline || [""],
        },
        location_enhance: editPlan.location_enhance || "",
      });
    } else {
      // Check localStorage for existing plan
      const storedPlan = localStorage.getItem("userDatePlan");
      if (storedPlan) {
        try {
          const planData = JSON.parse(storedPlan);
          setIsEditMode(true);
          setEditingPlan(planData);

          // Pre-populate form with existing data
          setForm({
            owner: {
              user_id: planData.owner?.user_id || "",
              name: planData.owner?.name || "",
              avatar: planData.owner?.avatar || "",
              age_range: planData.owner?.age_range || "",
              gender: planData.owner?.gender || "",
              looking_for_gender: planData.owner?.looking_for_gender || "",
            },
            date_plan: {
              title: planData.date_plan?.title || "",
              description: planData.date_plan?.description || "",
              tags: planData.date_plan?.tags || [""],
              city: planData.date_plan?.location?.city || "",
              timeline: planData.date_plan?.timeline || [""],
            },
            location_enhance: planData.location_enhance || "",
          });
        } catch (error) {
          console.error("Error parsing stored plan:", error);
        }
      }
    }
  }, [location.state, location.search]);

  const handleChange = (path: string, value: string) => {
    const [root, key] = path.split(".");
    setForm((p: any) => ({
      ...p,
      [root]: { ...p[root], [key]: value },
    }));
  };

  const handleArrayChange = (path: string, i: number, v: string) => {
    const [root, key] = path.split(".");
    const arr = [...(form as any)[root][key]];
    arr[i] = v;
    setForm((p: any) => ({ ...p, [root]: { ...p[root], [key]: arr } }));
  };

  const addArray = (path: string) => {
    const [root, key] = path.split(".");
    setForm((p: any) => ({
      ...p,
      [root]: { ...p[root], [key]: [...p[root][key], ""] },
    }));
  };

  const removeArray = (path: string, i: number) => {
    const [root, key] = path.split(".");
    const arr = (form as any)[root][key].filter((_: any, x: number) => x !== i);
    setForm((p: any) => ({ ...p, [root]: { ...p[root], [key]: arr } }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = datePlanTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setForm((prev: any) => ({
        ...prev,
        date_plan: {
          ...prev.date_plan,
          title: template.name,
          timeline: template.timeline.map(
            (item) => `${item.time} - ${item.title}`
          ),
          tags: template.tags,
        },
      }));
      // Clear timeline errors when template is selected
      setTimelineErrors([]);
    }
  };

  const validateTimeline = () => {
    const errors: string[] = [];

    // Check if timeline is empty
    if (!form.date_plan.timeline || form.date_plan.timeline.length === 0) {
      errors.push("Timeline cannot be empty. Please add at least one event.");
      return errors;
    }

    // Check each timeline entry
    form.date_plan.timeline.forEach((item: string, index: number) => {
      if (!item || item.trim() === "") {
        errors.push(`Event ${index + 1} cannot be empty.`);
        return;
      }

      // Check if it follows the format "time - title"
      if (!item.includes(" - ")) {
        errors.push(
          `Event ${
            index + 1
          } must follow the format "time - title" (e.g., "2:00pm - Meet at café").`
        );
        return;
      }

      const [time, title] = item.split(" - ");
      if (!time || time.trim() === "") {
        errors.push(`Event ${index + 1} must have a time.`);
      }
      if (!title || title.trim() === "") {
        errors.push(`Event ${index + 1} must have a title.`);
      }
    });

    return errors;
  };
  const handleSubmit = () => {
    // Validate timeline before submitting
    const timelineValidationErrors = validateTimeline();
    if (timelineValidationErrors.length > 0) {
      setTimelineErrors(timelineValidationErrors);
      return; // Stop submission if there are errors
    }

    // Clear any previous errors
    setTimelineErrors([]);

    const planId =
      form.plan_id ||
      (isEditMode && editingPlan?.plan_id) ||
      `plan_${Date.now()}`;

    // convert timeline strings → { time, title }
    const timelineObjects = form.date_plan.timeline.map((item: string) => {
      const [time, title] = item.split(" - ");
      return { time: time?.trim() || "", title: title?.trim() || "" };
    });

    const saleData: NewSaleData = {
      plan_id: planId,
      owner: form.owner,
      date_plan: {
        ...form.date_plan,
        location: { city: form.date_plan.city },
        timeline: timelineObjects,
        plan_status: "Active",
      },
      location_enhance: form.location_enhance,
    };

    localStorage.setItem("userDatePlan", JSON.stringify(saleData));
    setShowSuccessDialog(true);
  };

  return (
    <Layout>
      <Box
        sx={{ p: { xs: 2, md: 4 }, display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ maxWidth: 1200, width: "100%" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            mb={4}
            sx={{ color: theme.palette.text.primary }}
          >
            {isEditMode ? "Edit Date Plan" : "Create New Date Plan"}
          </Typography>

          <Grid container spacing={4}>
            {/* Left Column - Template Pills */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  borderRadius: 0,
                  p: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                  position: "sticky",
                  top: 20,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  mb={2}
                  sx={{ color: theme.palette.text.primary }}
                >
                  Choose Date Template
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Select a template to auto-fill your date plan
                </Typography>

                <Stack spacing={2}>
                  {datePlanTemplates.map((template) => (
                    <Chip
                      key={template.id}
                      label={`${template.icon} ${template.name}`}
                      onClick={() => handleTemplateSelect(template.id)}
                      variant={
                        selectedTemplate === template.id ? "filled" : "outlined"
                      }
                      sx={{
                        justifyContent: "flex-start",
                        height: "auto",
                        py: 1.5,
                        px: 2,
                        fontSize: "0.9rem",
                        fontWeight:
                          selectedTemplate === template.id ? 600 : 500,
                        backgroundColor:
                          selectedTemplate === template.id
                            ? theme.palette.primary.main
                            : "transparent",
                        color:
                          selectedTemplate === template.id
                            ? "white"
                            : theme.palette.text.primary,
                        borderColor: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor:
                            selectedTemplate === template.id
                              ? theme.palette.primary.dark
                              : theme.palette.primary.light,
                          color: "white",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Right Column - Form */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  borderRadius: 0,
                  p: { xs: 3, md: 5 },
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Stack spacing={3}>
                  {/* SECTION: Owner */}
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Owner Information
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      label="User ID"
                      value={form.owner.user_id}
                      onChange={(e) =>
                        handleChange("owner.user_id", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Name"
                      value={form.owner.name}
                      onChange={(e) =>
                        handleChange("owner.name", e.target.value)
                      }
                      fullWidth
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <TextField
                        select
                        label="Choose NFT Avatar"
                        value={form.owner.avatar}
                        onChange={(e) =>
                          handleChange("owner.avatar", e.target.value)
                        }
                        sx={{ flexGrow: 1 }}
                        SelectProps={{
                          renderValue: (value) => {
                            const avatar = nftAvatars.find(
                              (a) => a.url === value
                            );
                            return avatar ? avatar.name : "Select Avatar";
                          },
                        }}
                      >
                        {nftAvatars.map((avatar) => (
                          <MenuItem key={avatar.id} value={avatar.url}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                component="img"
                                src={avatar.url}
                                alt={avatar.name}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  border: "2px solid",
                                  borderColor: "divider",
                                }}
                              />
                              <Typography variant="body2">
                                {avatar.name}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Avatar Preview */}
                      {form.owner.avatar && (
                        <Box
                          component="img"
                          src={form.owner.avatar}
                          alt="Selected Avatar"
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            border: "3px solid",
                            borderColor: theme.palette.primary.main,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />
                      )}
                    </Box>
                    <TextField
                      label="Age Range (e.g. 25–30)"
                      value={form.owner.age_range}
                      onChange={(e) =>
                        handleChange("owner.age_range", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      select
                      label="Gender"
                      value={form.owner.gender}
                      onChange={(e) =>
                        handleChange("owner.gender", e.target.value)
                      }
                      fullWidth
                    >
                      {genders.map((g) => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Looking For (Gender)"
                      value={form.owner.looking_for_gender}
                      onChange={(e) =>
                        handleChange("owner.looking_for_gender", e.target.value)
                      }
                      fullWidth
                    >
                      {prefGenders.map((g) => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  {/* SECTION: Plan */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      Date Plan Details
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": { bgcolor: theme.palette.primary.dark },
                      }}
                      onClick={() => setShowIdeas((p) => !p)}
                    >
                      {showIdeas ? <CloseIcon /> : <SearchIcon />}
                    </IconButton>
                  </Box>

                  {showIdeas && (
                    <Paper
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        borderColor: theme.palette.primary.main,
                        bgcolor: theme.palette.action.hover,
                        p: 2,
                      }}
                    >
                      <IdeasBanner />
                    </Paper>
                  )}

                  <TextField
                    label="Title"
                    value={form.date_plan.title}
                    onChange={(e) =>
                      handleChange("date_plan.title", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    multiline
                    minRows={3}
                    value={form.date_plan.description}
                    onChange={(e) =>
                      handleChange("date_plan.description", e.target.value)
                    }
                    fullWidth
                  />

                  {/* ARRAY FIELDS */}
                  <Box>
                    <Typography fontWeight={600} mb={1}>
                      Tags
                    </Typography>
                    {form.date_plan.tags.map((t: string, i: number) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          bgcolor: theme.palette.action.hover,
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        <TextField
                          variant="standard"
                          placeholder={`Tag ${i + 1}`}
                          value={t}
                          onChange={(e) =>
                            handleArrayChange(
                              "date_plan.tags",
                              i,
                              e.target.value
                            )
                          }
                          sx={{ flexGrow: 1 }}
                        />
                        <IconButton
                          onClick={() => removeArray("date_plan.tags", i)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        {i === form.date_plan.tags.length - 1 && (
                          <IconButton
                            onClick={() => addArray("date_plan.tags")}
                            color="primary"
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Box>
                    <Typography fontWeight={600} mb={1}>
                      Timeline *
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Format: "time - title" (e.g., "2:00pm - Meet at café")
                    </Typography>

                    {/* Timeline Error Messages */}
                    {timelineErrors.length > 0 && (
                      <Box
                        sx={{
                          bgcolor: theme.palette.error.light,
                          color: theme.palette.error.contrastText,
                          borderRadius: 2,
                          p: 2,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ mb: 1 }}
                        >
                          Please fix the following timeline issues:
                        </Typography>
                        {timelineErrors.map((error, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{ ml: 1 }}
                          >
                            • {error}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {form.date_plan.timeline.map((t: string, i: number) => {
                      // Check if this specific timeline entry has errors
                      const hasError = timelineErrors.some((error) =>
                        error.includes(`Event ${i + 1}`)
                      );

                      return (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            bgcolor: hasError
                              ? theme.palette.error.light + "20"
                              : theme.palette.action.hover,
                            borderRadius: 2,
                            p: 1,
                            border: hasError
                              ? `1px solid ${theme.palette.error.main}`
                              : "none",
                          }}
                        >
                          <TextField
                            variant="standard"
                            placeholder={`Event ${i + 1}: time - title`}
                            value={t}
                            onChange={(e) => {
                              handleArrayChange(
                                "date_plan.timeline",
                                i,
                                e.target.value
                              );
                              // Clear errors when user starts typing
                              if (timelineErrors.length > 0) {
                                setTimelineErrors([]);
                              }
                            }}
                            error={hasError}
                            helperText={
                              hasError ? "Check format: time - title" : ""
                            }
                            sx={{ flexGrow: 1 }}
                          />
                          <IconButton
                            onClick={() => {
                              removeArray("date_plan.timeline", i);
                              // Clear errors when timeline is modified
                              setTimelineErrors([]);
                            }}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          {i === form.date_plan.timeline.length - 1 && (
                            <IconButton
                              onClick={() => {
                                addArray("date_plan.timeline");
                                // Clear errors when timeline is modified
                                setTimelineErrors([]);
                              }}
                              color="primary"
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      );
                    })}

                    {/* Add Timeline Button if empty */}
                    {form.date_plan.timeline.length === 0 && (
                      <Box
                        sx={{
                          border: `2px dashed ${theme.palette.divider}`,
                          borderRadius: 2,
                          p: 3,
                          textAlign: "center",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            bgcolor: theme.palette.primary.light + "10",
                          },
                        }}
                        onClick={() => addArray("date_plan.timeline")}
                      >
                        <Typography color="text.secondary">
                          Click to add your first timeline event
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <TextField
                    select
                    label="City / State"
                    value={form.date_plan.city}
                    onChange={(e) =>
                      handleChange("date_plan.city", e.target.value)
                    }
                    fullWidth
                  >
                    {states.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Divider sx={{ my: 2 }} />

                  {/* SECTION: Optional */}
                  <Typography variant="subtitle1" fontWeight={600}>
                    Optional Enhancements
                  </Typography>
                  <TextField
                    label="Enhance Location Plan (optional)"
                    value={form.location_enhance}
                    onChange={(e) =>
                      setForm({ ...form, location_enhance: e.target.value })
                    }
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 3,
                      alignSelf: "center",
                      px: 6,
                      borderRadius: 3,
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                    onClick={handleSubmit}
                  >
                    {isEditMode ? "Update Date Plan" : "Submit Date Plan"}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            p: 0,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Confetti Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: 8,
                height: 8,
                backgroundColor: [
                  "#FF6B6B",
                  "#4ECDC4",
                  "#45B7D1",
                  "#96CEB4",
                  "#FFEAA7",
                  "#DDA0DD",
                  "#98D8C8",
                  "#F7DC6F",
                ][i % 8],
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `confetti 3s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                "@keyframes confetti": {
                  "0%": {
                    transform: "translateY(-100vh) rotate(0deg)",
                    opacity: 1,
                  },
                  "100%": {
                    transform: "translateY(100vh) rotate(720deg)",
                    opacity: 0,
                  },
                },
              }}
            />
          ))}
        </Box>

        <DialogContent
          sx={{
            textAlign: "center",
            p: 4,
            backgroundColor: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 48,
                  color: "white",
                }}
              />
            </Box>
          </Box>

          {/* Success Message */}
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Success!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              fontWeight: 500,
            }}
          >
            {isEditMode
              ? "Date plan updated successfully!"
              : "Date plan created successfully!"}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            Check the Sales History page to see your plan.
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/sales-history");
              }}
            >
              View History
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={() => {
                setShowSuccessDialog(false);
                // Reset form for new plan
                setForm({
                  owner: {
                    user_id: "",
                    name: "",
                    avatar: "",
                    age_range: "",
                    gender: "",
                    looking_for_gender: "",
                  },
                  date_plan: {
                    title: "",
                    description: "",
                    tags: [""],
                    city: "",
                    timeline: [""],
                  },
                  location_enhance: "",
                });
                setSelectedTemplate(null);
                setIsEditMode(false);
                setEditingPlan(null);
              }}
            >
              Create Another
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AddSalesPage;
