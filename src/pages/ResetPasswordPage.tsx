import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import NewPasswordForm from '../components/forms/NewPasswordForm';
import ResetForm from '../components/forms/ResetForm';

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {token ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Set New Password
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
              Please enter a new password for your account.
            </Typography>
            <NewPasswordForm token={token} />
          </>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Forgot Your Password?
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
              Enter your email address and we’ll send you a link to reset your password.
            </Typography>
            <ResetForm />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
