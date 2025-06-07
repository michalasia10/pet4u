import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import type { PetFriendlyPlace } from '../../domain/entities/PetFriendlyPlace';

interface PlaceCardProps {
  place: PetFriendlyPlace;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={place.photoUrl || 'https://placehold.co/151x151'}
        alt={`Photo of ${place.name}`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {place.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {place.address}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 1 }}>
            {place.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}; 