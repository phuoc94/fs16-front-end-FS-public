import { Fragment, useEffect, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  fetchNewAccessToken,
  getProfile,
  login,
} from '../store/actions/auth.actions';
import { cookies } from '../utils/cookies';

const SignIn: React.FC = () => {
  const [showError, setShowError] = useState(false);

  const { profile, accessToken, isLoading, error } = useAppSelector(
    (state) => state.auth,
  );

  const refreshToken = cookies.get('refreshToken');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (refreshToken && !accessToken && !profile) {
      dispatch(fetchNewAccessToken(refreshToken));
    }
  }, [dispatch, accessToken, profile, refreshToken]);

  useEffect(() => {
    if (accessToken && !profile) {
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken, profile]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Fragment>
      <Container maxWidth="xs">
        {profile && <Navigate to="/" replace={true} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="#">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SignIn;
