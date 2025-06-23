import React from 'react';
import ResetForm from '../components/forms/ResetForm';
import {
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const ResetRequestPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we’ll send you a link to reset your password.
        </Typography>
        <ResetForm />
      </Paper>
    </Container>
  );
};

export default ResetRequestPage;
