import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api'; 
import { CircularProgress, Container, Snackbar, Alert } from '@mui/material';

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setSnackbar({ open: true, type: 'error', message: 'Token is missing in URL' });
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setSnackbar({ open: true, type: 'success', message: 'Email verified! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000);
      } catch (err: any) {
        setSnackbar({
          open: true,
          type: 'error',
          message: err.response?.data?.message || 'Verification failed',
        });
      }
    };

    verify();
  }, [params, navigate]);

  return (
    <Container sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default VerifyEmail;
