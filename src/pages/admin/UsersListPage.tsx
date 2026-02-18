import {
  LockReset as LockResetIcon,
  Refresh as RefreshIcon,
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
import {
  getAllUsers,
  resetUserPassword,
  UserRecord,
} from "../../api/admin/users";
import Layout from "../../Layout";

const UsersListPage = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetDialog, setResetDialog] = useState<{
    open: boolean;
    user: UserRecord | null;
    newPwd: string;
  }>({ open: false, user: null, newPwd: "" });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenReset = (user: UserRecord) =>
    setResetDialog({ open: true, user, newPwd: "" });
  const handleCloseReset = () =>
    setResetDialog({ open: false, user: null, newPwd: "" });
  const handleConfirmReset = async () => {
    if (!resetDialog.user) return;
    try {
      await resetUserPassword(resetDialog.user.id, resetDialog.newPwd);
      handleCloseReset();
    } catch (e) {
      setError("Failed to reset password");
    }
  };

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" fontWeight={700}>
            Users
          </Typography>
          <IconButton onClick={load}>
            <RefreshIcon />
          </IconButton>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading...</TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No users</TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow key={u.id} hover>
                      <TableCell>{u.id}</TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>{u.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {new Date(u.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          startIcon={<LockResetIcon />}
                          onClick={() => handleOpenReset(u)}
                        >
                          Reset Password
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={resetDialog.open} onClose={handleCloseReset}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {resetDialog.user ? `User: ${resetDialog.user.email}` : ""}
            </Typography>
            <TextField
              label="New Password"
              type="password"
              value={resetDialog.newPwd}
              onChange={(e) =>
                setResetDialog((p) => ({ ...p, newPwd: e.target.value }))
              }
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReset}>Cancel</Button>
            <Button
              onClick={handleConfirmReset}
              variant="contained"
              disabled={!resetDialog.newPwd}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default UsersListPage;
