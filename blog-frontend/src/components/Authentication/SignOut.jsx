import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {

  const navigate = useNavigate()
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    localStorage.clear()
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate('/home');
    }
  }, [timer, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h2>You have been logged out successfully! Please come back again to create new awesome posts<br />
        Navigating you to homepage in {timer} seconds...
      </h2>
    </div>
  )
}

export default SignOut