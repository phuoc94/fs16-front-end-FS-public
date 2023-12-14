import { Fragment, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Close, ShoppingCart } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import CartItem from '../../components/cart/CartItem';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useIsAuthenticated } from '../../hooks/useAuth';
import { borrowBooks } from '../../store/actions/lending.actions';
import { removeAllItemsFromCart } from '../../store/reducers/cart.slice';

const CartDrawer = () => {
  const { totalItems, cartItems } = useAppSelector((state) => state.cart);
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated } = useIsAuthenticated();
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleCheckout = () => {
    const bookIds = cartItems.map((item) => item.id);
    if (isAuthenticated) {
      try {
        dispatch(borrowBooks(bookIds));
        toggleDrawer();
        dispatch(removeAllItemsFromCart());
        enqueueSnackbar('Borrowed books successfully', {
          variant: 'success',
        });
      } catch (error) {
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
        });
      }
    } else {
      navigate('/signin');
    }
  };

  return (
    <Fragment>
      <IconButton onClick={toggleDrawer}>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={openDrawer}>
        <Box sx={{ width: 375 }} role="presentation">
          <Box
            display={'flex'}
            justifyContent="space-between"
            paddingY={1}
            paddingX={2}
            alignItems="center"
          >
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton aria-label="close drawer" onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <Box overflow="auto" height="500px">
            {cartItems.map((item) => (
              <Fragment key={item.id}>
                <CartItem item={item} />
                <Divider />
              </Fragment>
            ))}
          </Box>

          <Box padding={2}>
            <Stack gap={2} marginTop={2}>
              <Button fullWidth variant="contained" onClick={handleCheckout}>
                {isAuthenticated ? 'Borrow Books' : 'Sign In'}
              </Button>

              <Button fullWidth variant="outlined" onClick={toggleDrawer}>
                Continue Searching
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default CartDrawer;
