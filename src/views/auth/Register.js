import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Stack } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';


import AuthRegister from './AuthRegister';

const Register = () => (
    <PageContainer title="Register" description="this is Register page">
        <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>

            <Grid
                item
                xs={12}
                sm={12}
                lg={5}
                xl={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box p={4}>
                    <AuthRegister
                        title="Welcome to Modernize"
                        subtext={
                            <Typography variant="subtitle1" color="textSecondary" mb={1}>
                                Your Admin Dashboard
                            </Typography>
                        }
                        subtitle={
                            <Stack direction="row" spacing={1} mt={3}>
                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                    Already have an Account?
                                </Typography>
                                <Typography
                                    component={Link}
                                    to="/auth/login"
                                    fontWeight="500"
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                    }}
                                >
                                    Sign In
                                </Typography>
                            </Stack>
                        }
                    />
                </Box>
            </Grid>
        </Grid>
    </PageContainer>
);

export default Register;
