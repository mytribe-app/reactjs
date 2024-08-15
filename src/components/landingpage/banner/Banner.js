import React from 'react';
import { Grid, Box, Container, useMediaQuery, styled, Stack } from '@mui/material';
import BannerContent from './BannerContent';


const Banner = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const SliderBox = styled(Box)(() => ({
    '@keyframes slideup': {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
      },
      '100% ': {
        transform: 'translate3d(0px, -100%, 0px)',
      },
    },

    animation: 'slideup 35s linear infinite',
  }));

  const SliderBox2 = styled(Box)(() => ({
    '@keyframes slideDown': {
      '0%': {
        transform: 'translate3d(0, -100%, 0)',
      },
      '100% ': {
        transform: 'translate3d(0px, 0, 0px)',
      },
    },

    animation: 'slideDown 35s linear infinite',
  }));
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
