import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Container, Grid, Typography } from '@mui/material';

import CategoryCard from '../../components/category/CategoryCard';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCategories } from '../../store/actions/category.actions';

const ListOfCategories = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        align="center"
      >
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories &&
          categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Link to={`category/${category.id}`}>
                <CategoryCard title={category.name} image={category.image} />
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ListOfCategories;
