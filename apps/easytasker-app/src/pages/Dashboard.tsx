import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { userPool } from '../utils/cognito';
import { Typography, Button, CircularProgress } from '@mui/material'; // Import Material-UI components

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = () => {
      const cognitoUser = userPool.getCurrentUser();

      if (!cognitoUser) {
        router.push('/Login');
        return;
      }

      cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) {
          router.push('/Login');
          return;
        }

        setIsLoading(false);
      });
    };

    checkUserSession();
  }, []);

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      router.push('/Login');
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
