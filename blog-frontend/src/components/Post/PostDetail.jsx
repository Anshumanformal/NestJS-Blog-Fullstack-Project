import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils/helper';

const PostDetail = () => {
  const { id, authorID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);

  const token = localStorage.getItem('accessToken');

  const getPost = async () => {
    try {
      const requestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await axios.get(`${server.baseURL}/blog/post/${id}/${authorID}`, requestConfig)
      if(!response) throw new Error('Error fetching post of the author')
      setPost(response.data)
    } catch (error) {
        console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

// Clear the timeout when the component unmounts
useEffect(() => {
  return () => {
    if (hideModalTimeout) {
      clearTimeout(hideModalTimeout);
    }
  };
}, [hideModalTimeout]);  

  const navigateBack = () => {
    navigate('/home')
  };

  const deletePost = async (postId,authorID) => {
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
        navigateBack()
      }, 2000);
      setHideModalTimeout(timeoutId);
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
            {token && <button className="btn btn-danger" onClick={() => deletePost(post._id, authorID)}>Delete Post</button>}
          </small>
        </h4>
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
        <hr />
        <h2>{post.title}</h2>
        <h2>{post.description}</h2>
        <h5><span className="glyphicon glyphicon-time"></span> Post by {post.author?.fullName}, {post.date_posted}.</h5>
        <p>{post.body}</p>
      </div>
  );
};

export default PostDetail;