import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../utils/cognito.js'; // Import the user pool configuration
import { Link, Typography, TextField, Button } from '@mui/material'; // Import Material-UI components
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authenticationData = {
        Username: username,
        Password: password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

      await new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            console.log('Authentication successful', session);
            // Redirect or perform any actions upon successful login
            resolve(session);
            // Navigate to the desired page
            router.push('/Dashboard'); 
          },
          onFailure: (err) => {
            console.error('Authentication failed', err);
            setErrorMessage('Invalid username or password.');
            reject(err);
          }
        });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Login Page</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username or Email"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        <Button variant="contained" type="submit">Login</Button>
      </form>
      <Typography variant="body2">
        Dont have an account? <Link href="/Register">Register here</Link>
      </Typography>
    </div>
  );
};

export default Login;
