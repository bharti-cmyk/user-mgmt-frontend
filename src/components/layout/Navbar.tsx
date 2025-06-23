import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: App name */}
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            component={Link}
            to="/users"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            MyApp
          </Typography>

        </Box>

        {/* Right side: Auth buttons */}
        <Box>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
