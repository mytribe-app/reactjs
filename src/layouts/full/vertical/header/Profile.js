import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { AuthContext } from 'src/context/AuthContext';
import { getUserById } from 'src/services/api';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { token, user, logout, selectedUserId, setSelectedUserId, sessionUser, users } =
    useContext(AuthContext);
  const [localSessionUser, setLocalSessionUser] = useState(null); // For managing session user in local state
  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    const fetchSelectedUser = async () => {
      if (token && user?.user?.id) {
        const sessionUserData = await getUserById(user.user.id, token);
        setLocalSessionUser(sessionUserData?.data);
      } else if (selectedUserId) {
        const sessionUserData = await getUserById(selectedUserId);
        setLocalSessionUser(sessionUserData?.data);
      }
    };
    fetchSelectedUser();
  }, [token, user?.user?.id, selectedUserId]);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const handleUserSelect = async (event) => {
    const selectedUserId = event.target.value;
    setSelectedUserId(selectedUserId);
    try {
      const userData = await getUserById(selectedUserId);
      setLocalSessionUser(userData?.data);
    } catch (error) {
      console.error('Error fetching selected user data:', error);
    }
  };

  const displayUser = localSessionUser || sessionUser;

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show user profile"
        color="inherit"
        aria-controls="user-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',

          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={displayUser?.profile ? `data:image/jpeg;base64,${displayUser?.profile}` : null}
          alt="User Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                src={displayUser?.profile ? `data:image/jpeg;base64,${displayUser?.profile}` : null}
                sx={{ width: 95, height: 95 }}
              />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {displayUser?.first_name} {displayUser?.last_name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {displayUser?.position}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {displayUser?.email}
                </Typography>
              </Box>
            </Stack>

            {!token && (
              <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="user-select-label">Select User</InputLabel>
                  <Select
                    labelId="user-select-label"
                    value={selectedUserId || ''}
                    onChange={handleUserSelect}
                    label="Select User"
                  >
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.first_name} {user.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <Divider />
            <Box mt={2}>
              <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
