import { useState } from "react"
import type { ChangeEvent } from "react"
import { Search, FilterList } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material"
import type { PlaceCategory } from "../../domain/types"
import { useGetPlaces } from "../../application/hooks/useGetPlaces"
import { PlaceCard } from "../components/PlaceCard"
import { usePetStore } from "../../../../shared/context/PetContext"
import { usePlacePagePresenter } from "../hooks/usePlacePagePresenter"


export default function CommunityPage() {
  const theme = useTheme();
  const { selectedPetType } = usePetStore();
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { places, isLoading, error } = useGetPlaces({
    petType: selectedPetType,
    category: selectedCategory,
    searchQuery: searchQuery,
  });
  const { hero, categories, results, error: errorMessages, petName } = usePlacePagePresenter();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">
          {errorMessages.loading}: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{
      background: `linear-gradient(to bottom, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 45%, ${theme.palette.primary.light} 80%, ${theme.palette.primary.main} 100%)`,
      
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 3,
              fontWeight: 800,
              color: 'primary.dark',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
            }}
          >
            {hero.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 6,
              color: 'primary.dark',
              opacity: 0.9,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {hero.subtitle}
          </Typography>

          <Box sx={{ maxWidth: 700, mx: 'auto', position: 'relative' }}>
            <TextField
              fullWidth
              placeholder={hero.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 50,
                  '&:hover': {
                    bgcolor: 'white',
                  },
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative', 
        zIndex: 1 
      }}>
        <Box
          sx={{
            transform: 'translateY(-50%)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
            maxWidth: 'lg',
            width: '100%',
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                px: 3,
                py: 1,
                color: selectedCategory === category.id ? 'white' : 'primary.main',
                borderColor: selectedCategory === category.id ? 'transparent' : 'primary.light',
                '&:hover': {
                  borderColor: selectedCategory === category.id ? 'transparent' : 'primary.main',
                },
              }}
            >
              <span style={{ marginRight: 8, fontSize: '1.2em' }}>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Results */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 8, mt: -2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box
            sx={{
              bgcolor: 'white',
              backdropFilter: 'blur(5px)',
              borderRadius: 50,
              px: 2.5,
              py: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark' }}>
              {results.title} {petName(selectedPetType)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'white',
              backdropFilter: 'blur(5px)',
              borderRadius: 50,
              px: 2.5,
              py: 1,
              color: 'primary.dark',
            }}
          >
            <FilterList fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {results.found(places.length)}
            </Typography>
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
              },
            }}
          >
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                category={categories.find((c) => c.id === place.category)!}
              />
            ))}
          </Box>
        )}

        {!isLoading && places.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
              px: 3,
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>🐾</Typography>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              {results.noResultsTitle}
            </Typography>
            <Typography color="text.secondary">
              {results.noResultsSubtitle}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
} 