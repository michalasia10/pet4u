import { useState } from "react";
import { useParams } from "react-router-dom"; // Assuming react-router-dom is used for routing
import {
  Box,
  Container,
  Typography,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Avatar,
  Rating,
  Divider,
  Stack,
  Paper,
  ImageList,
  ImageListItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Star,
  LocationOn,
  AccessTime,
  Phone,
  Language,
  CalendarToday,
  CameraAlt,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useGetPlaceDetails } from "../../application/hooks/useGetPlaceDetails";
import type { PlaceDetails } from "../../domain/entities/PlaceDetails";
import { ActionButton } from "../components/detail/ActionButton";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: Number(theme.shape.borderRadius) * 2,
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
  overflow: 'hidden',
}));


const renderLoading = () => (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Ładowanie danych miejsca...</Typography>
    </Container>
);

const renderError = (message: string) => (
    <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
            Wystąpił błąd: {message}
        </Alert>
    </Container>
);

const PlaceDetailContent = ({ place }: { place: PlaceDetails }) => {
    const [selectedImage, setSelectedImage] = useState(place.galleryImages[0]);
    const theme = useTheme();

    return (
        <>
            {/* Image Gallery */}
            <StyledPaper sx={{ mb: 3 }}>
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                    component="img"
                    image={selectedImage}
                    alt={place.name}
                    sx={{ height: { xs: 250, md: 400 }, objectFit: "cover" }}
                    />
                    <Chip
                    icon={<CameraAlt />}
                    label={`${place.galleryImages.length} zdjęć`}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "white",
                    }}
                    />
                </Box>
                <ImageList cols={4} gap={8} sx={{ p: 1, m: 0 }}>
                    {place.galleryImages.map((img, index) => (
                    <ImageListItem
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        overflow: "hidden",
                        border: selectedImage === img ? "3px solid" : "3px solid transparent",
                        borderColor: selectedImage === img ? "primary.main" : "transparent",
                        }}
                    >
                        <img
                        src={img}
                        alt={`${place.name} ${index + 1}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </StyledPaper>

             {/* Main Info */}
            <StyledPaper sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                    {place.name}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Star sx={{ color: "warning.main" }} />
                        <Typography variant="body1" fontWeight="bold">
                        {place.averageRating}
                        </Typography>
                    </Stack>
                    <Chip
                        label="Otwarte" // This should be dynamic based on opening hours
                        color="success"
                        size="small"
                        sx={{ backgroundColor: "success.light", color: "success.dark" }}
                    />
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <LocationOn color="action" />
                    <Typography variant="body1">{place.address}</Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {place.description}
                    </Typography>
                </CardContent>
            </StyledPaper>

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3} mb={3}>
                {/* Contact & Hours */}
                <StyledPaper sx={{ height: "100%" }}>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>Informacje kontaktowe</Typography>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                        <AccessTime color="action" />
                        <Box>
                            <Typography variant="subtitle1">Godziny otwarcia</Typography>
                            <Typography variant="body2" color="text.secondary">{place.openingHours}</Typography>
                        </Box>
                        </Stack>
                        {place.contact.phone && <Stack direction="row" spacing={2} alignItems="center">
                            <Phone color="action" />
                            <Box>
                                <Typography variant="subtitle1">Telefon</Typography>
                                <Typography variant="body2" color="text.secondary">{place.contact.phone}</Typography>
                            </Box>
                        </Stack>}
                        {place.contact.website && <Stack direction="row" spacing={2} alignItems="center">
                            <Language color="action" />
                            <Box>
                                <Typography variant="subtitle1">Strona internetowa</Typography>
                                <Typography variant="body2" color="text.secondary">{place.contact.website}</Typography>
                            </Box>
                        </Stack>}
                    </Stack>
                    </CardContent>
                </StyledPaper>

                {/* Pet Amenities */}
                <StyledPaper sx={{ height: "100%" }}>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>Udogodnienia dla zwierząt</Typography>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
                        {place.amenities.map((amenity) => (
                        <Stack direction="row" spacing={1} alignItems="center" key={amenity.name}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                            <Typography variant="body2">{amenity.name}</Typography>
                        </Stack>
                        ))}
                    </Box>
                    </CardContent>
                </StyledPaper>
            </Box>
            
            {/* Action Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                <ActionButton icon={<CalendarToday />} label="Zarezerwuj wizytę" />
                <ActionButton icon={<Phone />} label="Zadzwoń" />
            </Stack>

            {/* Reviews */}
            <StyledPaper>
                <CardContent>
                <Typography variant="h6" gutterBottom>Opinie ({place.reviews.length})</Typography>
                <Stack spacing={3} divider={<Divider />}>
                    {place.reviews.map((review) => (
                    <Stack direction="row" spacing={2} key={review.id}>
                        <Avatar src={review.avatarUrl} alt={review.author} />
                        <Box flex={1}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={0.5} flexWrap="wrap">
                            <Typography fontWeight="bold">{review.author}</Typography>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary" sx={{ml: 'auto'}}>
                                {review.date}
                            </Typography>
                        </Stack>
                        <Typography variant="body2">{review.comment}</Typography>
                        </Box>
                    </Stack>
                    ))}
                </Stack>
                {place.reviews.length > 3 && 
                    <Button variant="outlined" fullWidth sx={{ mt: 3, borderColor: '#7E57C2', color: '#7E57C2', '&:hover': {borderColor: '#673AB7', backgroundColor: 'rgba(126, 87, 194, 0.04)'} }}>
                        Zobacz wszystkie opinie
                    </Button>
                }
                </CardContent>
            </StyledPaper>
        </>
    );
}

export default function PlaceDetailPage() {
  const { id = '1' } = useParams<{ id: string }>(); 
  const { data: place, isLoading, isError, error } = useGetPlaceDetails(id);
  const theme = useTheme();

  return (
    <Box sx={{ background: `linear-gradient(to bottom, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 45%, ${theme.palette.primary.light} 80%, ${theme.palette.primary.main} 100%)`, width: '100%' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {isLoading && renderLoading()}
        {isError && renderError(error.message)}
        {place && <PlaceDetailContent place={place as PlaceDetails} />}
      </Container>
    </Box>
  );
} 