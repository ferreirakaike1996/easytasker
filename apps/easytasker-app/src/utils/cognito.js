import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_ksNfIUoZH',
  ClientId: '3l0j7j7oe7sh8l0odtu1pvidcu'
};

export const userPool = new CognitoUserPool(poolData);