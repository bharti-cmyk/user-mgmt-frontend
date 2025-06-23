import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  token: string;
}

const NewPasswordForm: React.FC<Props> = ({ token }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ newPassword: string }>();

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      await API.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword,
      });

      toast.success('Password reset successful');
      navigate('/login'); // ✅ Redirect to login after success
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 2 }}
    >
      <TextField
        fullWidth
        label="New Password"
        type="password"
        margin="normal"
        {...register('newPassword', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Minimum 6 characters' },
        })}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>
    </Box>
  );
};

export default NewPasswordForm;
