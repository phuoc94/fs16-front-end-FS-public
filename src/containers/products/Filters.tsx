import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useDebounce from '../../hooks/useDebounce';
import { fetchProducts } from '../../store/actions/product.actions';

const Filters = () => {
  const [filters, setFilters] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const debouncedFilter = useDebounce(filters, 500);

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts(debouncedFilter));
  }, [dispatch, debouncedFilter]);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    if (event.target.value !== 'all') {
      setFilters({
        ...filters,
        categoryId: event.target.value,
      });
    } else {
      setFilters({
        ...filters,
        categoryId: null,
      });
    }
  };

  return (
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Typography variant="h5" sx={{ paddingX: 2 }}>
        Filters
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="category-filter"
          id="category-filter"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              label="Category"
              onChange={handleChangeCategory}
              value={selectedCategory}
            >
              <MenuItem value="all" key="all">
                All
              </MenuItem>
              {categories.length > 0 &&
                categories.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default Filters;
