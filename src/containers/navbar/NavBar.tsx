import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import SearchBox from '../../components/topnavbar/SearchBox';
import { useIsAdmin, useIsAuthenticated } from '../../hooks/useAuth';
import AccountPopover from './AccountPopover';
import CartDrawer from './CartDrawer';

const NavBar = () => {
  const { isAdmin } = useIsAdmin();
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <Box sx={{ flexGrow: 1 }} marginTop="135px">
      <AppBar position="fixed">
        <Container>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
            marginTop={0}
          >
            <Grid item sx={{ display: { xs: 'grid', md: 'none' } }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography>Menu</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                to="/"
                component={RouterLink}
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </Grid>
            <Grid item order={{ md: 3 }}>
              <Stack direction="row" spacing={2}>
                <AccountPopover />
                <CartDrawer />
              </Stack>
            </Grid>
            <Grid item xs={12} md={8} order={{ md: 2 }}>
              <SearchBox />
            </Grid>
          </Grid>
        </Container>
        <Paper
          sx={{
            display: { xs: 'none', md: 'flex' },
            height: '63px',
            alignItems: 'center',
            borderRadius: '0',
          }}
        >
          <Container>
            <Stack direction="row" spacing={2}>
              <Link to="/" component={RouterLink}>
                Home
              </Link>
              <Link to="/products" component={RouterLink}>
                Products
              </Link>

              {isAuthenticated && (
                <Link to="/loans" component={RouterLink}>
                  Loans
                </Link>
              )}

              {isAdmin && (
                <Link to="/create-product" component={RouterLink}>
                  Add Book
                </Link>
              )}
            </Stack>
          </Container>
        </Paper>
      </AppBar>
    </Box>
  );
};

export default NavBar;
