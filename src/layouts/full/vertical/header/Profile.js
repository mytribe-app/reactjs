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
import { getUserById, fetchUsers } from 'src/services/api';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token, user, logout } = useContext(AuthContext);
  const [sessionUser, setSessionUser] = useState(null);
  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const id = user?.user?.id;

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (token) {
          const sessionUser = await getUserById(id, token);
          setSessionUser(sessionUser?.data);
        } else {
          const allUsers = await fetchUsers();
          setUsers(allUsers.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersData();
  }, [token, id]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    navigate('/auth/login');
  };

  const handleUserSelect = async (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    try {
      const userData = await getUserById(selectedUserId);
      setSessionUser(userData?.data);
    } catch (error) {
      console.error('Error fetching selected user data:', error);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={sessionUser?.profile ? `data:image/jpeg;base64,${sessionUser?.profile}` : null}
          alt="User Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
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
            {token ? (
              <Stack direction="row" py={3} spacing={2} alignItems="center">
                <Avatar
                  src={`data:image/jpeg;base64,${sessionUser?.profile}`}
                  sx={{ width: 95, height: 95 }}
                />
                <Box>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                    {sessionUser?.first_name} {sessionUser?.last_name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {sessionUser?.position}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <IconMail width={15} height={15} />
                    {sessionUser?.email}
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="user-select-label">Select User</InputLabel>
                  <Select
                    labelId="user-select-label"
                    value={selectedUser || ''}
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

                {sessionUser && (
                  <Stack direction="row" py={3} spacing={2} alignItems="center">
                    <Avatar
                      src={`data:image/jpeg;base64,${sessionUser?.profile}`}
                      sx={{ width: 95, height: 95 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                        {sessionUser?.first_name} {sessionUser?.last_name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {sessionUser?.position}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <IconMail width={15} height={15} />
                        {sessionUser?.email}
                      </Typography>
                    </Box>
                  </Stack>
                )}
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
