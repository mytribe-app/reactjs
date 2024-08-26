import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import {
  getUserById,
  getUsers,
  createContact,
  getAllContacts,
  fetchUsers,
  fetchAllContacts,
} from 'src/services/api';
import { AuthContext } from 'src/context/AuthContext';

const ChatPage = () => {
  const [usersData, setUsers] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [sessionUser, setSessionUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState('');
  const [reasonsList, setReasonsList] = useState([]);

  const sessionUserId = user?.user?.id;

  useEffect(() => {
    const fetchUsersAndMessages = async () => {
      try {
        if (token && sessionUserId) {
          const sessionUserResponse = await getUserById(sessionUserId, token);
          setSessionUser(sessionUserResponse?.data);
          const allUsers = await getUsers(token);
          setUsers(allUsers.data);

          const contacts = await getAllContacts(token);
          setReasonsList(contacts.data);
        } else {
          const allUsers = await fetchUsers();
          setUsers(allUsers.data);

          const contacts = await fetchAllContacts();
          setReasonsList(contacts.data);
        }
      } catch (error) {
        console.error('Error fetching users or messages:', error);
      }
    };

    fetchUsersAndMessages();
  }, [token, sessionUserId]);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);

    if (!token) {
      try {
        const userContactDetails = await fetchContactById(user._id);
        setSessionUser(userContactDetails?.data);
      } catch (error) {
        console.error('Error fetching selected user contact details:', error);
      }
    }
  };

  const handleReasonSubmit = async () => {
    if (!reason.trim() || !selectedUser) return;

    const contactData = {
      user_id: sessionUserId,
      contact_user_id: selectedUser._id,
      reason,
    };

    try {
      if (token) {
        const response = await createContact(contactData, token);
        setReasonsList([...reasonsList, response.data]);
      } else {
        // Here you might need to implement an alternate submission process for when no token is present
      }
      setReason(''); // Clear the input field
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <Card sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3}>
            <Box display="flex" alignItems="center">
              <Avatar
                alt={`${sessionUser?.first_name || ''} ${sessionUser?.last_name || ''}`}
                // src={`data:image/jpeg;base64,${sessionUser?.profile}`}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography variant="h6">
                  {sessionUser?.first_name || ''} {sessionUser?.last_name || ''}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {sessionUser?.position || ''}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={9}>
            {selectedUser && (
              <Box display="flex" alignItems="center">
                <Avatar
                  alt={`${selectedUser?.first_name || ''} ${selectedUser?.last_name || ''}`}
                  // src={`data:image/jpeg;base64,${selectedUser?.profile}`}
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedUser?.first_name || ''} {selectedUser?.last_name || ''}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedUser?.position || ''}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>

      <CardContent sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Box sx={{ width: '25%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
          <List>
            {usersData.map((user) => (
              <ListItem button key={user._id} onClick={() => handleUserSelect(user)}>
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

        <Box
          sx={{
            flex: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            <Typography variant="h6">All Messages</Typography>
            <Divider sx={{ my: 2 }} />
            {reasonsList.map((reasonItem) => (
              <Box
                key={reasonItem._id}
                mb={2}
                sx={{
                  display: 'flex',
                  justifyContent:
                    reasonItem.user_id?._id === sessionUserId ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '60%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor:
                      reasonItem.user_id?._id === sessionUserId ? '#DCF8C6' : '#F1F0F0',
                    textAlign: reasonItem.user_id?._id === sessionUserId ? 'right' : 'left',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    <strong>
                      {reasonItem.user_id?._id === sessionUserId
                        ? 'You'
                        : `${reasonItem.user_id?.first_name || ''} ${reasonItem.user_id?.last_name || ''}`}
                      :
                    </strong>{' '}
                    {reasonItem.reason}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Reason"
              variant="outlined"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleReasonSubmit} sx={{ ml: 2 }}>
              Send
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatPage;
