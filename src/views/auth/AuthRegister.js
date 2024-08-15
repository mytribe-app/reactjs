import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from 'src/services/api';
import { useNavigate } from 'react-router-dom';
import { encode } from 'base64-arraybuffer'; // Import the package for base64 conversion

const defaultTheme = createTheme();

export default function SignUp() {
  const [profileImage, setProfileImage] = React.useState(null);
  const navigate = useNavigate();

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the image to an ArrayBuffer and then to base64
        const arrayBuffer = reader.result;
        const base64String = encode(arrayBuffer);
        setProfileImage(`data:${file.type};base64,${base64String}`);
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {

      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      address: data.get('address'),
      company: data.get('company'),
      position: data.get('position'),
      profile: profileImage, // Set the profile image as a base64 string
      password: data.get('password'),
    };

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      console.error('Please fill out all required fields.');
      return;
    }

    try {
      const response = await register(formData);
      if (response.status === 201) {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  autoComplete="organization"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  autoComplete="job-title"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Profile Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </Button>
                {profileImage && (
                  <Box mt={2} textAlign="center">
                    <img
                      src={profileImage}
                      alt="Profile Preview"
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
