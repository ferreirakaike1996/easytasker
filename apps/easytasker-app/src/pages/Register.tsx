import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../utils/cognito.js';
import { Link, Typography, TextField, Button } from '@mui/material'; // Import Material-UI components

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: username })
    ];

    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('Sign up error:', err);
        return;
      }
      console.log('Sign up success:', result);
    });
  };

  return (
    <div>
      <Typography variant="h4">Register Page</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Email"
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
        <Button variant="contained" type="submit">Register</Button>
      </form>
      
      <Typography variant="body2">
        Already have an account? <Link href="/Login">Login here</Link>
      </Typography>
    </div>
  );
};

export default RegisterPage;
