import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../utils/helper'

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

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
      await axios.delete(`${server.baseURL}/blog/post?postID=${postId}`);
      fetchPosts(); // Fetch posts again after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const navigateToHome = () => {
    navigate('/create')
  };

  const handleSignInClick = () => {
    navigate("/signin")
  }

  const handleSignUpClick = () => {
    navigate("/signup")
  }

  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          </ul>
          <button type="button" class="btn btn-primary mr-2" onClick={handleSignInClick}>Sign In</button>
          <button type="button" class="btn btn-primary" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </nav>
      <div className="text-center">
        <h1>Nest Blog Tutorial</h1>
        <p>This is the description of the blog built with NestJS, ReactJS and MongoDB</p>
      </div>

      <div className="row">
        {posts.length === 0 ?
          (
            <div className="col-md-12 text-center">
              <h2>No Posts found</h2>
              <button className="btn btn-success" onClick={navigateToHome}>Create Post</button>
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
                          <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary">View Post</Link>
                          <Link to={`/edit/${post._id}`} className="btn btn-sm btn-outline-secondary">Edit Post</Link>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => deletePost(post._id)}>Delete Post</button>
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