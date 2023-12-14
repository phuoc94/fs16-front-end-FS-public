import { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useIsAdmin } from '../../hooks/useAuth';
import { deleteProduct } from '../../store/actions/product.actions';
import { addItemToCart } from '../../store/reducers/cart.slice';
import { Product } from '../../types/product.types';
import UpdateProductModal from './UpdateProductModal';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { categories } = useAppSelector((state) => state.categories);
  const { cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const { isAdmin } = useIsAdmin();
  const isInCart = (product: Product) => {
    return cartItems.some((item) => item.ISBN === product.ISBN);
  };
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addItemToCart({ product }));
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Fragment>
      <Card sx={{ height: '100%' }}>
        <Link to={`/products/${product.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.title}
              height="140"
              image={product.img}
              title={product.title}
            />
            <CardContent>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="caption">
                {`Authors: ${product.author
                  .map((author) => author.fullName)
                  .join(', ')}`}

                <br />
                {`Available: ${product.availableCopies}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <IconButton aria-label="Add to Favorites">
            <FavoriteIcon />
          </IconButton>
          {isAdmin && (
            <Fragment>
              <IconButton
                aria-label="Delete"
                onClick={(e) => handleDeleteProduct(product.id)}
              >
                <Delete />
              </IconButton>
              <IconButton aria-label="Edit" onClick={handleModal}>
                <Edit />
              </IconButton>
            </Fragment>
          )}
          <Button
            onClick={handleAddToCart}
            disabled={product.availableCopies === 0 || isInCart(product)}
          >
            {product.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardActions>
      </Card>
      <UpdateProductModal
        open={openModal}
        handle={handleModal}
        product={product}
        categories={categories}
      />
    </Fragment>
  );
};

export default ProductCard;
