import React, { useEffect, useState, useMemo } from 'react';
import axios from '../services/api';
import {
  Box,
  TextField,
  Pagination,
  Typography,
  Avatar,
  Button,
  Paper,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import Loader from '../components/common/Loader';
import debounce from 'lodash.debounce';
import { API_BASE_URL } from '../config';

interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  role?: string;
  createdAt?: string;
  bio: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'username' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [editUser, setEditUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatar, setEditAvatar] = useState<File | null>(null);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/users', {
        params: {
          page,
          limit: 6,
          search: searchQuery,
          sortBy,
          sortOrder,
        },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchQuery, sortBy, sortOrder]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setSearchQuery(value);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/users/${id}`);
      setToast({ open: true, message: 'User deleted successfully.', severity: 'success' });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setToast({ open: true, message: 'You are not authorized to delete any user.', severity: 'error' });
    }
  };

  const handleEditSave = async () => {
    if (!editUser) return;

    try {
      const formData = new FormData();
      formData.append('username', editUsername);
      formData.append('bio', editBio);
      if (editAvatar) {
        formData.append('avatar', editAvatar);
      }

      await axios.put(`/users/${editUser.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditUser(null);
      fetchUsers();
      setToast({ open: true, message: 'User updated successfully.', severity: 'success' });
    } catch (err) {
      console.error('Error updating user:', err);
      setToast({ open: true, message: 'You are not authorized to update any user.', severity: 'error' });
    }
  };

  return (
    <Box px={{ xs: 2, md: 4 }} py={3}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField
          label="Search by username"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} label="Sort By">
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="createdAt">Created Date</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)} label="Order">
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={3}
          >
            {users.map((user) => (
              <Paper
                key={user.id}
                elevation={2}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={
                      user.avatar_url
                        ? `${API_BASE_URL}${user.avatar_url}?v=${Date.now()}`
                        : 'https://via.placeholder.com/50'
                    }
                    sx={{ width: 50, height: 50 }}
                  />
                  <Box flex={1}>
                    <Typography fontWeight={600}>{user.username}</Typography>
                    <Typography color="text.secondary" fontSize="small">
                      {user.email}
                    </Typography>
                    <Typography color="primary" fontSize="small">
                      Role: {user.role}
                    </Typography>
                  </Box>
                </Box>

                {currentUser.role === 'admin' && currentUser.id !== user.id && (
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      fullWidth={true}
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
                          handleDelete(user.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      fullWidth={true}
                      onClick={() => {
                        setEditUser(user);
                        setEditUsername(user.username);
                        setEditBio(user.bio);
                        setEditAvatar(null);
                      }}
                    >
                      Edit
                    </Button>
                  </Stack>
                )}
              </Paper>
            ))}
          </Box>

          {totalPages > 1 && (
            <Stack alignItems="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}

      <Dialog open={!!editUser} onClose={() => setEditUser(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <TextField
            label="Bio"
            fullWidth
            margin="dense"
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Avatar
            <input type="file" hidden onChange={(e) => setEditAvatar(e.target.files?.[0] || null)} />
          </Button>
          {editAvatar && <Typography variant="body2" mt={1}>{editAvatar.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersList;
