import React from 'react';

import { useDispatch } from 'react-redux';

import { Button, Card, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia/CardMedia';

import { useSnackbar } from '../contexts/SnackbarContext';
import { addToCart } from '../store/slices/cartSlice';
import { noImageAvailable } from '../utils/const';

interface Book {
  _id: string;
  title: string;
  img?: string;
  author: Array<{ firstName: string; lastName: string }>;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const { showMessage } = useSnackbar();

  const handleAddToCart = (bookId: string) => {
    dispatch(addToCart(bookId));
    showMessage('Book added to cart!');
  };

  return (
    <Card>
      <CardMedia
        style={{ paddingTop: '100%' }} // Height equal to 100% of the width
        image={book.img || noImageAvailable}
        title={book.title || 'No image available'}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          by {book.author.map((a) => a.firstName + ' ' + a.lastName).join(', ')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddToCart(book._id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
