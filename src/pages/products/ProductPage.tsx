import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import ImageDisplay from '../../components/products/ImageDisplay';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProduct } from '../../store/actions/product.actions';
import { addItemToCart } from '../../store/reducers/cart.slice';

const ProductPage = () => {
  const { productId } = useParams();

  const { product, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const { cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const isItemInCart = product
    ? cartItems.some((item) => item.ISBN === product.ISBN)
    : false;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  const handleAddItemToCart = () => {
    const item = cartItems.find((item) => item.id === product?.id);
    if (item) {
      // TODO: handle item already in cart
    } else {
      if (product) {
        dispatch(addItemToCart({ product }));
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
          <ImageDisplay imageUrl={product.img} />
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

            <Typography variant="subtitle1">
              <strong>ISBN:</strong> {product.ISBN}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Edition:</strong>{' '}
              {product.edition ? product.edition : 'unknown'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Publisher:</strong>{' '}
              {product.publisher ? product.publisher : 'unknown'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Categories:</strong>{' '}
              {product.category && product.category.length > 0
                ? product.category.map((a) => a.name).join(', ')
                : 'unknown'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Authors:</strong>{' '}
              {product.author && product.author.length > 0
                ? product.author.map((a) => a.fullName).join(', ')
                : 'unknown'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Available:</strong> {product.availableCopies}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disabled={product.availableCopies === 0 || isItemInCart || false}
              onClick={handleAddItemToCart}
            >
              {product.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
