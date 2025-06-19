import { PetFriendlyPlace } from "../../domain/entities/PetFriendlyPlace";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Stack, alpha } from "@mui/material";
import { Star, LocationOn } from "@mui/icons-material";
import type { PlaceCategory } from "../../domain/types";


interface Category {
  id: PlaceCategory;
  name: string;
  icon: string;
}

interface PlaceCardProps {
  place: PetFriendlyPlace;
  category: Category;
}

export const PlaceCard = ({ place, category }: PlaceCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '60%' }}>
        <CardMedia
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={place.photoUrl || "/placeholder.svg"}
          alt={place.name}
        />
        <Chip
          icon={<Star sx={{ color: 'warning.main' }} />}
          label={place.averageRating.toFixed(1)}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            '& .MuiChip-label': {
              fontWeight: 600,
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'flex-start' }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {place.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {place.address}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {place.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Chip
            label={category.name}
            size="small"
            variant="outlined"
            icon={<span style={{ fontSize: '1.1em' }}>{category.icon}</span>}
            sx={{
              borderColor: 'primary.light',
              color: 'primary.main',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              minWidth: 'auto',
              px: 2,
            }}
          >
            Zobacz więcej
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 