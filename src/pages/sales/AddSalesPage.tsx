import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
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
import { DatePlan } from "./data/dateData";

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

const AddSalesPage = () => {
  const theme = useTheme();
  const { addNewSale } = useSalesContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showIdeas, setShowIdeas] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

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
    const searchParams = new URLSearchParams(location.search);
    const editData = searchParams.get("edit");

    if (editData) {
      try {
        const planData = JSON.parse(decodeURIComponent(editData));
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
        console.error("Error parsing edit data:", error);
      }
    }
  }, [location.search]);

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

  const handleSubmit = () => {
    const planId = isEditMode
      ? editingPlan.plan_id
      : `plan_${Math.floor(Math.random() * 10000)}`;

    const saleData: NewSaleData = {
      plan_id: planId,
      owner: form.owner,
      date_plan: {
        ...form.date_plan,
        location: { city: form.date_plan.city },
        plan_status: "Active",
      },
      location_enhance: form.location_enhance,
    };

    if (isEditMode) {
      // Update existing plan
      console.log("Updated plan:", saleData);
      alert("✅ Date plan updated successfully!");
      navigate("/sales-history");
    } else {
      // Add new plan
      addNewSale(saleData as DatePlan);
      console.log("Post JSON:", saleData);
      alert(
        "✅ Date plan created successfully! Check the Sales page to see your new plan."
      );
    }

    // Reset form
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

    setIsEditMode(false);
    setEditingPlan(null);
  };

  return (
    <Layout>
      <Box
        sx={{ p: { xs: 2, md: 4 }, display: "flex", justifyContent: "center" }}
      >
        <Paper
          sx={{
            maxWidth: 800,
            width: "100%",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            mb={3}
            sx={{ color: theme.palette.text.primary }}
          >
            {isEditMode ? "Edit Date Plan" : "Create New Date Plan"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

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
                onChange={(e) => handleChange("owner.user_id", e.target.value)}
                fullWidth
              />
              <TextField
                label="Name"
                value={form.owner.name}
                onChange={(e) => handleChange("owner.name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Avatar (URL or upload link)"
                value={form.owner.avatar}
                onChange={(e) => handleChange("owner.avatar", e.target.value)}
                fullWidth
              />
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
                onChange={(e) => handleChange("owner.gender", e.target.value)}
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
              onChange={(e) => handleChange("date_plan.title", e.target.value)}
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
                      handleArrayChange("date_plan.tags", i, e.target.value)
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
                Timeline
              </Typography>
              {form.date_plan.timeline.map((t: string, i: number) => (
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
                    placeholder={`Event ${i + 1}`}
                    value={t}
                    onChange={(e) =>
                      handleArrayChange("date_plan.timeline", i, e.target.value)
                    }
                    sx={{ flexGrow: 1 }}
                  />
                  <IconButton
                    onClick={() => removeArray("date_plan.timeline", i)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  {i === form.date_plan.timeline.length - 1 && (
                    <IconButton
                      onClick={() => addArray("date_plan.timeline")}
                      color="primary"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            <TextField
              select
              label="City / State"
              value={form.date_plan.city}
              onChange={(e) => handleChange("date_plan.city", e.target.value)}
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
      </Box>
    </Layout>
  );
};

export default AddSalesPage;
