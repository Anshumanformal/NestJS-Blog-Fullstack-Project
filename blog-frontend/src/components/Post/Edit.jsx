import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  if(!token) navigate('/signin');

  const getPost = () => {
    axios.get(`${server.baseURL}/blog/post/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  };

  useEffect(() => {
    getPost();
  }, []); // Empty dependency array to run the effect only once on component mount

  const navigateBack = () => {
    navigate('/home')
  };

  const editPost = (e) => {
    e.preventDefault();
    const postData = {
      title: post.title,
      description: post.description,
      body: post.body,
      author: post.author,
      date_posted: post.date_posted,
    };

    const requestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    axios.put(`${server.baseURL}/blog/post?postID=${id}`, postData, requestConfig)
      .then(navigateBack)
      .catch(error => console.error('Error editing post:', error));
  };

  const handleLogoutUser = () => {
    navigate('/signout')
  }  

  return (
    <div>
      <div style={{ marginTop: '30px' }}>
        <div className="d-flex mt-2 justify-content-center align-items-center">
          <button className="btn btn-success mr-1" onClick={navigateBack}>View All Posts</button>
          <button className="btn btn-danger" onClick={handleLogoutUser}>Logout</button>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
      <div className="col-md-5 form-wrapper">
        <h2> Edit Post </h2>
        <form id="edit-post-form" onSubmit={editPost}>
          <div className="form-group col-md-5">
            <label htmlFor="title"> Title </label>
            <input
              type="text"
              id="title"
              value={post.title || ''}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              name="title"
              className="form-control"
              placeholder="Enter title"
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="description"> Description </label>
            <input
              type="text"
              id="description"
              value={post.description || ''}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
              name="description"
              className="form-control"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="body"> Write Content </label>
            <textarea
              id="body"
              value={post.body || ''}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              cols="30"
              rows="5"
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="author"> Author </label>
            <input
              type="text"
              id="author"
              value={post.author || ''}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
              name="author"
              className="form-control"
            />
          </div>

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit"> Edit Post </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default EditPost;
