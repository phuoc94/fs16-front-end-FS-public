import { Link as RouterLink } from 'react-router-dom';

import { AccountBox, ReceiptLong } from '@mui/icons-material';
import { Grid, Link, Stack, Typography } from '@mui/material';

import ListMenuItem from '../profile/ListMenuItem';

const SideBar = () => {
  return (
    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'grid' } }}>
      <Stack gap={1}>
        <Link to="/profile" component={RouterLink}>
          <ListMenuItem>
            <AccountBox />
            <Typography>Profile</Typography>
          </ListMenuItem>
        </Link>
        <Link to="/loans" component={RouterLink}>
          <ListMenuItem>
            <ReceiptLong />
            <Typography>All Loans</Typography>
          </ListMenuItem>
        </Link>
      </Stack>
    </Grid>
  );
};

export default SideBar;
