import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminProtectedRoute from "../../AdminProtectedRoute";
import Layout from "../../Layout";
import { DatePlan, listAllDatePlansAdmin } from "../../api/dates";

const AdminDatePlansPage = () => {
  const [items, setItems] = useState<DatePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listAllDatePlansAdmin();
        setItems(data);
      } catch (e) {
        setError("Failed to load date plans");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminProtectedRoute>
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            All Date Plans
          </Typography>
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
                    <TableCell>Owner</TableCell>
                    <TableCell>Scheduled</TableCell>
                    <TableCell>Status</TableCell>
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
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.title}</TableCell>
                        <TableCell>{p.owner_id}</TableCell>
                        <TableCell>
                          {p.scheduled_at
                            ? new Date(p.scheduled_at).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>{p.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Layout>
    </AdminProtectedRoute>
  );
};

export default AdminDatePlansPage;
