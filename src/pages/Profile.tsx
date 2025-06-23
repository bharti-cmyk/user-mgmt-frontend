import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { API_BASE_URL } from '../config';

interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  is_verified?: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <Loader />;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={`${API_BASE_URL}${user.avatar_url}` || 'https://via.placeholder.com/150'}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Chip
              label={user.is_verified ? 'Verified ✅' : 'Not Verified ❌'}
              color={user.is_verified ? 'success' : 'default'}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        {user.bio && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="text.primary">
              {user.bio}
            </Typography>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => navigate('/profile/edit', { state: { user } })}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
