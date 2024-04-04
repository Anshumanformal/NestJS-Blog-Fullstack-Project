import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../utils/helper'; 
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [datePosted, setDatePosted] = useState('');
      
  const navigate = useNavigate();

  useEffect(() => {
    setDatePosted(new Date().toLocaleDateString());
  }, []); // Empty dependency array to run the effect only once on component mount

  const submitToServer = (data) => {
    axios.post(`${server.baseURL}/blog/post`, data)
      .then(response => {
        navigate('/home'); // Assuming '/home' is the route you want to navigate to after successful post creation
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  const createPost = (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      body,
      author,
      date_posted: datePosted,
    };
    submitToServer(postData);
  };

  return (
    <div>
      <div className="col-md-12 form-wrapper">
        <h2> Create Post </h2>
        <form id="create-post-form" onSubmit={createPost}>
          <div className="form-group col-md-12">
            <label htmlFor="title"> Title </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="form-control"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="body"> Write Content </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              name="author"
              className="form-control"
            />
          </div>

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              {' '}
              Create Post{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
