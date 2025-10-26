import {
  AccessTime,
  AutoAwesome,
  Favorite,
  LocationOn,
  Psychology,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ASILogo from "./ASILogo";

interface AIPreferences {
  // Location preferences
  maxDistance: number; // in km
  preferredLocations: string[];

  // Time preferences
  preferredTimes: string[];
  maxDuration: number; // in hours

  // Activity preferences
  activityTypes: string[];
  budgetRange: [number, number]; // min, max in local currency

  // Personality matching
  personalityTraits: string[];
  interests: string[];

  // AI learning preferences
  learnFromBehavior: boolean;
  adaptiveRecommendations: boolean;
}

interface AIDatePlan {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: number;
  cost: number;
  aiScore: number; // 0-100
  aiReasons: string[];
  compatibilityScore: number; // 0-100
  tags: string[];
}

const AIDateFilter: React.FC = () => {
  const theme = useTheme();
  const [preferences, setPreferences] = useState<AIPreferences>({
    maxDistance: 50,
    preferredLocations: ["Kuala Lumpur", "Petaling Jaya"],
    preferredTimes: ["evening", "weekend"],
    maxDuration: 4,
    activityTypes: ["dining", "entertainment", "outdoor"],
    budgetRange: [50, 200],
    personalityTraits: ["adventurous", "romantic", "social"],
    interests: ["art", "music", "food"],
    learnFromBehavior: true,
    adaptiveRecommendations: true,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIDatePlan[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Simulate AI analysis
  const analyzeWithAI = async () => {
    setIsAnalyzing(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI recommendations based on preferences
    const mockRecommendations: AIDatePlan[] = [
      {
        id: "ai_001",
        title: "AI-Recommended Art Gallery & Rooftop Dinner",
        description:
          "Perfect match based on your artistic interests and romantic preferences",
        location: "Kuala Lumpur",
        duration: 3,
        cost: 120,
        aiScore: 95,
        aiReasons: [
          "Matches your art interest (95% compatibility)",
          "Romantic setting aligns with personality",
          "Within your budget range",
          "Optimal timing for evening preference",
        ],
        compatibilityScore: 92,
        tags: ["art", "romantic", "dining", "evening"],
      },
      {
        id: "ai_002",
        title: "AI-Curated Music Venue & Late Night Walk",
        description:
          "Adventure meets music - tailored for your social personality",
        location: "Petaling Jaya",
        duration: 4,
        cost: 80,
        aiScore: 88,
        aiReasons: [
          "Music venue matches your interests",
          "Social setting for your personality",
          "Adventure element included",
          "Perfect for weekend timing",
        ],
        compatibilityScore: 85,
        tags: ["music", "social", "adventure", "weekend"],
      },
      {
        id: "ai_003",
        title: "AI-Selected Food Tour & Cultural Experience",
        description:
          "Foodie adventure with cultural insights - AI optimized for your tastes",
        location: "Kuala Lumpur",
        duration: 3.5,
        cost: 150,
        aiScore: 82,
        aiReasons: [
          "Food interest alignment",
          "Cultural experience bonus",
          "Within distance preference",
          "Adventure element included",
        ],
        compatibilityScore: 78,
        tags: ["food", "cultural", "adventure", "evening"],
      },
    ];

    setAiRecommendations(mockRecommendations);
    setIsAnalyzing(false);
  };

  const updatePreference = (key: keyof AIPreferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Box>
      {/* ASI Header */}
      <Card
        sx={{
          mb: 3,
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ASILogo variant="compact" size="large" showText={true} />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  AI-Powered Date Matching
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Advanced algorithms analyze your preferences to find perfect
                  matches
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AutoAwesome />}
              label="ASI Enhanced"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* AI Preferences Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Psychology sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={600}>
              AI Learning Preferences
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Hide" : "Show"} Advanced
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* Basic Preferences */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Location Preferences
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Maximum Distance: {preferences.maxDistance} km
                </Typography>
                <Slider
                  value={preferences.maxDistance}
                  onChange={(_, value) =>
                    updatePreference("maxDistance", value)
                  }
                  min={5}
                  max={100}
                  step={5}
                  marks={[
                    { value: 10, label: "10km" },
                    { value: 50, label: "50km" },
                    { value: 100, label: "100km" },
                  ]}
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Preferred Locations</InputLabel>
                <Select
                  multiple
                  value={preferences.preferredLocations}
                  onChange={(e) =>
                    updatePreference("preferredLocations", e.target.value)
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Kuala Lumpur">Kuala Lumpur</MenuItem>
                  <MenuItem value="Petaling Jaya">Petaling Jaya</MenuItem>
                  <MenuItem value="Bangsar">Bangsar</MenuItem>
                  <MenuItem value="Mont Kiara">Mont Kiara</MenuItem>
                  <MenuItem value="Damansara">Damansara</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Time & Duration
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Maximum Duration: {preferences.maxDuration} hours
                </Typography>
                <Slider
                  value={preferences.maxDuration}
                  onChange={(_, value) =>
                    updatePreference("maxDuration", value)
                  }
                  min={1}
                  max={8}
                  step={0.5}
                  marks={[
                    { value: 2, label: "2h" },
                    { value: 4, label: "4h" },
                    { value: 6, label: "6h" },
                  ]}
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel>Preferred Times</InputLabel>
                <Select
                  multiple
                  value={preferences.preferredTimes}
                  onChange={(e) =>
                    updatePreference("preferredTimes", e.target.value)
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                  <MenuItem value="weekend">Weekend</MenuItem>
                  <MenuItem value="weekday">Weekday</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Advanced Preferences */}
            {showAdvanced && (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Activity Types
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Activity Types</InputLabel>
                    <Select
                      multiple
                      value={preferences.activityTypes}
                      onChange={(e) =>
                        updatePreference("activityTypes", e.target.value)
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="dining">Dining</MenuItem>
                      <MenuItem value="entertainment">Entertainment</MenuItem>
                      <MenuItem value="outdoor">Outdoor</MenuItem>
                      <MenuItem value="cultural">Cultural</MenuItem>
                      <MenuItem value="sports">Sports</MenuItem>
                      <MenuItem value="shopping">Shopping</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Budget Range
                  </Typography>
                  <Box sx={{ px: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Budget: RM{preferences.budgetRange[0]} - RM
                      {preferences.budgetRange[1]}
                    </Typography>
                    <Slider
                      value={preferences.budgetRange}
                      onChange={(_, value) =>
                        updatePreference("budgetRange", value)
                      }
                      min={20}
                      max={500}
                      step={10}
                      marks={[
                        { value: 50, label: "RM50" },
                        { value: 200, label: "RM200" },
                        { value: 500, label: "RM500" },
                      ]}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    AI Learning Settings
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.learnFromBehavior}
                          onChange={(e) =>
                            updatePreference(
                              "learnFromBehavior",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Learn from my behavior"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.adaptiveRecommendations}
                          onChange={(e) =>
                            updatePreference(
                              "adaptiveRecommendations",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Adaptive recommendations"
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={analyzeWithAI}
              disabled={isAnalyzing}
              startIcon={
                isAnalyzing ? <CircularProgress size={20} /> : <Psychology />
              }
              sx={{
                bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 4,
                py: 1.5,
              }}
            >
              {isAnalyzing ? "AI Analyzing..." : "Analyze with ASI"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <AutoAwesome sx={{ color: "primary.main" }} />
              <Typography variant="h6" fontWeight={600}>
                AI-Generated Recommendations
              </Typography>
              <Chip
                label={`${aiRecommendations.length} matches found`}
                color="primary"
                size="small"
              />
            </Box>

            <Grid container spacing={2}>
              {aiRecommendations.map((plan) => (
                <Grid item xs={12} md={6} key={plan.id}>
                  <Card
                    sx={{
                      height: "100%",
                      border: `2px solid ${
                        plan.aiScore >= 90
                          ? theme.palette.success.main
                          : plan.aiScore >= 80
                          ? theme.palette.primary.main
                          : theme.palette.warning.main
                      }`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: theme.shadows[8],
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          {plan.title}
                        </Typography>
                        <Chip
                          label={`${plan.aiScore}% AI Score`}
                          color={
                            plan.aiScore >= 90
                              ? "success"
                              : plan.aiScore >= 80
                              ? "primary"
                              : "warning"
                          }
                          size="small"
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {plan.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        {plan.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationOn
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2">
                            {plan.location}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTime
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2">
                            {plan.duration}h
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={600}>
                          RM{plan.cost}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          gutterBottom
                        >
                          Why AI recommends this:
                        </Typography>
                        {plan.aiReasons.map((reason, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{ mb: 0.5 }}
                          >
                            • {reason}
                          </Typography>
                        ))}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Favorite
                            sx={{ fontSize: 16, color: "error.main" }}
                          />
                          <Typography variant="body2">
                            Compatibility: {plan.compatibilityScore}%
                          </Typography>
                        </Box>
                        <Button variant="contained" size="small">
                          Select This Plan
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AIDateFilter;
