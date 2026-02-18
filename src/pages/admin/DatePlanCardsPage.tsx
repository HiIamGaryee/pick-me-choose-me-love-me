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
import {
  adminCreateCard,
  adminDeleteCard,
  adminListCards,
  adminUpdateCard,
  DatePlanCard,
} from "../../api/admin/datePlanCards";
import Layout from "../../Layout";

const DatePlanCardsPage = () => {
  const [items, setItems] = useState<DatePlanCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    open: boolean;
    id?: number;
    title: string;
    subtitle: string;
    price: string;
    status: string;
  }>({
    open: false,
    id: undefined,
    title: "",
    subtitle: "",
    price: "",
    status: "draft",
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminListCards({ limit: 100, skip: 0 });
      setItems(data);
    } catch (e) {
      setError("Failed to load cards");
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
      subtitle: "",
      price: "",
      status: "draft",
    });
  const openEdit = (c: DatePlanCard) =>
    setDialog({
      open: true,
      id: c.id,
      title: c.title,
      subtitle: c.subtitle || "",
      price: String(c.price ?? 0),
      status: c.status,
    });
  const closeDialog = () =>
    setDialog({
      open: false,
      id: undefined,
      title: "",
      subtitle: "",
      price: "",
      status: "draft",
    });

  const save = async () => {
    try {
      const payload = {
        title: dialog.title,
        subtitle: dialog.subtitle || undefined,
        price: dialog.price ? parseFloat(dialog.price) : 0,
        status: (dialog.status as any) || "draft",
      } as any;
      if (dialog.id) await adminUpdateCard(dialog.id, payload);
      else
        await adminCreateCard({
          ...payload,
          currency: "USD",
          is_featured: false,
          popularity: 0,
        });
      closeDialog();
      load();
    } catch (e) {
      setError("Failed to save card");
    }
  };

  const remove = async (id: number) => {
    try {
      await adminDeleteCard(id);
      load();
    } catch {
      setError("Failed to delete");
    }
  };

  const togglePublish = async (c: DatePlanCard) => {
    try {
      await adminUpdateCard(c.id, {
        status: c.status === "published" ? "draft" : "published",
      });
      load();
    } catch {
      setError("Failed to update status");
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
              Date Plan Cards
            </Typography>
            <Button startIcon={<Add />} variant="contained" onClick={openNew}>
              New Card
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
                    <TableCell>Subtitle</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
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
                      <TableCell colSpan={6}>No cards</TableCell>
                    </TableRow>
                  ) : (
                    items.map((c) => (
                      <TableRow key={c.id} hover>
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>{c.subtitle}</TableCell>
                        <TableCell>
                          {c.price} {c.currency}
                        </TableCell>
                        <TableCell>{c.status}</TableCell>
                        <TableCell align="right">
                          <Button size="small" onClick={() => togglePublish(c)}>
                            {c.status === "published" ? "Unpublish" : "Publish"}
                          </Button>
                          <IconButton size="small" onClick={() => openEdit(c)}>
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => remove(c.id)}
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
            <DialogTitle>{dialog.id ? "Edit Card" : "New Card"}</DialogTitle>
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
                  label="Subtitle"
                  value={dialog.subtitle}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, subtitle: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Price"
                  type="number"
                  value={dialog.price}
                  onChange={(e) =>
                    setDialog((d) => ({ ...d, price: e.target.value }))
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
    </AdminProtectedRoute>
  );
};

export default DatePlanCardsPage;
