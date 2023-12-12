import { useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateProduct } from '../../store/actions/product.actions';
import { Category } from '../../types/category.types';
import { Product } from '../../types/product.types';

type UpdateProductModalProps = {
  open: boolean;
  handle: () => void;
  categories: Category[];
  product: Product;
};

interface NewProduct {
  title: string;
  price: string;
  description: string;
  category: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 4,
};

const UpdateProductModal = ({
  open,
  categories,
  product,
  handle,
}: UpdateProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<NewProduct>({
    title: product.title,
    price: product.price.toString(),
    description: product.description,
    category: product.category.id,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...updatedProduct,
      price: Number(updatedProduct.price),
      categoryId: updatedProduct.category,
      images: [
        'https://picsum.photos/639/480',
        'https://picsum.photos/640/480',
        'https://picsum.photos/641/480',
      ],
    };

    try {
      dispatch(updateProduct({ product: productData, id: product.id }));
      handle();
    } catch (err) {
      console.error('error', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      category: Number(value),
    });
  };

  return (
    <Modal
      open={open}
      onClose={handle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            autoFocus
            value={updatedProduct.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
            autoComplete="off"
            value={updatedProduct.price}
            onChange={handleChange}
          />
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
            value={updatedProduct.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              label="Category"
              value={updatedProduct.category.toString()}
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
          >
            Update product
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateProductModal;
