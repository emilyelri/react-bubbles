import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      axiosWithAuth()
      .post('/api/login', credentials)
      .then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.payload);
          props.history.push('/bubbles');
      })
      .catch(error => {
          console.log(error);
      })
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit} >
            <input type="text" name="username" placeholder="enter username" onChange={handleChange} value={credentials.username} />
            <input type="password" name="password" placeholder="enter password" onChange={handleChange} value={credentials.password} />
            <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
