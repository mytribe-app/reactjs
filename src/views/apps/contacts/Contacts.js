import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { getUsers, fetchUsers } from 'src/services/api';
import { AuthContext } from 'src/context/AuthContext';

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        let allUser;
        if (token) {
          // If a token is present, fetch users with token
          allUser = await getUsers(token);
        } else {
          // If no token is present, fetch users without token
          allUser = await fetchUsers();
        }
        setUsers(allUser.data);
        setSelectedUser(allUser.data[0]); // Automatically select the first user
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersData();
  }, [token]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Contacts
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: 'row', p: 3, boxShadow: 3 }}>
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #ccc',
            pr: 3,
            mr: 3,
            height: '500px', // Fixed height for the list container
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          <Typography variant="h6" gutterBottom>
            Contact List
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem
                button
                key={user._id}
                onClick={() => handleUserSelect(user)}
                selected={selectedUser && selectedUser._id === user._id}
                sx={{ borderRadius: '5px', mb: 2, px: 2 }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`${user.first_name} ${user.last_name}`}
                    // src={`data:image/jpeg;base64,${user.profile}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={user.position}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ width: '70%', pl: 3 }}>
          {selectedUser ? (
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                  // src={`data:image/jpeg;base64,${selectedUser.profile}`}
                  sx={{ width: 100, height: 100, mr: 4 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {selectedUser.first_name} {selectedUser.last_name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {selectedUser.position}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {selectedUser.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {selectedUser.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Address:</strong> {selectedUser.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Company:</strong> {selectedUser.company}
                </Typography>
              </Box>
            </CardContent>
          ) : (
            <Typography>Select a contact to view details</Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default Contacts;
