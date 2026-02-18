import { Add, Delete, Edit } from "@mui/icons-material";
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
import AdminProtectedRoute from "../../AdminProtectedRoute";
import Layout from "../../Layout";
import {
  adminCreateEvent,
  adminDeleteEvent,
  adminListEvents,
  adminUpdateEvent,
} from "../../api/events";

const AdminEventsPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    open: boolean;
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image_url: string;
    sequence: string;
  }>({
    open: false,
    id: undefined,
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
    sequence: "0",
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminListEvents();
      setItems(data);
    } catch (e) {
      setError("Failed to load events");
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
      date: "",
      location: "",
      image_url: "",
      sequence: "0",
    });
  const openEdit = (e: any) =>
    setDialog({
      open: true,
      id: e.id,
      title: e.title,
      description: e.description,
      date: e.date?.slice(0, 16) || "",
      location: e.location,
      image_url: e.image_url || "",
      sequence: String(e.sequence ?? 0),
    });
  const closeDialog = () =>
    setDialog({
      open: false,
      id: undefined,
      title: "",
      description: "",
      date: "",
      location: "",
      image_url: "",
      sequence: "0",
    });

  const save = async () => {
    try {
      const payload = {
        title: dialog.title,
        description: dialog.description,
        date: dialog.date
          ? new Date(dialog.date).toISOString()
          : new Date().toISOString(),
        location: dialog.location,
        image_url: dialog.image_url || undefined,
        sequence: parseInt(dialog.sequence || "0", 10) || 0,
      } as any;
      if (dialog.id) await adminUpdateEvent(dialog.id, payload);
      else await adminCreateEvent(payload);
      closeDialog();
      load();
    } catch (e) {
      setError("Failed to save event");
    }
  };

  const remove = async (id: number) => {
    try {
      await adminDeleteEvent(id);
      load();
    } catch {
      setError("Failed to delete event");
    }
  };

  return (
    <AdminProtectedRoute>
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4" fontWeight={700}>
              Events
            </Typography>
            <Button startIcon={<Add />} variant="contained" onClick={openNew}>
              New Event
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
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Sequence</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6}>Loading...</TableCell>
                    </TableRow>
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No events</TableCell>
                    </TableRow>
                  ) : (
                    items.map((e) => (
                      <TableRow key={e.id} hover>
                        <TableCell>{e.id}</TableCell>
                        <TableCell>{e.title}</TableCell>
                        <TableCell>
                          {new Date(e.date).toLocaleString()}
                        </TableCell>
                        <TableCell>{e.location}</TableCell>
                        <TableCell>{e.sequence}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => openEdit(e)}>
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => remove(e.id)}
                          >
                            <Delete />
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
            <DialogTitle>{dialog.id ? "Edit Event" : "New Event"}</DialogTitle>
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
                  label="Date & Time"
                  type="datetime-local"
                  value={dialog.date}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, date: e.target.value }))
                  }
                  fullWidth
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
                  label="Image URL"
                  value={dialog.image_url}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, image_url: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Sequence"
                  type="number"
                  value={dialog.sequence}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, sequence: e.target.value }))
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
                disabled={!dialog.title || !dialog.date || !dialog.location}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Layout>
    </AdminProtectedRoute>
  );
};

export default AdminEventsPage;
