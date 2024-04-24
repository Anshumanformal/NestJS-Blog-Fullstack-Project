import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils/helper';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  const token = localStorage.getItem('accessToken');
  // if(!token) navigate('/signin');

  useEffect(() => {
    getPost();
  }, []); // Empty dependency array to run the effect only once on component mount

  const getPost = () => {
    
    axios.get(`${server.baseURL}/blog/post/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  };

  const navigateBack = () => {
    navigate('/home')
  };

  const deletePost = async (postId) => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      await axios.delete(`${server.baseURL}/blog/post?postID=${postId}`, requestConfig);
      navigateBack()
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="text-center">
      <div className="col-sm-12">
        <h4 style={{ marginTop: '30px' }}>
          <small>
            <button className="btn btn-success mr-2" onClick={navigateBack}> View All Posts </button>
            {token && <button className="btn btn-danger" onClick={() => deletePost(post._id)}>Delete Post</button>}
          </small>
        </h4>
        <hr />
        <h2>{post.title}</h2>
        <h5><span className="glyphicon glyphicon-time"></span> Post by {post.author}, {post.date_posted}.</h5>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetail;