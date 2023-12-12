import { Fragment } from 'react';

import { faker } from '@faker-js/faker';
import {
  AccountBox,
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

import ListMenuItem from '../components/profile/ListMenuItem';
import { useAppSelector } from '../hooks/useAppSelector';

const ProfilePage = () => {
  const { profile } = useAppSelector((state) => state.auth);

  if (!profile) {
    return <Fragment />;
  }

  return (
    <Container sx={{ paddingTop: { xs: '1rem', md: '4rem' } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'grid' } }}>
          <Stack gap={1}>
            <ListMenuItem>
              <AccountBox />
              <Typography>Profile</Typography>
            </ListMenuItem>
            <ListMenuItem>
              <ReceiptLong />
              <Typography>Orders</Typography>
            </ListMenuItem>
          </Stack>
        </Grid>
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
                    <Typography>{profile.name}</Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <LocationOnOutlined />
                    <Typography>{faker.location.streetAddress()}</Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <LocalPhoneOutlined />
                    <Typography>{faker.phone.number()}</Typography>
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
                  <Typography variant="h6">Orders</Typography>
                </Box>
                <Box marginTop={2} marginBottom={2}>
                  <Typography>No orders found</Typography>
                </Box>
                <Button variant="outlined" size="large">
                  All Orders
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
