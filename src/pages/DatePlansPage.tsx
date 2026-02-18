import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../Layout";
import ProtectedRoute from "../ProtectedRoute";
import {
  createDatePlan,
  DatePlan,
  deleteDatePlan,
  listMyDatePlans,
  updateDatePlan,
} from "../api/dates";

const DatePlansPage = () => {
  const [items, setItems] = useState<DatePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    open: boolean;
    id?: number;
    title: string;
    description: string;
    location: string;
    scheduled_at: string;
  }>({
    open: false,
    id: undefined,
    title: "",
    description: "",
    location: "",
    scheduled_at: "",
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listMyDatePlans();
      setItems(data);
    } catch (e) {
      setError("Failed to load date plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () =>
    setDialog({
      open: true,
      title: "",
      description: "",
      location: "",
      scheduled_at: "",
    });
  const openEdit = (p: DatePlan) =>
    setDialog({
      open: true,
      id: p.id,
      title: p.title,
      description: p.description || "",
      location: p.location || "",
      scheduled_at: p.scheduled_at || "",
    });
  const closeDialog = () =>
    setDialog({
      open: false,
      id: undefined,
      title: "",
      description: "",
      location: "",
      scheduled_at: "",
    });

  const save = async () => {
    try {
      if (dialog.id) {
        await updateDatePlan(dialog.id, {
          title: dialog.title,
          description: dialog.description || undefined,
          location: dialog.location || undefined,
          scheduled_at: dialog.scheduled_at || undefined,
        });
      } else {
        await createDatePlan({
          title: dialog.title,
          description: dialog.description || undefined,
          location: dialog.location || undefined,
          scheduled_at: dialog.scheduled_at || undefined,
        });
      }
      closeDialog();
      load();
    } catch (e) {
      setError("Failed to save");
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteDatePlan(id);
      load();
    } catch {
      setError("Failed to delete");
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4" fontWeight={700}>
              My Date Plans
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={openNew}
            >
              New Plan
            </Button>
          </Stack>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
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
                    <TableCell>Title</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Scheduled</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5}>Loading...</TableCell>
                    </TableRow>
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>No date plans</TableCell>
                    </TableRow>
                  ) : (
                    items.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.title}</TableCell>
                        <TableCell>{p.location || "-"}</TableCell>
                        <TableCell>
                          {p.scheduled_at
                            ? new Date(p.scheduled_at).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>{p.status}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => openEdit(p)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => remove(p.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Dialog open={dialog.open} onClose={closeDialog} fullWidth>
            <DialogTitle>
              {dialog.id ? "Edit Date Plan" : "New Date Plan"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Title"
                  value={dialog.title}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, title: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={dialog.description}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, description: e.target.value }))
                  }
                  fullWidth
                  multiline
                  rows={3}
                />
                <TextField
                  label="Location"
                  value={dialog.location}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, location: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Scheduled At (ISO)"
                  value={dialog.scheduled_at}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, scheduled_at: e.target.value }))
                  }
                  fullWidth
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button
                onClick={save}
                variant="contained"
                disabled={!dialog.title}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
};

export default DatePlansPage;
