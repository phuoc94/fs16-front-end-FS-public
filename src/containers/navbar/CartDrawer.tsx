import { Fragment, useState } from 'react';

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
import { useAppSelector } from '../../hooks/useAppSelector';

const CartDrawer = () => {
  const { totalItems, cartItems, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleCheckout = () => {
    toggleDrawer();
    navigate('/cart');
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
            <Box display={'flex'} justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography variant="h6" fontWeight="bold">
                {totalPrice} €
              </Typography>
            </Box>
            <Stack gap={2} marginTop={2}>
              <Button fullWidth variant="contained" onClick={handleCheckout}>
                Checkout
              </Button>

              <Button fullWidth variant="outlined" onClick={toggleDrawer}>
                Continue shopping
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default CartDrawer;
