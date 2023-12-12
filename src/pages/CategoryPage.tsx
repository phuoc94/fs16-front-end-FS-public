import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Container, Grid, Paper, Typography } from '@mui/material';

import ProductCard from '../components/products/ProductCard';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCategory } from '../store/actions/category.actions';
import { fetchCategoryProducts } from '../store/actions/product.actions';

const CategoryPage = () => {
  const { category: categoryId } = useParams();

  const products = useAppSelector((state) => state.products.products);
  const category = useAppSelector((state) => state.categories.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory(Number(categoryId)));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryProducts(Number(categoryId)));
    }
  }, [categoryId, dispatch]);

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        align="center"
      >
        {category?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Filters</Typography>
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Grid container spacing={2}>
            {products &&
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;
