import React from 'react';

import { Box } from '@mui/material';

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <img
        src={imageUrl}
        alt={`books cover`}
        style={{ maxWidth: '100%', maxHeight: '400px' }}
      />
    </Box>
  );
};

export default ImageDisplay;
