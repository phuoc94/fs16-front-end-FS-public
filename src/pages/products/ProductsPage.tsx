import { useEffect, useState } from 'react';

import {
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  Typography,
} from '@mui/material';

import ProductCard from '../../components/products/ProductCard';
import Filters from '../../containers/products/Filters';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCategories } from '../../store/actions/category.actions';
import { fetchProducts } from '../../store/actions/product.actions';
import { setSortBy } from '../../store/reducers/product.slice';

const ProductsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const { products, isLoading, sortBy } = useAppSelector(
    (state) => state.products,
  );
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.length < 1) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value));

    switch (event.target.value) {
      case 'titleAZ':
        dispatch(fetchProducts({ sortBy: 'title', sortOrder: 'asc' }));
        break;
      case 'titleZA':
        dispatch(fetchProducts({ sortBy: 'title', sortOrder: 'desc' }));
        break;

      default:
        break;
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        align="center"
      >
        Books
      </Typography>
      <Grid container spacing={2}>
        <Filters />
        <Grid item md={9}>
          <Grid container sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sort">Sort by:</InputLabel>
                <Select
                  labelId="sort"
                  id="sort-select"
                  label="Sort by:"
                  value={sortBy}
                  onChange={handleChangeSort}
                >
                  <MenuItem value="titleAZ">Title: A to Z</MenuItem>
                  <MenuItem value="titleZA">Title: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TablePagination
                component="div"
                count={products.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[12, 24, 36, 48]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {isLoading ? (
              <CircularProgress />
            ) : displayedProducts && displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                No products
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
