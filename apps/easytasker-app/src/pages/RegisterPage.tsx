import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../utils/cognito.js';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(userPool);
  console.log(typeof userPool);


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Creating user attributes
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: username })
    ];

    // Sign up the user
    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('Sign up error:', err);
        return;
      }
      console.log('Sign up success:', result);
      // You can redirect the user to another page upon successful registration
    });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
