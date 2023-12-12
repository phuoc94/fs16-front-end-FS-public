import React, { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  fetchNewAccessToken,
  getProfile,
} from '../../store/actions/auth.actions';
import { logout } from '../../store/reducers/auth.slice';
import { cookies } from '../../utils/cookies';

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/profile',
  },
];

const AccountPopover: React.FC = () => {
  const [openPopover, setOpenPopover] =
    React.useState<HTMLButtonElement | null>(null);

  const { profile, accessToken } = useAppSelector((state) => state.auth);

  const refreshToken = cookies.get('refreshToken');

  const open = Boolean(openPopover);

  const id = open ? 'account-popover' : undefined;

  const dispatch = useAppDispatch();

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

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    handleClosePopover();
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpenPopover}>
        <Avatar
          alt={profile?.name}
          src={profile?.avatar}
          sx={{ width: 24, height: 24 }}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {profile ? (
          <Fragment>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {profile?.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {profile?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  component={Link}
                  to={option.linkTo}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </Fragment>
        ) : (
          <Stack sx={{ p: 1 }}>
            <MenuItem component={Link} to={'/signin'}>
              Sign In
            </MenuItem>
            <MenuItem component={Link} to={'/#'}>
              Sign Up
            </MenuItem>
          </Stack>
        )}
      </Popover>
    </Fragment>
  );
};

export default AccountPopover;
