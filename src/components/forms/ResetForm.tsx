import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import API from '../../services/api';
import { toast } from 'react-toastify';

type ResetFormInputs = {
  email: string;
};

const ResetForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormInputs>();

  const onSubmit = async (data: ResetFormInputs) => {
    try {
      const res = await API.post('/auth/forgot-password', data);
      toast.success(res.data.message || 'Reset link sent!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        margin="normal"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Send Reset Link'}
      </Button>
    </Box>
  );
};

export default ResetForm;
