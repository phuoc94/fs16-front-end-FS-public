import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AutoMode } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addProduct } from '../../store/actions/product.actions';
import { generateISBN13 } from '../../utils/generateISBN';

interface NewProduct {
  title: string;
  ISBN: string;
  description: string;
  category: string;
}

const CreateProductPage: React.FC = () => {
  const [newProduct, setProduct] = useState<NewProduct>({
    title: '',
    ISBN: '',
    description: '',
    category: '',
  });
  const [showError, setShowError] = useState(false);

  const { categories } = useAppSelector((state) => state.categories);
  const { error, isLoading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setProduct({
      ...newProduct,
      category: value,
    });
  };

  const generateISBN = () => {
    const newISBN = generateISBN13();
    setProduct({ ...newProduct, ISBN: newISBN });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      categoryId: newProduct.category,
      images: 'https://picsum.photos/641/480',
    };

    try {
      await dispatch(addProduct(productData));
      navigate('/');
    } catch (err) {
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Fragment>
      <Container maxWidth="xs" sx={{ paddingY: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Book
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="off"
              autoFocus
              value={newProduct.title}
              onChange={handleChange}
            />
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel htmlFor="ISBN">ISBN</InputLabel>
              <OutlinedInput
                id="ISBN"
                name="ISBN"
                autoComplete="off"
                autoFocus
                value={newProduct.ISBN}
                onChange={handleChange}
                label="ISBN"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="generate ISBN"
                      onClick={generateISBN}
                      edge="end"
                    >
                      <AutoMode />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={4}
              id="description"
              autoComplete="off"
              value={newProduct.description}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                value={newProduct.category}
                onChange={handleCategoryChange}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Create Product
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default CreateProductPage;
