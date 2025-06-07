import React from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useGetPlaces } from '../../application/hooks/useGetPlaces';
import { PlaceCard } from '../components/PlaceCard';
import { usePetContext } from '../../../../shared/context/PetContext';
import { CommunityHeroSection } from '../components/CommunityHeroSection';

export const CommunityPage: React.FC = () => {
  const { activePet } = usePetContext();
  const { data: places, isLoading, isError, error } = useGetPlaces(activePet?.species);

  return (
    <>
      <CommunityHeroSection />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Proponowane dla: {activePet?.name ?? '...'}
        </Typography>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            Wystąpił błąd podczas ładowania miejsc: {error instanceof Error ? error.message : 'Unknown error'}
          </Alert>
        )}

        {!activePet && !isLoading && (
          <Alert severity="info">Wybierz zwierzaka w menu powyżej, aby zobaczyć dopasowane miejsca.</Alert>
        )}

        {places && places.length === 0 && !isLoading && (
          <Alert severity="info">Nie znaleziono miejsc dla Twojego zwierzaka.</Alert>
        )}

        {places && places.length > 0 && (
          <Box>
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}; 