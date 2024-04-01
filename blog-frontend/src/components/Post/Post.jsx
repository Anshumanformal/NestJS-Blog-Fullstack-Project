import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils/helper';

const PostDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost();
  }, []); // Empty dependency array to run the effect only once on component mount

  const getPost = () => {
    axios.get(`${server.baseURL}/blog/post/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  };

  const navigateBack = () => {
    history.goBack();
  };

  return (
    <div className="text-center">
      <div className="col-sm-12">
        <h4 style={{ marginTop: '30px' }}>
          <small>
            <button className="btn btn-success" onClick={navigateBack}> View All Posts </button>
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