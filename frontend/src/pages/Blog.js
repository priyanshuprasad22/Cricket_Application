import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Blog.css';

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postLikes, setPostLikes] = useState({});
    const [postComments, setPostComments] = useState({});
    const [newComment, setNewComment] = useState("");

    const token = localStorage.getItem('token');
    const useremail = localStorage.getItem('email');

    useEffect(() => {
        if (token) {
            fetchPosts();
        }
    }, [token]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8082/api/posts', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);

            // Fetch comments for each post
            data.forEach((post) => {
                fetchComments(post.id);
            });
        } catch (err) {
            console.error('Error fetching posts', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8082/api/posts/${postId}/comments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const comments = await response.json();
            setPostComments((prev) => ({ ...prev, [postId]: comments }));
        } catch (err) {
            console.error('Error fetching comments', err);
        }
    };

    const handleCreateOrUpdatePost = async (e) => {
        e.preventDefault();
        const newPost = { title, content };
        try {
            if (isEditing) {
                await fetch(`http://localhost:8082/api/posts/${currentPostId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)
                });
                setIsEditing(false);
                setCurrentPostId(null);
            } else {
                await fetch('http://localhost:8082/api/posts', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)
                });
            }
            setTitle('');
            setContent('');
            fetchPosts();
        } catch (err) {
            console.error('Error saving post', err);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await fetch(`http://localhost:8082/api/posts/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts();
        } catch (err) {
            console.error('Error deleting post', err);
        }
    };

    const handleLikePost = async (id) => {
        try {
            const response = await fetch(`http://localhost:8082/api/posts/${id}/like?likedBy=${useremail}`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }
            });

            if (!response.ok) {
                console.error('Failed to like post:', response.status, response.statusText);
                return;
            }

            fetchPostLikes(id);
        } catch (err) {
            console.error('Error liking post', err);
        }
    };

    const fetchPostLikes = async (id) => {
        try {
            const response = await fetch(`http://localhost:8082/api/posts/${id}/getlike`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch likes:', response.status, response.statusText);
                return;
            }

            const data = await response.json();
            setPostLikes((prev) => ({ ...prev, [id]: data }));
        } catch (err) {
            console.error('Error fetching likes', err);
        }
    };

    const handleComment = async (id) => {
        const commentText = newComment;
        try {
            await fetch(`http://localhost:8082/api/posts/${id}/comment`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ commentText, commentBy: useremail })
            });
            fetchComments(id);
            setNewComment('');
        } catch (err) {
            console.error('Error adding comment', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Blog</h2>
            <form onSubmit={handleCreateOrUpdatePost} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update Post' : 'Create Post'}</button>
            </form>

            <AnimatePresence>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    posts.map((post) => (
                        <motion.div key={post.id} className="post mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <div className="d-flex">
                                <button onClick={() => handleLikePost(post.id)} className="btn btn-outline-primary">Like</button>
                                <button onClick={() => handleDeletePost(post.id)} className="btn btn-outline-danger">Delete</button>
                            </div>
                            <div className="comments">
                                <button onClick={() => setPostComments((prev) => ({
                                    ...prev,
                                    [post.id]: prev[post.id] ? null : post.comments,
                                }))} className="btn btn-outline-info mt-3">
                                    {postComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                                </button>
                                {postComments[post.id] && (
                                    <>
                                        <div>
                                            {postComments[post.id].map((comment) => (
                                                <div key={comment.id} className="comment">
                                                    <strong>{comment.commentBy}</strong>
                                                    <p>{comment.commentText}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="form-control mt-2"
                                        />
                                        <button onClick={() => handleComment(post.id)} className="btn btn-primary mt-2">
                                            Post Comment
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
};
