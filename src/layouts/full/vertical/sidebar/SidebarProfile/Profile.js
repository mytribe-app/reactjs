import React, { useContext, useEffect, useState } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from 'src/context/AuthContext';
import { getUserById } from 'src/services/api';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const { token, user, logout } = useContext(AuthContext);
  const [sessionUser, setSessionUser] = useState(null);
  const id = user?.user?.id;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {

      try {

        const sessionUser = await getUserById(id, token);
        setSessionUser(sessionUser?.data)
        console.log(sessionUser?.data)

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {

    logout();
    localStorage.removeItem('authToken');
    navigate('/auth/login')
  }
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64,${sessionUser?.profile}`} />

          <Box>
            <Typography variant="h6" color="textPrimary">{sessionUser?.first_name} {sessionUser?.last_name}</Typography>
            <Typography variant="caption" color="textSecondary"> {sessionUser?.position}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
