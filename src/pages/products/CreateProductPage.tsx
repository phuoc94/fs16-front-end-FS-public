import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AutoMode } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
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
import { fetchAuthors } from '../../store/actions/author.actions';
import { addProduct } from '../../store/actions/product.actions';
import { Author } from '../../types/author.types';
import { generateISBN13 } from '../../utils/generateISBN';

interface NewProduct {
  title: string;
  ISBN: string;
  description: string;
  category: string;
  author: string[];
  img: string;
}

const CreateProductPage: React.FC = () => {
  const [newProduct, setProduct] = useState<NewProduct>({
    title: '',
    ISBN: '',
    description: '',
    category: '',
    author: [],
    img: '',
  });
  const [showError, setShowError] = useState(false);

  const { categories } = useAppSelector((state) => state.categories);
  const { error, isLoading } = useAppSelector((state) => state.products);
  const { authors } = useAppSelector((state) => state.authors);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

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

  const handleAuthorChange = (event: React.SyntheticEvent, value: Author[]) => {
    setProduct({
      ...newProduct,
      author: value.map((author) => author.id),
    });
  };

  const selectedAuthors = authors.filter((author) =>
    newProduct.author.includes(author.id),
  );

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
    try {
      await dispatch(addProduct(newProduct));
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

            <Autocomplete
              multiple
              id="authors"
              options={authors}
              getOptionLabel={(option) =>
                option.firstName + ' ' + option.lastName
              }
              value={selectedAuthors}
              onChange={handleAuthorChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  label="Author(s)"
                  placeholder="Select Author(s)"
                />
              )}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="img"
              label="Image URL"
              name="img"
              autoComplete="off"
              value={newProduct.img}
              onChange={handleChange}
            />

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
