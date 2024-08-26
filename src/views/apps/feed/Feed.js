import React, { useContext, useState, useEffect } from 'react';
import {
    Container,
    Box,
    Button,
    Typography,
    Avatar,
    Card,
    CardContent,
    TextField,
    Divider,
} from '@mui/material';
import { getAllPosts, createPost, createComment, getCommentsByPostId } from 'src/services/api';
import { AuthContext } from 'src/context/AuthContext';

const FeedPage = () => {
    const { user, token, selectedUserId } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        if (!title.trim() || !content.trim()) return;

        const userId = user?.user?.id || selectedUserId; // Use logged-in user ID or selectedUserId
        const postData = { title, content, user_id: userId };

        try {
            const response = await createPost(postData, token);
            setPosts([response.data, ...posts]);
            setTitle('');
            setContent('');
            setIsCreatingPost(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleSelectPost = async (postId) => {
        const matchedPost = posts.find((post) => post._id === postId);
        if (matchedPost) {
            setSelectedPost(matchedPost);
            try {
                const response = await getCommentsByPostId(postId, token);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    };

    const handleCreateComment = async () => {
        if (!newComment.trim()) return;

        const userId = user?.user?.id || selectedUserId; // Use logged-in user ID or selectedUserId
        try {
            const commentData = {
                post_id: selectedPost._id,
                content: newComment,
                user_id: userId,
            };
            await createComment(commentData, token);
            setNewComment('');
            handleSelectPost(selectedPost._id); // Refresh the selected post and comments
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Today’s Posts</Typography>
                <Button variant="contained" onClick={() => setIsCreatingPost(!isCreatingPost)}>
                    {isCreatingPost ? 'Cancel' : 'Add Post'}
                </Button>
            </Box>

            {isCreatingPost && (
                <Box mb={3}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="What's on your mind?"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleCreatePost}>
                        Post
                    </Button>
                </Box>
            )}

            {selectedPost ? (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                                alt={`${selectedPost.user_id?.first_name || ''} ${selectedPost.user_id?.last_name || ''}`}
                            />
                            <Box ml={2}>
                                <Typography variant="h6">
                                    {selectedPost.user_id?.first_name || ''}{' '}
                                    {selectedPost.user_id?.last_name || ''}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {selectedPost.user_id?.position || ''}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h5">{selectedPost.title}</Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {selectedPost.content}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Comments</Typography>
                        {(comments || []).map((comment) => (
                            <Box key={comment._id} mb={1}>
                                <Typography variant="body2">
                                    <strong>
                                        {comment.user_id?.first_name || ''}{' '}
                                        {comment.user_id?.last_name || ''}:
                                    </strong>{' '}
                                    {comment.content}
                                </Typography>
                            </Box>
                        ))}
                        <TextField
                            label="Add a comment"
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateComment}
                            sx={{ mt: 2 }}
                        >
                            Submit Comment
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setSelectedPost(null)}
                            sx={{ mt: 2, ml: 2 }}
                        >
                            Back
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {(posts || []).map((post) => (
                        <Card key={post._id} sx={{ mb: 3 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar
                                        alt={`${post.user_id?.first_name || ''} ${post.user_id?.last_name || ''}`}
                                    />
                                    <Box ml={2}>
                                        <Typography variant="h6">
                                            {post.user_id?.first_name || ''}{' '}
                                            {post.user_id?.last_name || ''}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {post.user_id?.position || ''}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h5">{post.title}</Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {post.content}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSelectPost(post._id)}
                                    sx={{ mt: 2 }}
                                >
                                    Add Comment
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
        </Container>
    );
};

export default FeedPage;
