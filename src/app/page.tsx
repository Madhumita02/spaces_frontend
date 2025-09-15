import Link from 'next/link';
import { Box, Button, Typography, Card, CardMedia, CardContent } from '@mui/material';

const spaces = [
  {
    name: 'Cozy Loft',
    description: 'A beautiful loft in the city center.',
    image: '/assets/space1.jpg',
  },
  {
    name: 'Beach House',
    description: 'Enjoy the sea breeze in this modern beach house.',
    image: '/assets/space2.jpg',
  },
  {
    name: 'Conference Room',
    description: 'Perfect for meetings and workshops.',
    image: '/assets/space3.jpg',
  },
];

export default function DashboardHome() {
  return (
    <Box sx={{ fontFamily: 'Blinker, sans-serif', bgcolor: '#f8f8ff', minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          bgcolor: '#f8f8ff',
          boxShadow: '0 2px 8px rgba(140, 82, 255, 0.08)',
          px: 4,
          py: 2,
        }}
      >
        <Link href="/login" passHref legacyBehavior>
          <Button
            variant="outlined"
            sx={{
              color: '#8C52FF',
              borderColor: '#8C52FF',
              fontWeight: 700,
              fontFamily: 'Blinker, sans-serif',
              mr: 2,
              bgcolor: '#fff',
              '&:hover': { bgcolor: '#f3eaff', borderColor: '#8C52FF' },
            }}
          >
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref legacyBehavior>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#8C52FF',
              color: '#fff',
              fontWeight: 700,
              fontFamily: 'Blinker, sans-serif',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#7a45e5' },
            }}
          >
            Signup
          </Button>
        </Link>
      </Box>

      {/* Logo and Welcome */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6, mb: 4 }}>
        <img
          src="/assets/logo-transparent.png"
          alt="Spaces Logo"
          style={{ width: 180, marginBottom: 16 }}
        />
        <Typography
          variant="h4"
          sx={{
            color: '#8C52FF',
            fontWeight: 800,
            fontFamily: 'Blinker, sans-serif',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Welcome to Spaces by Fanppit
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#333',
            fontFamily: 'Blinker, sans-serif',
            textAlign: 'center',
            maxWidth: 500,
          }}
        >
          Discover, rent, or buy any kind of space. From cozy lofts to modern offices, Spaces makes it easy to find your perfect place.
        </Typography>
      </Box>

      {/* Spaces Cards */}
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          pb: 6,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {spaces.map((space, idx) => (
          <Box
            key={idx}
            sx={{
              width: { xs: '100%', md: '45%' },
              minWidth: 280,
              maxWidth: 450,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card sx={{ boxShadow: 4, borderRadius: 3, width: '100%' }}>
              <CardMedia
                component="img"
                height="180"
                image={space.image}
                alt={space.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: '#8C52FF', fontWeight: 700, fontFamily: 'Blinker, sans-serif' }}
                >
                  {space.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#555', fontFamily: 'Blinker, sans-serif' }}
                >
                  {space.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
