import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import BannerContent from './BannerContent';


const Banner = () => {


  return (
    <Box mb={10} sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6} md={8}>
            <BannerContent />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
