import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeMyPassword, getMe, updateMyProfile } from "../api/getProfile";
import ProfilePicture from "../assets/profile-avatar.jpg";
import Layout from "../Layout";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    age?: number | null;
  }>({ name: "", email: "", age: undefined });
  const [pwd, setPwd] = useState({ current: "", next: "" });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const me = await getMe();
        setProfile({
          name: me.name,
          email: me.email,
          age: me.age ?? undefined,
        });
      } catch (e) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setError(null);
      setSuccess(null);
      const updated = await updateMyProfile({
        name: profile.name,
        email: profile.email,
        age: profile.age ?? undefined,
      });
      setProfile({
        name: updated.name,
        email: updated.email,
        age: updated.age ?? undefined,
      });
      setSuccess("Profile updated");
    } catch (e) {
      setError("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      setError(null);
      setSuccess(null);
      await changeMyPassword(pwd.current, pwd.next);
      setPwd({ current: "", next: "" });
      setSuccess("Password changed");
    } catch (e) {
      setError("Failed to change password");
    }
  };

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Avatar src={ProfilePicture} sx={{ width: 64, height: 64 }} />
                <Typography variant="h6" fontWeight={700}>
                  {t("Profile")}
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Age"
                  type="number"
                  value={profile.age ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      age: e.target.value
                        ? parseInt(e.target.value, 10)
                        : undefined,
                    }))
                  }
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {t("Save Profile")}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                {t("Change Password")}
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Current Password"
                  type="password"
                  value={pwd.current}
                  onChange={(e) =>
                    setPwd((p) => ({ ...p, current: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={pwd.next}
                  onChange={(e) =>
                    setPwd((p) => ({ ...p, next: e.target.value }))
                  }
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  disabled={loading || !pwd.current || !pwd.next}
                >
                  {t("Update Password")}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
