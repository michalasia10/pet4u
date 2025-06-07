import { Box, Typography, TextField } from '@mui/material';
import { useCommunityHeroSectionPresenter } from '../hooks/useCommunityHeroSectionPresenter';

const heroBgImage = 'https://images.unsplash.com/photo-1559190391-75778a48355a?q=80&w=2070&auto=format&fit=crop';

export const CommunityHeroSection = () => {
  const { title, searchPlaceholder } = useCommunityHeroSectionPresenter();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${heroBgImage})`,
        color: 'white',
        textAlign: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
        '*': {
          zIndex: 2,
        },
      }}
    >
      <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={searchPlaceholder}
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '50px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            paddingLeft: 2,
          },
        }}
      />
    </Box>
  );
}; 