import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

interface CategoryCardProps {
  image: string;
  title: string;
}

const CategoryCard = ({ image, title }: CategoryCardProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState(
    `https://docketevents.com/assets/images/image_placeholder.jpg`,
  );

  useEffect(() => {
    const checkImageLoaded = async () => {
      try {
        await axios.get(image);
        setImgSrc(image);
      } catch (error) {}
    };

    checkImageLoaded();
  }, [image]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea>
        <CardMedia component="img" src={imgSrc} alt={title} />
        <CardContent>
          <Typography variant="h5" align="center">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
