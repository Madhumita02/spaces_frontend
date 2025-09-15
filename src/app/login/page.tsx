'use client';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role: 'consumer' | 'brand_owner' | 'staff';
  iat?: number;
  exp?: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://spaces-backend-wrmn.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      console.log('Login success:', data);

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);

        // Decode JWT to get role
        const decoded = jwtDecode<JwtPayload>(data.access_token);

        // Redirect based on role
        if (decoded.role === 'consumer') {
          router.push('/consumer');
        } else if (decoded.role === 'brand_owner') {
          router.push('/brand-owner'); // use hyphen if your folder is named this way
        } else if (decoded.role === 'staff') {
          router.push('/staff');
        } else {
          router.push('/'); // fallback
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f8ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Blinker, sans-serif',
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%' }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#8C52FF',
            fontWeight: 800,
            fontFamily: 'Blinker, sans-serif',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          {error && (
            <Typography sx={{ color: 'red', mb: 2, fontSize: '0.9rem' }}>
              {error}
            </Typography>
          )}
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
              fontSize: '1rem',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#7a45e5' },
            }}
          >
            Login
          </Button>
        </form>
        <Typography sx={{ mt: 3, textAlign: 'center', color: '#555' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" passHref legacyBehavior>
            <Button
              variant="text"
              sx={{
                color: '#8C52FF',
                fontWeight: 700,
                textTransform: 'none',
                p: 0,
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
