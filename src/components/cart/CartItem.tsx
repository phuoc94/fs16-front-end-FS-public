import { useState } from 'react';

import { Add, Remove } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  Item,
  removeItemFromCart,
  setItemQuantity,
} from '../../store/reducers/cart.slice';

type CartItemProps = {
  item: Item;
};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useAppDispatch();

  const handleIncreaseItem = (id: number) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(increaseItemQuantity({ id }));
  };

  const handleDecreaseItem = (id: number) => {
    setQuantity((prevQuantity) => prevQuantity - 1);
    dispatch(decreaseItemQuantity({ id }));
  };

  const handleSetItemQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    dispatch(setItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = (id: number) => {
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
          <Img alt="complex" src={item.images[0]} />
        </ButtonBase>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction={'column'} gap={1}>
          <Grid item>
            <Typography variant="h6">{item.title}</Typography>
          </Grid>
          <Grid item>
            <Typography>{item.price} € / pcs</Typography>
            <Box display={'flex'} gap={1}>
              <IconButton
                aria-label="decrease"
                disabled={item.quantity === 1}
                onClick={(e) => handleDecreaseItem(item.id)}
              >
                <Remove fontSize="inherit" />
              </IconButton>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                sx={{
                  maxWidth: '70px',
                  '& input': {
                    textAlign: 'center',
                  },
                }}
                onChange={handleSetItemQuantity}
                value={quantity}
              />
              <IconButton
                aria-label="increase"
                onClick={(e) => handleIncreaseItem(item.id)}
              >
                <Add fontSize="inherit" />
              </IconButton>
            </Box>
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
          <Grid item>
            <Typography variant="h6">{item.price * item.quantity} €</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
