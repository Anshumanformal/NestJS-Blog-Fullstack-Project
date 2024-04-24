import React, { useState, useEffect } from 'react';
import { server } from "../../utils/helper"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideModalTimeout, setHideModalTimeout] = useState(null);

  const navigate = useNavigate()

  const resetInputFields = () => {
    setFullName('')
    setAge(0)
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${server.baseURL}/auth/signup`, { fullName, age, email, password });
      if(response) {
        setShowSuccessModal(true);
        const timeoutId = setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/home");
          setHideModalTimeout(timeoutId);
        }, 2000);
      }
      else {
        setErrorMessage("Network error, couldn't register user")
        resetInputFields()
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        setErrorMessage('User with given email already present. Please try again with different email or login with the existing email.');
        resetInputFields()
      }
      else {
        console.error('Server error. Please try again later.');
      }
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

  const navigateBack = () => {
    navigate('/home')
  };

  const handleUserLogin = () => {
    navigate('/signin')
  }

  return (
    <>
      <div className="d-flex  mt-2 justify-content-center align-items-center">
        <button className="btn btn-success" onClick={navigateBack}>View All Posts</button>
      </div>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form className="col-md-6" onSubmit={handleSubmit}>

        {/* Bootstrap Popup for Success */}
        <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-success">
              <div className="modal-body text-white">
                User registered successfully
              </div>
            </div>
          </div>
        </div>

         {/* Bootstrap Popup for Error */}
         {errorMessage &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{errorMessage}</strong>
            <button type="button" className="close" onClick={() => setErrorMessage('')} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        
        <div className="form-group">
          <label htmlFor="exampleInputfullName1">Full Name</label>
          <input type="text" className="form-control" id="exampleInputfullName1" aria-describedby="emailHelp" placeholder="Enter Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)} required />
          <small id="emailHelp" className="form-text text-muted">Please enter your full name</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputAge">Age</label>
          {/* Using Math.max here to prevent user from entering negative age value. */}
          <input type="number" className="form-control" id="exampleInputAge" aria-describedby="emailHelp" placeholder="Enter Age" defaultValue={0} value={age} onChange={(e)=> setAge(Math.max(0,e.target.value))} required /> 
          <small id="emailHelp" className="form-text text-muted">Please enter your age</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <small id="emailHelp" className="form-text text-muted">Please create a strong password with a mix of uppercase, lowercase, numbers and special characters</small>
        </div>
        <button type="submit" className="btn btn-primary mr-1">Register</button>
        <button type="submit" className="btn btn-primary" onClick={handleUserLogin}>Login</button>
      </form>
    </div>
    </>
  )
}

export default SignUp