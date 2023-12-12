import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import ImageDisplay from '../../components/products/ImageDisplay';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProduct } from '../../store/actions/product.actions';
import {
  addItemToCart,
  setItemQuantity,
} from '../../store/reducers/cart.slice';

const ProductPage = () => {
  const { productId } = useParams();

  const { product, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const { cartItems } = useAppSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  const handleAddItemToCart = () => {
    const item = cartItems.find((item) => item.id === product?.id);
    if (item) {
      dispatch(
        setItemQuantity({
          id: Number(productId),
          quantity: item.quantity + quantity,
        }),
      );
    } else {
      if (product) {
        dispatch(addItemToCart({ product, quantity }));
      }
    }
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <h1>Something went wrong</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ justifyContent: 'center' }}>
          <ImageDisplay imageUrls={product.images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ padding: '20px' }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Typography variant="h3">{product.price} €</Typography>
              <Box display={'flex'} gap={1}>
                <IconButton
                  aria-label="decrease"
                  size="large"
                  disabled={quantity === 1}
                  onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Remove fontSize="inherit" />
                </IconButton>
                <TextField
                  variant="outlined"
                  sx={{
                    maxWidth: '70px',
                    '& input': {
                      textAlign: 'center',
                    },
                  }}
                  value={quantity}
                />
                <IconButton
                  aria-label="increase"
                  size="large"
                  onClick={(e) => setQuantity(quantity + 1)}
                >
                  <Add fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
            <Button variant="contained" fullWidth onClick={handleAddItemToCart}>
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
