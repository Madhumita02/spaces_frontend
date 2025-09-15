'use client';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const [error, setError] = useState('');

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password before sending
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
      return;
    }

    try {
      const res = await fetch('https://spaces-backend-wrmn.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const data = await res.json();
      console.log('Signup success:', data);

      // Redirect to login after success
      router.push('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Blinker, sans-serif' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ color: '#8C52FF', fontWeight: 800, fontFamily: 'Blinker, sans-serif', mb: 3, textAlign: 'center' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
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
            sx={{ mb: 2 }}
            helperText="Min 8 chars, 1 uppercase, 1 number, 1 special character"
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
          >
            <MenuItem value="consumer">Consumer</MenuItem>
            <MenuItem value="brand_owner">Brand Owner</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </TextField>
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
            Sign Up
          </Button>
        </form>
        <Typography sx={{ mt: 3, textAlign: 'center', color: '#555' }}>
          Already have an account?{' '}
          <Link href="/login" passHref legacyBehavior>
            <Button variant="text" sx={{ color: '#8C52FF', fontWeight: 700, textTransform: 'none', p: 0 }}>
              Login
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}