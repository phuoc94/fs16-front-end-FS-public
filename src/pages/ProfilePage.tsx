import { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  Edit,
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnOutlined,
  Person,
  PersonOutlineOutlined,
  ReceiptLong,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import SideBar from '../components/dashboard/SideBar';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchHistory } from '../store/actions/lending.actions';

const ProfilePage = () => {
  const { profile } = useAppSelector((state) => state.auth);
  const { myLoans } = useAppSelector((state) => state.lending);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);
  const nonReturnedLoans = myLoans.filter((loan) => !loan.returned);
  if (!profile) {
    return <Fragment />;
  }

  return (
    <Container sx={{ paddingTop: { xs: '1rem', md: '4rem' } }}>
      <Grid container spacing={2}>
        <SideBar />
        <Grid item xs={12} md={9}>
          <Typography variant="h5" marginBottom={2}>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <Box
                  display={'flex'}
                  gap={2}
                  alignItems={'center'}
                  marginBottom={4}
                >
                  <Person fontSize="large" color="primary" />
                  <Typography variant="h6">My details</Typography>
                </Box>
                <Stack marginTop={2} marginBottom={2} gap={1}>
                  <Box display={'flex'} gap={2}>
                    <PersonOutlineOutlined />
                    <Typography>
                      {profile.firstName} {profile.lastName}
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <LocationOnOutlined />
                    <Typography>{profile.address}</Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <LocalPhoneOutlined />
                    <Typography>{profile.phoneNumber}</Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <EmailOutlined />
                    <Typography>{profile.email}</Typography>
                  </Box>
                </Stack>

                <Button variant="outlined" endIcon={<Edit />} size="large">
                  Edit
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  padding: 2,
                }}
              >
                <Box
                  display={'flex'}
                  gap={2}
                  alignItems={'center'}
                  marginBottom={4}
                >
                  <ReceiptLong fontSize="large" color="primary" />
                  <Typography variant="h6">Active Loans</Typography>
                </Box>
                <Box marginTop={2} marginBottom={2}>
                  {nonReturnedLoans.length > 0 ? (
                    nonReturnedLoans.map((loan, index) => (
                      <Typography key={index}>{loan.book.title}</Typography>
                    ))
                  ) : (
                    <Typography>No Active loans</Typography>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  size="large"
                  to="/loans"
                  component={Link}
                >
                  All Loans
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
