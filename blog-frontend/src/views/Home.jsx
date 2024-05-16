import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../utils/helper'
import logo from '../BlogAR_image.jpg';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [authorFullName, setAuthorFullName] = useState('');
  const [authorID, setAuthorID] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);

  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()
  const getCurrentLoggedInUser = localStorage.getItem('currentLoggedInUserEmail')

  const getUser = async () => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      if(getCurrentLoggedInUser) {
        const response = await axios.get(`${server.baseURL}/user/${getCurrentLoggedInUser}`, requestConfig)
        if(response) {
          setAuthorFullName(response.data.fullName)
          setAuthorID(response.data._id)
        }
        else console.error('Error fetching current logged in user')
      }
      else throw new Error('Logged in User Email not found in localStorage')
    } catch (error) {
        console.error('Error fetching user details: ', error);
    }
  }

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (hideModalTimeout) {
        clearTimeout(hideModalTimeout);
      }
    };
  }, [hideModalTimeout]);

  const fetchPosts = async () => {
    try {
        const response = await axios.get(`${server.baseURL}/blog/posts`);
        setPosts(response.data);
      }
    catch (error) {
      console.error('Error fetching posts : ', error);
    }
  };

  const fetchPostOfAnAuthor = async () => {
      try {
        if(token && authorID) {
          const requestConfig = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          const response = await axios.get(`${server.baseURL}/blog/post/${authorID}`, requestConfig)
          if(!response) throw new Error('Error fetching posts of an author')
          setPosts(response.data)
        }
      } catch (error) {
        console.error('Error fetching posts : ', error);
      }
  }

  useEffect(() => {
    getUser()
  }, []); // Empty dependency array to run the effect only once on component mount

  useEffect(() => {
    token && authorID ? fetchPostOfAnAuthor() : fetchPosts()
  }, [token, authorID]);

  const deletePost = async (postId, authorID) => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      await axios.delete(`${server.baseURL}/blog/post?postID=${postId}&authorID=${authorID}`, requestConfig);
      setShowSuccessModal(true)
      const timeoutId = setTimeout(() => {
        setShowSuccessModal(false);
        setHideModalTimeout(timeoutId);
      }, 2000);
      fetchPostOfAnAuthor(); // Fetch posts again after deletion
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
          <li className="nav-item">
            <img src={logo} alt="logo" style={{height: '100px', width: 'auto' }} />
          </li>
        </ul>
        {
          token ? (
            <>
              <p className="mr-3">
                <span style={{ color: 'white', fontSize: '50px'}}>Hi {authorFullName}</span>
              </p>
            <button type="button" class="btn btn-danger mr-2" onClick={handleSignOutClick}>Logout</button>
            </>
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
        {/* Bootstrap Popup for Success */}
        <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-success">
              <div className="modal-body text-white">
                Post deleted successfully
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {posts.length === 0 ?
          (
            <div className="col-md-12 text-center">
              <h2>No Posts found</h2>
            </div>
          ) :
          (
            posts.map((post) => {
              return (
                <div className="col-md-4" key={post._id}>
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title">{post.title}</h2>
                      <p className="card-text">{post.body.length > 20 ? post.body.slice(0,30) + '...' : post.body}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group" style={{ marginBottom: '20px' }}>
                          {
                            token ? (
                              <>
                              <Link to={`/post/${post._id}/${authorID}`} className="btn btn-sm btn-outline-secondary mr-1">View Post</Link>
                              <Link to={`/edit/${post._id}/${authorID}`} className="btn btn-sm btn-outline-secondary mr-1">Edit Post</Link>
                              <button className="btn btn-sm btn-outline-secondary mr-1" onClick={() => deletePost(post._id, post.author._id)}>Delete Post</button>
                              </>
                            ) : (
                              <>
                                  <button type="button" class="btn btn-sm btn-outline-secondary mr-1" data-toggle="tooltip" data-placement="top" title="Login to view Post" onClick={handleSignInClick}>View Post</button>
                                  <button type="button" class="btn btn-sm btn-outline-secondary mr-1" data-toggle="tooltip" data-placement="top" title="Login to edit Post" onClick={handleSignInClick}>Edit Post</button>
                                  <button type="button" class="btn btn-sm btn-outline-secondary mr-1" data-toggle="tooltip" data-placement="top" title="Login to delete Post" onClick={handleSignInClick}>Delete Post</button>
                              </>
                            )
                          }
                        </div>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Posted on: {post.date_posted}</small><br />
                        <small className="text-muted">Author: {post.author.fullName}</small>
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