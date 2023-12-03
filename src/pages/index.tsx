import { Container, Grid, Typography } from '@mui/material';

import BookCard from '../components/BookCard';
import { useGetBooksQuery } from '../store/services/booksApi';

const HomePage = () => {
  const { data, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Books
      </Typography>
      <Grid container spacing={2}>
        {data?.data.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
