import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { AuthContext } from 'src/context/AuthContext'; // Ensure this path is correct
import AuthLogin from './AuthLogin';

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    return (
        <PageContainer title="Login" description="This is the login page">
            <Grid container spacing={0} justifyContent="center">
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
                        <AuthLogin
                            onLogin={login} // Pass the 'login' function as a prop to 'AuthLogin'
                            title="Welcome to Modernize"
                            subtext={
                                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                                    Your Admin Dashboard
                                </Typography>
                            }
                            subtitle={
                                <Stack direction="row" spacing={1} mt={3}>
                                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                                        New to Modernize?
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to="/auth/register"
                                        fontWeight="500"
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'primary.main',
                                        }}
                                    >
                                        Create an account
                                    </Typography>
                                </Stack>
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default LoginPage;
