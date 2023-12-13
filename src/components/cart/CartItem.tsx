import DeleteIcon from '@mui/icons-material/Delete';
import {
  ButtonBase,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeItemFromCart } from '../../store/reducers/cart.slice';
import { Product } from '../../types/product.types';

type CartItemProps = {
  item: Product;
};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart({ id }));
  };

  return (
    <Grid
      container
      padding={2}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid item xs={3}>
        <ButtonBase sx={{ width: 64, height: 64 }}>
          <Img alt="complex" src={item.img} />
        </ButtonBase>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction={'column'} gap={1}>
          <Grid item>
            <Typography variant="h6">{item.title}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="end"
          sx={{ height: '100%' }}
        >
          <Grid item>
            <IconButton
              aria-label="delete"
              onClick={(e) => handleRemove(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
