'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Chip,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Grid,
  Divider,
} from '@mui/material';
import { Info, People, Star, AttachMoney, PhotoCamera, AddCircle } from '@mui/icons-material';

const categories = [
  'Café',
  'Coworking',
  'Rooftop',
  'Event Space',
  'Office',
  'Pop-up',
  'Other',
];

const amenitiesList = [
  'Wi-Fi',
  'Power Outlets',
  'Projector / Screen',
  'Parking',
  'Air Conditioning',
  'Heating',
  'Sound System',
  'Coffee / Snacks / Kitchen',
  'Pet-friendly',
  'Accessibility Features',
];

export default function BrandOwnerLanding() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [capacity, setCapacity] = useState('');
  const [seating, setSeating] = useState('');
  const [areaSize, setAreaSize] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [virtualTour, setVirtualTour] = useState('');
  const [houseRules, setHouseRules] = useState('');
  const [availability, setAvailability] = useState('');
  const [contact, setContact] = useState('');
  const [tags, setTags] = useState('');

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleAmenitiesChange = (event: any) => {
    const { value } = event.target;
    setAmenities(typeof value === 'string' ? value.split(',') : value);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('address', address);
  formData.append('mapsLink', mapsLink);
  formData.append('city', city);
  formData.append('state', state);
  formData.append('postalCode', postalCode);
  formData.append('capacity', String(Number(capacity)));
  formData.append('seating', seating);
  formData.append('areaSize', areaSize);
  formData.append('amenities', JSON.stringify(amenities));
  formData.append('hourlyRate', String(Number(hourlyRate)));
  formData.append('dailyRate', String(Number(dailyRate)));
  formData.append('virtualTour', virtualTour);
  formData.append('houseRules', houseRules);
  formData.append('availability', availability);
  formData.append('contact', contact);
  formData.append('tags', tags);

  images.forEach(file => formData.append('files', file));

  try {
    const res = await fetch('http://localhost:3000/spaces', {
      method: 'POST',
      body: formData, // No auth header needed
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: res.statusText }));
      console.error('Backend error:', errorData);
      throw new Error(errorData.message || 'Failed to add space');
    }

    const data = await res.json();
    console.log('Space added successfully:', data);
    alert('Space added successfully!');
    window.location.href = 'haha';
  } catch (err: any) {
    console.error('Error while submitting space:', err);
    alert(err.message);
  }
};



  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f8ff 0%, #e9e3ff 100%)',
        py: 6,
        fontFamily: 'Blinker, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 5,
          maxWidth: 700,
          width: '100%',
          boxShadow: '0 8px 32px rgba(140,82,255,0.12)',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src="/assets/logo-transparent.png"
            alt="Spaces Logo"
            style={{
              width: 180,
              maxWidth: '220px',
              marginBottom: 0,
              marginTop: '-32px',
              filter: 'drop-shadow(0 2px 8px #8C52FF33)',
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: '#8C52FF',
            fontWeight: 800,
            fontFamily: 'Blinker, sans-serif',
            mb: 1,
            textAlign: 'center',
            letterSpacing: 1,
            fontSize: '2.2rem',
          }}
        >
          Add Your Space
        </Typography>
        <Typography sx={{ color: '#555', fontFamily: 'Blinker, sans-serif', mb: 3, textAlign: 'center', fontSize: '1.1rem' }}>
          Share your venue with the world! Fill in the details below to attract the perfect guests.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Info sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Basic Information
            </Typography>
          </Box>
          <TextField
            label="Name / Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ fontFamily: 'Blinker, sans-serif' }}>Category / Type</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category / Type"
              input={<OutlinedInput label="Category / Type" />}
              sx={{ fontFamily: 'Blinker, sans-serif' }}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontFamily: 'Blinker, sans-serif' }}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Address / Location"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <TextField
            label="Google Maps Link"
            variant="outlined"
            fullWidth
            value={mapsLink}
            onChange={(e) => setMapsLink(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }} component="div">
            <Grid item xs={12} sm={4} component="div">
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
            <Grid item xs={12} sm={4} component="div">
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
            <Grid item xs={12} sm={4} component="div">
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Capacity & Layout */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <People sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Capacity & Layout
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mb: 2 }} component="div">
            <Grid item xs={12} sm={6} component="div">
              <TextField
                label="Capacity (number of people)"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                label="Seating Type / Layout"
                variant="outlined"
                fullWidth
                value={seating}
                onChange={(e) => setSeating(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Floor / Area Size (sq ft or sq m)"
            variant="outlined"
            fullWidth
            value={areaSize}
            onChange={(e) => setAreaSize(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Amenities & Features */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Star sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Amenities & Features
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ fontFamily: 'Blinker, sans-serif' }}>Amenities</InputLabel>
            <Select
              multiple
              value={amenities}
              onChange={handleAmenitiesChange}
              input={<OutlinedInput label="Amenities" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} sx={{ fontFamily: 'Blinker, sans-serif', bgcolor: '#f3eaff', color: '#8C52FF' }} />
                  ))}
                </Box>
              )}
              sx={{ fontFamily: 'Blinker, sans-serif' }}
              required
            >
              {amenitiesList.map((amenity) => (
                <MenuItem key={amenity} value={amenity} sx={{ fontFamily: 'Blinker, sans-serif' }}>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Pricing & Booking */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoney sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Pricing & Booking
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mb: 2 }} component="div">
            <Grid item xs={12} sm={6} component="div">
              <TextField
                label="Hourly Rate"
                variant="outlined"
                fullWidth
                required
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                label="Daily Rate / Packages"
                variant="outlined"
                fullWidth
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                sx={{ fontFamily: 'Blinker, sans-serif' }}
                InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Media */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PhotoCamera sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Media
            </Typography>
          </Box>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              color: '#8C52FF',
              borderColor: '#8C52FF',
              fontWeight: 700,
              fontFamily: 'Blinker, sans-serif',
              mb: 2,
              bgcolor: '#fff',
              '&:hover': { bgcolor: '#f3eaff', borderColor: '#8C52FF' },
            }}
          >
            Upload Images
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImagesChange}
            />
          </Button>
          {images.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontFamily: 'Blinker, sans-serif', color: '#555', mb: 1 }}>
                Selected Images:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {images.map((file, idx) => (
                  <Typography key={idx} sx={{ fontSize: 12, color: '#8C52FF', fontFamily: 'Blinker, sans-serif' }}>
                    {file.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          <TextField
            label="360° Tour / Virtual Tour Link (optional)"
            variant="outlined"
            fullWidth
            value={virtualTour}
            onChange={(e) => setVirtualTour(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Additional Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AddCircle sx={{ color: '#8C52FF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#8C52FF', fontWeight: 700 }}>
              Additional Info / Extras
            </Typography>
          </Box>
          <TextField
            label="House Rules / Policies"
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            value={houseRules}
            onChange={(e) => setHouseRules(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <TextField
            label="Availability Schedule (open hours, blocked dates)"
            variant="outlined"
            fullWidth
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <TextField
            label="Contact Info (phone/email)"
            variant="outlined"
            fullWidth
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />
          <TextField
            label="Tags / Keywords (for search & filtering)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{ mb: 3, fontFamily: 'Blinker, sans-serif' }}
            InputLabelProps={{ style: { fontFamily: 'Blinker, sans-serif' } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#8C52FF',
              color: '#fff',
              fontWeight: 700,
              fontFamily: 'Blinker, sans-serif',
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              boxShadow: '0 2px 8px #8C52FF44',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#7a45e5', transform: 'scale(1.03)' },
            }}
          >
            Add Space
          </Button>
        </form>
      </Paper>
    </Box>
  );
}