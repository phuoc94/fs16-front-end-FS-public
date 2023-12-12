import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
