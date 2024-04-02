import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router' // Install 'react-router' if necessary
import axios from 'axios';
import { server } from '../utils/helper'

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array to run the effect only once on component mount

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${server.baseURL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${server.baseURL}/posts/${postId}`);
      fetchPosts(); // Fetch posts again after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1>Nest Blog Tutorial</h1>
        <p>This is the description of the blog built with Nest.js, React.js and MongoDB</p>
        {posts.length === 0 && <h2>No post found at the moment</h2>}
      </div>

      <div className="row">
        { posts.length === 0 ? 
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