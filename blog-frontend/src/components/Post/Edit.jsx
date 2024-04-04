import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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

    axios.put(`${server.baseURL}/blog/post?postID=${id}`, postData)
      .then(navigateBack)
      .catch(error => console.error('Error editing post:', error));
  };

  

  return (
    <div>
      <h4 className="text-center mt-20">
        <small>
          <button className="btn btn-success" onClick={navigateBack}> View All Posts </button>
        </small>
      </h4>
      <div className="col-md-12 form-wrapper">
        <h2> Edit Post </h2>
        <form id="edit-post-form" onSubmit={editPost}>
          <div className="form-group col-md-12">
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
          <div className="form-group col-md-12">
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
          <div className="form-group col-md-12">
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
          <div className="form-group col-md-12">
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
  );
};

export default EditPost;
