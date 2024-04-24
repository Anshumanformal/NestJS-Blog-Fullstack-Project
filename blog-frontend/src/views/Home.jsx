import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../utils/helper'

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array to run the effect only once on component mount

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${server.baseURL}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      await axios.delete(`${server.baseURL}/blog/post?postID=${postId}`, requestConfig);
      fetchPosts(); // Fetch posts again after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const navigateToCreatePost = () => {
    navigate('/create')
  };

  const handleSignInClick = () => {
    navigate("/signin")
  }

  const handleSignUpClick = () => {
    navigate("/signup")
  }

  const handleSignOutClick = () => {
    navigate("/signout")
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        </ul>
        {
          token ? (
            <button type="button" class="btn btn-primary mr-2" onClick={handleSignOutClick}>Logout</button>
          ) : (
            <>
              <button type="button" class="btn btn-primary mr-2" onClick={handleSignInClick}>Login</button>
              <button type="button" class="btn btn-primary" onClick={handleSignUpClick}>Register</button>
            </>
          )
        }

      </nav>
      <div className="text-center">
        <h1>Blog Web App</h1>
        <p>Blog webapp built with NestJS, ReactJS and MongoDB</p>
        {/* Irrespective of any post is available or not, any logged in user should be able to create multiple posts */}
        <button className="btn btn-success" onClick={navigateToCreatePost}>Create Post</button>
      </div>
      <div className="row">
        {posts.length === 0 ?
          (
            <div className="col-md-12 text-center">
              <h2>No Posts found</h2>
              <button className="btn btn-success" onClick={navigateToCreatePost}>Create Post</button>
            </div>
          ) :
          (
            posts.map((post) => {
              return (
                <div className="col-md-4" key={post._id}>
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title">{post.title}</h2>
                      <p className="card-text">{post.body}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group" style={{ marginBottom: '20px' }}>
                          {/* Only allow logged in users to edit or delete a post */}
                          {
                            token ? (
                              <>
                              <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary mr-1">View Post</Link>
                              <Link to={`/edit/${post._id}`} className="btn btn-sm btn-outline-secondary mr-1">Edit Post</Link>
                              <button className="btn btn-sm btn-outline-secondary mr-1" onClick={() => deletePost(post._id)}>Delete Post</button>
                              </>
                            ) : (
                              <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary mr-1">View Post</Link>
                            )
                          }
                        </div>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Posted on: {post.date_posted}</small><br />
                        <small className="text-muted">by: {post.author}</small>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  );
};

export default BlogList;