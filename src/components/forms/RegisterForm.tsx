import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Role = 'admin' | 'user';

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  role: Role;
  profileImage: FileList;
};

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required(),
  role: yup.string().oneOf(['admin', 'user']).required('Role is required'),
  profileImage: yup
    .mixed<FileList>()
    .required('Profile image is required')
    .test('fileExist', 'Profile image is required', (value) => value && value.length > 0),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error'; open: boolean }>({
    message: '',
    type: 'success',
    open: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const imagePreview = watch('profileImage');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const formData = new FormData();
    const bio = data.role === 'admin' ? 'Admin account' : 'Regular user account';

    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('bio', bio);
    formData.append('profileImage', data.profileImage[0]);

    try {
      await api.post('/auth/register', formData);
      setSnackbar({ message: 'Registration successful. Check your email to verify.', type: 'success', open: true });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setSnackbar({
        message: err.response?.data?.message || 'Registration failed',
        type: 'error',
        open: true,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* username */}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          {/* email */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* role select */}
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" defaultValue="" {...register('role')}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              {errors.role?.message}
            </Typography>
          </FormControl>

          {/* image upload */}
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Profile Image
            <input type="file" hidden {...register('profileImage')} />
          </Button>
          <Typography variant="caption" color="error">
            {errors.profileImage?.message}
          </Typography>

          {imagePreview && imagePreview.length > 0 && (
            <Box mt={2} display="flex" justifyContent="center">
              <Avatar src={URL.createObjectURL(imagePreview[0])} sx={{ width: 80, height: 80 }} />
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterForm;
