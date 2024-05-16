import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../utils/helper'; 
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthorID] = useState('');
  const [datePosted, setDatePosted] = useState('');
      
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  if(!token) navigate('/signin');

  useEffect(() => {

    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    };

    const formattedDate = new Date().toLocaleDateString('en-IN', options);
    setDatePosted(formattedDate)
    getUser()
  }, []); // Empty dependency array to run the effect only once on component mount

  const submitToServer = async (data) => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      await axios.post(`${server.baseURL}/blog/post`, data, requestConfig)
      navigateBack()
    } catch (error) {
      console.error('Error creating post: ', error)
    }
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

  const getCurrentLoggedInUser = localStorage.getItem('currentLoggedInUserEmail')

  const getUser = () => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      axios.get(`${server.baseURL}/user/${getCurrentLoggedInUser}`, requestConfig)
        .then(response => {
          setAuthorID(response.data._id)
        })
        .catch(error => console.error('Error fetching current logged in user:', error));
    } catch (error) {
        console.error('Error fetching user details: ', error);
    }
  }

  const navigateBack = () => {
    navigate('/home')
  };

  const handleLogoutUser = () => {
    navigate('/signout')
  }

  return (
    <>
      <div className="d-flex mt-2 justify-content-center align-items-center">
        <button className="btn btn-success mr-1" onClick={navigateBack}>View All Posts</button>
        <button className="btn btn-danger" onClick={handleLogoutUser}>Logout</button>
      </div>
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
        <div className="col-md-5 form-wrapper">
          <h2> Create Post </h2>
          <form id="create-post-form" onSubmit={createPost}>
            <div className="form-group col-md-5">
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
            <div className="form-group col-md-5">
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
            <div className="form-group col-md-5">
              <label htmlFor="body"> Content </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                cols="30"
                rows="5"
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
