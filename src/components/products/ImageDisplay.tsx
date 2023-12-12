import React, { useState } from 'react';

import { Box, Button, Grid } from '@mui/material';

interface ImageDisplayProps {
  imageUrls: string[];
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1,
    );
  };

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <img
        src={imageUrls[currentIndex]}
        alt={`${currentIndex + 1}`}
        style={{ maxWidth: '100%', maxHeight: '400px' }}
      />
      <Box mt={2}>
        <Grid container spacing={2} justifyContent="center">
          {imageUrls.map((url, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                onClick={() => setCurrentIndex(index)}
                sx={{
                  borderColor: index === currentIndex ? 'orange' : 'lightgray',
                }}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ maxWidth: '40px', maxHeight: '40px' }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={2} display={'flex'} gap={2} justifyContent={'center'}>
        <Button
          variant="contained"
          onClick={handlePreviousImage}
          color="primary"
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextImage} color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ImageDisplay;
